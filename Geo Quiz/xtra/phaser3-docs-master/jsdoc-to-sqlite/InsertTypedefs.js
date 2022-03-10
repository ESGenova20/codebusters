const GetMarkDownLink = require('./GetMarkdownLink');
const GetPath = require('./GetPath');
const IdGenerator = require('./IdGenerator');
const InsertTypes = require('./InsertTypes');
const SkipBlock = require('./SkipBlock');

let InsertTypedefs = function (db, data) {
    const typedefsTransaction = db.prepare(`INSERT INTO typedefs (
        longname,
        memberof,
        name,
        description,
        type,
        defaultValue,
        metafilename,
        metalineno,
        metapath,
        returns,
        returnstype,
        returnsdescription,
        since
    ) VALUES (
        @longname,
        @memberof,
        @name,
        @description,
        @type,
        @defaultValue,
        @metafilename,
        @metalineno,
        @metapath,
        @returns,
        @returnstype,
        @returnsdescription,
        @since
    )`);

    const propertiesTransaction = db.prepare(`INSERT INTO properties (
        id,
        parentType,
        name,
        position,
        description,
        type,
        optional,
        defaultValue
    ) VALUES (
        @id,
        @parentType,
        @name,
        @position,
        @description,
        @type,
        @optional,
        @defaultValue
    )`);

    const paramsTransaction = db.prepare(`INSERT INTO params (
        id,
        parentClass,
        parentFunction,
        name,
        position,
        description,
        type,
        optional,
        defaultValue
    ) VALUES (
        @id,
        @parentClass,
        @parentFunction,
        @name,
        @position,
        @description,
        @type,
        @optional,
        @defaultValue
    )`);

    const insertMany = db.transaction((transaction, queries) => {
        for (const query of queries) {
            transaction.run(query);
        }
    });

    let typedefQueries = [];
    let propertiesQueries = [];
    let paramsQueries = [];

    for (let i = 0; i < data.docs.length; i++) {
        let block = data.docs[i];

        if (SkipBlock('typedef', block)) {
            continue;
        }

        if (block.scope === 'global') {
            continue;
        }


        //  Returns
        let returns = 0;
        let returnsType = '';
        let returnsDescription = '';
        if (Array.isArray(block.returns) && block.returns.length > 0) {
            //  For Phaser we only need concern ourselves with the first returns element
            if (!block.returns[0].hasOwnProperty('type')) {
                console.log('>>> Returns Error');
                console.log(block.longname);
                console.log(block.returns[0]);
                process.exit();
            }

            returns = 1;
            returnsType = block.returns[0].type.names.join('|');
            returnsDescription = block.returns[0].description;
        }

        let typedefName = block.longname;

        typedefQueries.push({
            longname: typedefName,
            memberof: block.memberof,
            since: (block.hasOwnProperty('since')) ? block.since : '3.0.0',
            name: block.name,
            description: (block.hasOwnProperty('description')) ? GetMarkDownLink(block.description) : '',
            type: (block.hasOwnProperty('type')) ? block.type.names.join(' | ') : '',
            defaultValue: (block.hasOwnProperty('defaultvalue')) ? String(block.defaultvalue) : '',
            metafilename: block.meta.filename,
            metalineno: block.meta.lineno,
            metapath: GetPath(block.meta.path),
            returns,
            returnstype: returnsType,
            returnsdescription: returnsDescription
        });

        // Insert parameters types 
        const dataTypes = {
            fk_id: typedefName,
            types: block.type.names
        };
        // Prepare to insert types
        InsertTypes(dataTypes);

        //  Typedef Properties
        if (Array.isArray(block.properties) && block.properties.length > 0) {
            for (let i = 0; i < block.properties.length; i++) {
                let property = block.properties[i];

                let types = property.type.names.join(' | ');
                let optional = -1;

                if (property.hasOwnProperty('optional')) {
                    optional = (property.optional) ? 1 : 0;
                }

                let defaultValue = (property.hasOwnProperty('defaultvalue')) ? String(property.defaultvalue) : '';
                let idProperty = IdGenerator('property');
                propertiesQueries.push({
                    id: idProperty,
                    parentType: typedefName,
                    name: property.name,
                    position: i,
                    description: GetMarkDownLink(property.description),
                    type: types,
                    optional: optional,
                    defaultValue: defaultValue
                });
                // Insert types
                const dataTypes = {
                    fk_id: idProperty,
                    types: property.type.names
                };
                // Prepare to insert types
                InsertTypes(dataTypes);
            }
        }

        // Typedef Params: 
        if (Array.isArray(block.params) && block.params.length > 0) {
            for (let i = 0; i < block.params.length; i++) {
                let param = block.params[i];

                let types = param.type.names.join(' | ');
                let optional = -1;

                if (param.hasOwnProperty('optional')) {
                    optional = (param.optional) ? 1 : 0;
                }

                let defaultValue = (param.hasOwnProperty('defaultvalue')) ? String(param.defaultvalue) : '';

                let idParams = IdGenerator('param');

                paramsQueries.push({
                    id: idParams,
                    parentClass: (block.type.names.join(' | ').toLowerCase() == 'class') ? typedefName : '',
                    parentFunction: (block.type.names.join(' | ').toLowerCase() == 'function') ? typedefName : '',
                    name: param.name,
                    position: i,
                    description: GetMarkDownLink(param.description),
                    type: types,
                    optional: optional,
                    defaultValue: defaultValue
                });
                // Insert types
                const dataTypes = {
                    fk_id: idParams,
                    types: param.type.names
                };
                // Prepare to insert types
                InsertTypes(dataTypes);
            }
        }
    }

    if (typedefQueries.length) {
        insertMany(typedefsTransaction, typedefQueries);
    }

    if (propertiesQueries.length) {
        insertMany(propertiesTransaction, propertiesQueries);
    }

    if (paramsQueries.length) {
        insertMany(paramsTransaction, paramsQueries);
    }
};

module.exports = InsertTypedefs;
