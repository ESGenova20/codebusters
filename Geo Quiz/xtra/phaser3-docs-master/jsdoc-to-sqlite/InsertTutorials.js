let tutorialsQueries = [];

let InsertTutorials = (data) =>
{
    if(data)
    {
        data.tutorials.forEach(tutorial => {
            const {fk_id} = data;
            tutorialsQueries.push({
                fk_id,
                tutorial
            });
        });
    }

    const save = (db) => {
        // Types: 
        const tutorialsTransaction = db.prepare(`INSERT INTO tutorials (
            fk_id,
            tutorial
        ) VALUES (
            @fk_id,
            @tutorial
        )`);

        const insertMany = db.transaction((transaction, queries) => {
            for (const query of queries)
            {
                transaction.run(query);
            }
        });

        if (tutorialsQueries.length)
        {
            insertMany(tutorialsTransaction, tutorialsQueries);
        }
    }

    return {
        save
    }

}

module.exports = InsertTutorials;
