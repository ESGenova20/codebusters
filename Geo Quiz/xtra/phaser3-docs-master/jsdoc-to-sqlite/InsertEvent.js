const CleanEventName = require('./CleanEventName');
const GetPath = require('./GetPath');
const IdGenerator = require('./IdGenerator');
const InsertTypes = require('./InsertTypes');
const SkipBlock = require('./SkipBlock');
const GetMarkdownLink = require('./GetMarkdownLink');

let InsertEvent = function (db, data)
{
    const eventTransaction = db.prepare(`INSERT INTO event (
        longname,
        since,
        name,
        memberof,
        description,
        metafilename,
        metalineno,
        metapath
    ) VALUES (
        @longname,
        @since,
        @name,
        @memberof,
        @description,
        @metafilename,
        @metalineno,
        @metapath
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

    let eventQueries = [];
    let paramsQueries = [];

    for (let i = 0; i < data.docs.length; i++)
    {
        let block = data.docs[i];

        if (SkipBlock('event', block))
        {
            continue;
        }

        let eventName = CleanEventName(block.longname);

        eventQueries.push({
            longname: eventName,
            since: block.since,
            name: block.name,
            memberof: block.memberof,
            description: GetMarkdownLink(block.description),
            metafilename: block.meta.filename,
            metalineno: block.meta.lineno,
            metapath: GetPath(block.meta.path)
        });

        //  Event Params
        if (Array.isArray(block.params) && block.params.length > 0)
        {
            for (let i = 0; i < block.params.length; i++)
            {
                let param = block.params[i];

                let types = param.type.names.join('|');
                let optional = -1;

                if (param.hasOwnProperty('optional'))
                {
                    optional = (param.optional) ? 1 : 0;
                }

                let defaultValue = (param.hasOwnProperty('defaultvalue')) ? String(param.defaultvalue) : '';
                let idParams = IdGenerator('param_event');
                paramsQueries.push({
                    id: idParams,
                    parentClass: eventName,
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

    if (eventQueries.length)
    {
        insertMany(eventTransaction, eventQueries);
    }

    if (paramsQueries.length)
    {
        insertMany(paramsTransaction, paramsQueries);
    }
};

module.exports = InsertEvent;
