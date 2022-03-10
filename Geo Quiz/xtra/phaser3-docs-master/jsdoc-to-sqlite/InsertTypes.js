let globalTypesQueries = [];
let typedefTypesQueries = [];
let phaserTypesQueries = [];

let InsertTypes = (data) =>
{
    if(data)
    {
        data.types.forEach(type => {
            const fk_id = data.fk_id;
            
            if (type.search('Phaser.Type') !== -1) {
                typedefTypesQueries.push({
                    fk_id,
                    name: type 
                });
            }
            else if ((type.search('Phaser.') !== -1)) {
                phaserTypesQueries.push({
                    fk_id,
                    name: type 
                });
            }
            else {
                globalTypesQueries.push({
                    fk_id,
                    name: type 
                });
            }
        });
    }

    const save = (db) => {
        // Types: 
        const globalTypesTransaction = db.prepare(`INSERT INTO global_types (
            fk_id,
            name
        ) VALUES (
            @fk_id,
            @name
        )`);
    
        const typedefTypesTransaction = db.prepare(`INSERT INTO typedef_types (
            fk_id,
            name
        ) VALUES (
            @fk_id,
            @name
        )`);
    
        const phaserTypesTransaction = db.prepare(`INSERT INTO phaser_types (
            fk_id,
            name
        ) VALUES (
            @fk_id,
            @name
        )`);

        const insertMany = db.transaction((transaction, queries) => {
            for (const query of queries)
            {
                transaction.run(query);
            }
        });

        if (phaserTypesQueries.length)
        {
            insertMany(phaserTypesTransaction, phaserTypesQueries);
        }
    
        if (typedefTypesQueries.length)
        {
            insertMany(typedefTypesTransaction, typedefTypesQueries);
        }
    
        if (globalTypesQueries.length)
        {
            insertMany(globalTypesTransaction, globalTypesQueries);
        }
    }

    return {
        save
    }

}

module.exports = InsertTypes;
