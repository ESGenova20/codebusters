var fs = require('fs-extra');
var dirTree = require('directory-tree');
var SQLite3 = require('better-sqlite3');

//  <p>[description]</p>

//  Do a SQL content validator (check return types, check event names exist, etc)

var hasTag = function (block, tag)
{
    if (Array.isArray(block.tags))
    {
        for (var i = 0; i < block.tags.length; i++)
        {
            if (block.tags[i].originalTitle === tag)
            {
                return 1;
            }
        }
    }

    return 0;
};

var getPath = function (path)
{
    // "D:\\wamp\\www\\phaser\\src\\gameobjects\\zone"

    var i = path.indexOf('src');

    if (i === -1)
    {
        return path;
    }

    var section = path.substr(i + 4);

    return section.replace(/\\/g, '/');
};

var cleanEventName = function (eventName)
{
    //  jsdoc format: Phaser.Scenes.Events#event:BOOT
    return eventName.replace('#event:', '.');
}

var insertTypeDef = function (block, queries)
{
    //  TODO
};

var insertConstant = function (block, queries)
{
    //  Quick bail-out check where it picks-up the copyright header by mistake
    if (
        (block.longname === 'module.exports') ||
        (block.scope === 'global' && block.longname === block.name) ||
        (block.hasOwnProperty('access') && block.access === 'private')
        )
    {
        return;
    }

    var memberName = block.longname;

    var query = 'INSERT INTO constants VALUES (';

    query = query.concat('"' + memberName + '",');

    //  since
    var since = (block.hasOwnProperty('since')) ? block.since : '3.0.0';

    query = query.concat('"' + since + '",');
    query = query.concat('"' + block.name + '",');
    query = query.concat('"' + block.memberof + '",');
    query = query.concat('"' + escape(block.description) + '",');

    var types = (block.hasOwnProperty('type')) ? block.type.names.join('|') : '';

    query = query.concat('"' + types + '",');

    query = query.concat('"' + block.scope + '",');

    //  Meta
    query = query.concat('"' + block.meta.filename + '",');
    query = query.concat(block.meta.lineno + ',');
    query = query.concat('"' + escape(getPath(block.meta.path)) + '"');

    query = query.concat(')');

    queries.push(query);
};

var insertNamespace = function (block, queries)
{
    //  Quick bail-out check where it picks-up the copyright header by mistake
    if (
        (block.longname === 'module.exports') ||
        (block.scope === 'global' && block.longname === block.name) ||
        (block.hasOwnProperty('access') && block.access === 'private')
        )
    {
        return;
    }

    var query = 'INSERT INTO namespace VALUES (';

    query = query.concat('"' + block.longname + '",');
    query = query.concat('"' + block.name + '",');
    query = query.concat('"' + block.memberof + '",');

    //  Meta
    query = query.concat('"' + block.meta.filename + '",');
    query = query.concat(block.meta.lineno + ',');
    query = query.concat('"' + escape(getPath(block.meta.path)) + '"');

    query = query.concat(')');

    queries.push(query);
};

