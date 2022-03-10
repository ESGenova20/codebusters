var fs = require('fs');
var dirTree = require('directory-tree');
var stringOccurrence = require('string-occurrence');
var SQLite3 = require('better-sqlite3');

var rootDir = '../phaser/src/';

var db = new SQLite3('./description.sqlite');

var queries = [];

var filteredTree = dirTree(rootDir, { extensions: /\.js$/ }, (item, PATH) => {

    var file = fs.readFileSync(item.path, 'utf8');

    var descTotal = stringOccurrence(file, '[description]');

    if (descTotal > 0)
    {
        // item.path = item.path.replace('\\', '/');
        // item.path = item.path.replace('../phaser\\', '');
        item.path = item.path.replace('..\\phaser\\', '');

        console.log(item.path, item.name);

        //  Parse the file line by line
        var lines = file.split('\n');

        for (var i = 0; i < lines.length; i++)
        {
            if (stringOccurrence(lines[i], '[description]'))
            {
                queries.push('INSERT INTO descriptions (id, file, line) VALUES (NULL, "' + item.path + '", ' + (i + 1) + ')');

                // console.log('Line ' + i + 1);
            }
        }
    }

});

console.log('Running transaction (' + queries.length + ' queries)');

db.transaction(queries).run();

console.log('Complete');

db.close();
