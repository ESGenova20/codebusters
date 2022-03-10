const GetPath = require('./GetPath');
const HasTag = require('./HasTag');
const IdGenerator = require('./IdGenerator');
const InsertTypes = require('./InsertTypes');
const SkipBlock = require('./SkipBlock');
const GetMarkdownLink = require('./GetMarkdownLink');
const InsertTutorials = require('./InsertTutorials');

let InsertClass = function (db, data)
{
    const classTransaction = db.prepare(`INSERT INTO class (
        longname,
        since,
        name,
        memberof,
        description,
        metafilename,
        metalineno,
        metapath,
        webgl
    ) VALUES (
        @longname,
        @since,
        @name,
        @memberof,
        @description,
        @metafilename,
        @metalineno,
        @metapath,
        @webgl
    )`);

    const extendTransaction = db.prepare(`INSERT INTO extends (
        class,
        object
    ) VALUES (
        @class,
        @object
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
        for (const query of queries)
        {
            transaction.run(query);
        }
    });

    let classQueries = [];
    let extendsQueries = [];
    let paramsQueries = [];

    for (let i = 0; i < data.docs.length; i++)
    {
        let block = data.docs[i];

        if (SkipBlock('class', block))
        {
            continue;
        }

        const description = GetMarkdownLink(block.classdesc);
        classQueries.push({
            longname: block.longname,
            since: block.since,
            name: block.name,
            memberof: block.memberof,
            description: description,
            metafilename: block.meta.filename,
            metalineno: block.meta.lineno,
            metapath: GetPath(block.meta.path),
            webgl: HasTag(block, 'webglOnly')
        });

        //  Augments
        if (Array.isArray(block.augments) && block.augments.length > 0)
        {
            for (let i = 0; i < block.augments.length; i++)
            {
                extendsQueries.push({
                    class: block.longname,
                    object: block.augments[i]
                });
            }
        }

        // Insert tutorials
        if( (block.hasOwnProperty('tutorials'))) {
            InsertTutorials({
                fk_id: block.longname,
                tutorials: block.tutorials
            });
        }

        //  Constructor Params
        if (Array.isArray(block.params) && block.params.length > 0)
        {
            for (let i = 0; i < block.params.length; i++)
            {
                let param = block.params[i];

                let types = param.type.names.join(' | ');
                let optional = -1;

                if (param.hasOwnProperty('optional'))
                {
                    optional = (param.optional) ? 1 : 0;
                }

                let defaultValue = (param.hasOwnProperty('defaultvalue')) ? String(param.defaultvalue) : '';

                let idParams = IdGenerator('param');
                paramsQueries.push({
                    id: idParams,
                    parentClass: block.longname,
                    parentFunction: '',
                    name: param.name,
                    position: i,
                    description: param.description,
                    type: types,
                    optional: optional,
                    defaultValue: defaultValue
                });

                // Insert parameters types 
                const dataTypes = {
                    fk_id: idParams,
                    types: param.type.names
                };
                // Prepare to insert types
                InsertTypes(dataTypes);
            }
        }
    }

    if (classQueries.length)
    {
        insertMany(classTransaction, classQueries);
    }

    if (extendsQueries.length)
    {
        insertMany(extendTransaction, extendsQueries);
    }

    if (paramsQueries.length)
    {
        insertMany(paramsTransaction, paramsQueries);
    }
};

module.exports = InsertClass;