var insertMember = function (block, queries)
{
    //  Quick bail-out check where it picks-up the copyright header by mistake
    if (
        (block.longname === 'module.exports') ||
        (block.scope === 'global' && block.longname === block.name) ||
        (block.hasOwnProperty('access') && block.access === 'private')
        )
    {
        return;
    }

    var memberName = block.longname;

    var query = 'INSERT INTO members VALUES (';

    query = query.concat('"' + memberName + '",');
    query = query.concat('"' + block.since + '",');
    query = query.concat('"' + block.name + '",');
    query = query.concat('"' + block.memberof + '",');
    query = query.concat('"' + escape(block.description) + '",');

    // if (!block.hasOwnProperty('type'))
    // {
    //     console.log('>>> Member Type Error');
    //     console.log(memberName);
    //     process.exit(0);
    // }

    var types = (block.hasOwnProperty('type')) ? block.type.names.join('|') : '';

    query = query.concat('"' + types + '",');

    var defaultValue = (block.hasOwnProperty('defaultvalue')) ? block.defaultvalue : '';

    query = query.concat('"' + escape(defaultValue) + '",');

    var readOnly = (block.hasOwnProperty('readonly') && block.readonly) ? 1 : 0;

    query = query.concat(readOnly + ',');

    query = query.concat('"' + block.scope + '",');

    //  Meta
    query = query.concat('"' + block.meta.filename + '",');
    query = query.concat(block.meta.lineno + ',');
    query = query.concat('"' + escape(getPath(block.meta.path)) + '",');
    query = query.concat(hasTag(block, 'webglOnly') + ',');

    //  Inherited
    var inherited = 0;
    var inherits = '';

    if (block.hasOwnProperty('inherited') && block.inherited)
    {
        inherited = 1;
        inherits = block.inherits;
    }

    query = query.concat(inherited + ',');
    query = query.concat('"' + inherits + '",');

    var nullable = 0;

    if (block.hasOwnProperty('nullable') && block.nullable)
    {
        nullable = 1;
    }

    query = query.concat(nullable);

    query = query.concat(')');

    queries.push(query);
};

var insertFunction = function (block, queries)
{
    //  Ignore private: "access": "private"
    if (block.hasOwnProperty('access') && block.access === 'private')
    {
        return;
    }

    var query = '';
    var params = [];
    var funcName = block.longname;
    var hashPos = funcName.indexOf('#');
    var cleanFuncParent = (hashPos === -1) ? funcName : funcName.substring(0, hashPos);
    var cleanFuncName = (hashPos === -1) ? '' : funcName.substring(hashPos + 1);

    //  Insert parameters first

    if (Array.isArray(block.params) && block.params.length > 0)
    {
        for (var i = 0; i < block.params.length; i++)
        {
            var param = block.params[i];

            if (!param.type)
            {
                console.log('>>> Parameter Error');
                console.log(funcName);
                console.log(param);
                process.exit();
            }

            var types = param.type.names.join('|');
            var optional = -1;

            if (param.hasOwnProperty('optional'))
            {
                optional = (param.optional) ? 1 : 0;
            }

            var defaultValue = (param.hasOwnProperty('defaultvalue')) ? param.defaultvalue : '';

            query = 'INSERT INTO params VALUES (';

            query = query.concat('"' + cleanFuncParent + '",');
            query = query.concat('"' + cleanFuncName + '",');
            query = query.concat('"' + param.name + '",');
            query = query.concat(i + ',');
            query = query.concat('"' + escape(param.description) + '",');
            query = query.concat('"' + types + '",');
            query = query.concat(optional + ',');
            query = query.concat('"' + escape(defaultValue) + '"');

            query = query.concat(')');

            queries.push(query);

            //  Add to the params array (for injection to the functions table)

            var paramStr = param.name + ':' + types;

            if (defaultValue !== '')
            {
                paramStr += ' = ' + escape(defaultValue);
            }

            params.push(paramStr);
        }
    }

    //  Now insert the function / method itself

    query = 'INSERT INTO functions VALUES (';

    query = query.concat('"' + funcName + '",');
    query = query.concat('"' + block.since + '",');
    query = query.concat('"' + block.name + '",');
    query = query.concat('"' + block.memberof + '",');
    query = query.concat('"' + escape(block.description) + '",');
    query = query.concat('"' + block.scope + '",');

    //  Fires
    if (Array.isArray(block.fires) && block.fires.length > 0)
    {
        for (var e = 0; e < block.fires.length; e++)
        {
            block.fires[e] = cleanEventName(block.fires[e]);
        }

        var events = block.fires.join(',');

        query = query.concat('"' + events + '",');
    }
    else
    {
        query = query.concat('"",');
    }

    //  Method signature
    query = query.concat('"' + params.join(',')  + '",');

    //  Returns
    if (Array.isArray(block.returns) && block.returns.length > 0)
    {
        //  For Phaser we only need concern ourselves with the first returns element
        if (!block.returns[0].hasOwnProperty('type'))
        {
            console.log('>>> Returns Error');
            console.log(funcName);
            console.log(block.returns[0]);
            process.exit();
        }

        query = query.concat('1,');
        query = query.concat('"' + block.returns[0].type.names.join('|') + '",');
        query = query.concat('"' + escape(block.returns[0].description) + '",');
    }
    else
    {
        query = query.concat('0,');
        query = query.concat('"",');
        query = query.concat('"",');
    }

    //  Meta
    query = query.concat('"' + block.meta.filename + '",');
    query = query.concat(block.meta.lineno + ',');
    query = query.concat('"' + escape(getPath(block.meta.path)) + '",');

    //  Inherited
    var inherited = 0;
    var inherits = '';

    if (block.hasOwnProperty('inherited') && block.inherited)
    {
        inherited = 1;
        inherits = block.inherits;
    }

    query = query.concat(inherited + ',');
    query = query.concat('"' + inherits + '",');

    query = query.concat(hasTag(block, 'webglOnly'));

    query = query.concat(')');

    queries.push(query);

    return query;
};

