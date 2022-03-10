const GetPath = require('./GetPath');
const SkipBlock = require('./SkipBlock');

let InsertNamespace = function (db, data)
{
    const eventTransaction = db.prepare(`INSERT INTO namespace (
        longname,
        name,
        memberof,
        metafilename,
        metalineno,
        metapath
    ) VALUES (
        @longname,
        @name,
        @memberof,
        @metafilename,
        @metalineno,
        @metapath
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

        if (SkipBlock('namespace', block))
        {
            continue;
        }

        constantQueries.push({
            longname: block.longname,
            name: block.name,
            memberof: block.memberof,
            metafilename: block.meta.filename,
            metalineno: block.meta.lineno,
            metapath: GetPath(block.meta.path)
        });
    }

    if (constantQueries.length)
    {
        insertMany(eventTransaction, constantQueries);
    }
};

module.exports = InsertNamespace;
