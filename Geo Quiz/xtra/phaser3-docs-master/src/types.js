var fs = require('fs-extra');
var SQLite3 = require('better-sqlite3');

var db = new SQLite3('./db/phaser-working.db');

var stmt = db.prepare('SELECT DISTINCT returnstype FROM functions ORDER BY returnstype');

var types = stmt.all();

var output = 'Return Types:\n-------------\n\n';

console.log(types);

types.forEach(function(type)
{
    output = output.concat(type.returnstype + '\n');
});

db.close();

fs.writeFileSync('./typeslist.txt', output);
