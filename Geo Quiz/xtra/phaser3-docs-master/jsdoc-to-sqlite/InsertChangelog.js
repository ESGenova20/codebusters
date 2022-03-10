const InsertChangelog = (db, data) =>
{

    const changelogTransaction = db.prepare(`INSERT INTO changelog (
        page
    ) VALUES (
        @page
    )`);
    
    const changelogQuery = {
        page: data
    }

    changelogTransaction.run(changelogQuery);
}

module.exports = InsertChangelog;
