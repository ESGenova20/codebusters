const GetPath = require('./GetPath');
const InsertTypes = require('./InsertTypes');
const SkipBlock = require('./SkipBlock');
const CleanHastagLongName = require('./CleanHashtagLongname');

let InsertConstant = function (db, data)
{
    const constantTransaction = db.prepare(`INSERT INTO constants (
        longname,
        since,
        name,
        memberof,
        description,
        type,
        scope,
        metafilename,
        metalineno,
        metapath,
        nullable,
        access
    ) VALUES (
        @longname,
        @since,
        @name,
        @memberof,
        @description,
        @type,
        @scope,
        @metafilename,
        @metalineno,
        @metapath,
        @nullable,
        @access
    )`);

    const insertMany = db.transaction((transaction, queries) => {
        for (const query of queries)
        {
            transaction.run(query);
        }
    });

    let constantQueries = [];

    for (let i = 0; i < data.docs.length; i++)
    {
        let block = data.docs[i];

        if (SkipBlock('constant', block))
        {
            continue;
        }
        const longname = CleanHastagLongName(block.longname);
        constantQueries.push({
            longname: longname,
            since: (block.hasOwnProperty('since')) ? block.since : '3.0.0',
            name: block.name,
            memberof: block.memberof,
            description: block.description,
            type: (block.hasOwnProperty('type')) ? block.type.names.join('|') : '',
            scope: block.scope,
            metafilename: block.meta.filename,
            metalineno: block.meta.lineno,
            metapath: GetPath(block.meta.path),
            nullable: (block.hasOwnProperty('nullable') && block.nullable) ? 1 : 0,
            access: (block.hasOwnProperty('access')) ? block.access : ''
        });
        // Insert parameters types 
        const dataTypes = {
            fk_id: longname,
            types: block.type.names
        };
        // Prepare to insert types
        InsertTypes(dataTypes);
    }

    if (constantQueries.length)
    {
        insertMany(constantTransaction, constantQueries);
    }
};

module.exports = InsertConstant;