var insertClass = function (block, queries)
{
    //  Ignore private: "access": "private"
    if (block.hasOwnProperty('access') && block.access === 'private')
    {
        return;
    }

    //  Don't need this either
    if (className === 'Class' || block.name === 'Class')
    {
        return;
    }

    var className = escape(block.longname);

    var query = 'INSERT INTO class (longname, since, name, memberof, description, metafilename, metalineno, metapath, webgl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    query = query.concat('"' + className + '",');
    query = query.concat('"' + block.since + '",');
    query = query.concat('"' + block.name + '",');
    query = query.concat('"' + block.memberof + '",');
    query = query.concat('"' + addslashes(block.classdesc) + '",');
    query = query.concat('"' + block.meta.filename + '",');
    query = query.concat(block.meta.lineno + ',');
    query = query.concat('"' + escape(getPath(block.meta.path)) + '",');
    query = query.concat(hasTag(block, 'webglOnly'));

    query = query.concat(')');

    queries.push(query);

    //  Augments

    if (Array.isArray(block.augments) && block.augments.length > 0)
    {
        for (var i = 0; i < block.augments.length; i++)
        {
            query = 'INSERT INTO extends VALUES ("' + className + '", "' + escape(block.augments[i]) + '")';

            queries.push(query);
        }
    }

    //  Constructor Params

    if (Array.isArray(block.params) && block.params.length > 0)
    {
        for (var i = 0; i < block.params.length; i++)
        {
            var param = block.params[i];

            var types = param.type.names.join('|');
            var optional = -1;

            if (param.hasOwnProperty('optional'))
            {
                optional = (param.optional) ? 1 : 0;
            }

            var defaultValue = (param.hasOwnProperty('defaultvalue')) ? param.defaultvalue : '';

            query = 'INSERT INTO params VALUES (';

            query = query.concat('"' + className + '",');
            query = query.concat('"",');
            query = query.concat('"' + param.name + '",');
            query = query.concat(i + ',');
            query = query.concat('"' + escape(param.description) + '",');
            query = query.concat('"' + types + '",');
            query = query.concat(optional + ',');
            query = query.concat('"' + escape(defaultValue) + '"');

            query = query.concat(')');

            queries.push(query);
        }
    }

    // console.log(className);

    return query;
};

