const mongo = require("mongodb").MongoClient;

const database = {
    getDb: async function getDb(collectionName="documents") {
        let dsn = `mongodb+srv://berg:${process.env.ATLAS_PASSWORD}@cluster0.a2sfmfk.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
