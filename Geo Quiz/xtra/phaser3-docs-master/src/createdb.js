var Database = require('better-sqlite3');

var CreateDB = function (file)
{
    var db = new Database(file, {
        memory: false,
        readonly: false,
        fileMustExist: false
    });



};

module.exports = CreateDB;
