let examplesQueries = [];

let InsertExamples = (data) =>
{
    if(data)
    {
        data.examples.forEach(example => {
            const {fk_id} = data;
            examplesQueries.push({
                fk_id,
                example
            });
        });
    }

    const save = (db) => {
        // Types: 
        const examplesTransaction = db.prepare(`INSERT INTO examples (
            fk_id,
            example
        ) VALUES (
            @fk_id,
            @example
        )`);

        const insertMany = db.transaction((transaction, queries) => {
            for (const query of queries)
            {
                transaction.run(query);
            }
        });

        if (examplesQueries.length)
        {
            insertMany(examplesTransaction, examplesQueries);
        }
    }

    return {
        save
    }

}

module.exports = InsertExamples;