var insertEvent = function (block, queries)
{
    //  Ignore private: "access": "private"
    if (block.hasOwnProperty('access') && block.access === 'private')
    {
        return;
    }

    var eventName = escape(cleanEventName(block.longname));

    var query = 'INSERT INTO event VALUES (';

    query = query.concat('"' + eventName + '",');
    query = query.concat('"' + block.since + '",');
    query = query.concat('"' + block.name + '",');
    query = query.concat('"' + block.memberof + '",');
    query = query.concat('"' + escape(block.description) + '",');
    query = query.concat('"' + block.meta.filename + '",');
    query = query.concat(block.meta.lineno + ',');
    query = query.concat('"' + escape(getPath(block.meta.path)) + '"');

    query = query.concat(')');

    queries.push(query);

    //  Callback Params

    if (Array.isArray(block.params) && block.params.length > 0)
    {
        for (var i = 0; i < block.params.length; i++)
        {
            var param = block.params[i];

            var types = param.type.names.join('|');
            var optional = -1;

            if (param.hasOwnProperty('optional'))
            {
                optional = (param.optional) ? 1 : 0;
            }

            var defaultValue = (param.hasOwnProperty('defaultvalue')) ? param.defaultvalue : '';

            query = 'INSERT INTO params VALUES (';

            query = query.concat('"' + eventName + '",');
            query = query.concat('"",');
            query = query.concat('"' + param.name + '",');
            query = query.concat(i + ',');
            query = query.concat('"' + escape(param.description) + '",');
            query = query.concat('"' + types + '",');
            query = query.concat(optional + ',');
            query = query.concat('"' + escape(defaultValue) + '"');

            query = query.concat(')');

            queries.push(query);
        }
    }

    // console.log(eventName);

    return query;
};

var processDocs = function (data, db)
{
    var classQueries = [];
    var constantQueries = [];
    var functionQueries = [];
    var memberQueries = [];
    var eventQueries = [];
    var namespaceQueries = [];

    for (var i = 0; i < data.docs.length; i++)
    {
        var block = data.docs[i];
    
        if (block.ignore)
        {
            continue;
        }
    
        switch (block.kind)
        {
            case 'class':
                insertClass(block, classQueries);
                break;
    
            case 'constant':
                insertConstant(block, constantQueries);
                break;
    
            case 'function':
                insertFunction(block, functionQueries);
                break;
    
            case 'member':
                insertMember(block, memberQueries);
                break;
    
            case 'event':
                insertEvent(block, eventQueries);
                break;
    
            case 'namespace':
                insertNamespace(block, namespaceQueries);
                break;
        }
    }

    //  Transactional insert

    console.log('Processing Class Queries: ', classQueries.length);

    db.transaction(classQueries).run();

    console.log('Processing Constant Queries: ', constantQueries.length);

    db.transaction(constantQueries).run();

    console.log('Processing Function Queries: ', functionQueries.length);

    db.transaction(functionQueries).run();

    console.log('Processing Member Queries: ', memberQueries.length);

    db.transaction(memberQueries).run();

    console.log('Processing Event Queries: ', eventQueries.length);

    db.transaction(eventQueries).run();

    console.log('Processing Namespace Queries: ', namespaceQueries.length);

    db.transaction(namespaceQueries).run();

    console.log('Complete');

    db.close();

    fs.copySync('./db/phaser-working.db', 'G:/www/phaser.io/site/app/database/docs_v3.sqlite');
};

//  Copy the Structure DB to one we can populate
fs.copySync('./db/phaser-structure.db', './db/phaser-working.db');

//  Open the copy to work on
var db = new SQLite3('./db/phaser-working.db');

//  Open the JSON file to parse
var data = fs.readJsonSync('./json/phaser.json');

processDocs(data, db);

//  Debug insert
// for (var i = 0; i < memberQueries.length; i++)
// {
//     var query = memberQueries[i];
//     console.log(i, query.substr(0, 120));
//     db.exec(query);
// }

// db.close();

/*
fs.writeFileSync('./sqldump.txt', queries.join('\n\n'), function (error) {

    if (error)
    {
        throw error;
    }
    else
    {
        console.log('sql dump saved');
    }

});
*/
