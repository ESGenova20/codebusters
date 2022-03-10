var SQLite3 = require('better-sqlite3');

var srcDB = new SQLite3('./percy/files-backup.db');
var destDB = new SQLite3('./percy/files.db');

var stmt = srcDB.prepare('SELECT * FROM files WHERE done = 1');

var queries = [];

for (var row of stmt.iterate())
{
    queries.push('UPDATE files SET done = 1 WHERE path = "' + row.path + '"');
}

console.log('Updating', queries.length, 'records');

destDB.transaction(queries).run();
