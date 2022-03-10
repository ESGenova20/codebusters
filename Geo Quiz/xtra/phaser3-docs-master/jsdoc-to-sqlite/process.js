const fs = require('fs-extra');
const SQLite3 = require('better-sqlite3');
const InsertClass = require('./InsertClass');
const InsertConstant = require('./InsertConstant');
const InsertEvent = require('./InsertEvent');
const InsertFunction = require('./InsertFunction');
const InsertNamespace = require('./InsertNamespace');
const InsertMember = require('./InsertMember');
const InsertTypedefs = require('./InsertTypedefs');
const os = require('os');
const InsertTypes = require('./InsertTypes');
const InsertExamples = require('./InsertExamples');
const InsertTutorials = require('./InsertTutorials');
const InsertChangelog = require('./InsertChangelog');

//  Copy the Structure DB to one we can populate
fs.copySync('./db/phaser-structure.db', './db/phaser-working.db');

// Get last Phaser version:
const {version} = fs.readJsonSync('../phaser/package.json');
const changelog = fs.readFileSync(`../phaserio/site/public_html/content/releases/${version}.md`, 'utf-8');


//  Open the copy to work on
const db = new SQLite3('./db/phaser-working.db');

//  Open the JSON file to parse
const data = fs.readJsonSync('./json/phaser.json');
console.log('** Start **');

InsertChangelog(db, changelog);

InsertClass(db, data);
InsertEvent(db, data);
InsertConstant(db, data);
InsertNamespace(db, data);
InsertMember(db, data);
InsertFunction(db, data);
InsertTypedefs(db, data);

console.log('\n* Inserting Types *');
InsertTypes().save(db);
console.log('* Inserting Examples *');
InsertExamples().save(db);
console.log('* Inserting Tutorials *\n');
InsertTutorials().save(db);

db.close();

fs.copySync('./db/phaser-working.db', `../phaser350-docs/database/docs/${version}.db`);
console.log('** Complete **');

