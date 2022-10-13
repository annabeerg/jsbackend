const database = require("../db/database.js");
const initDocs = require("../data/docs.json");

var ObjectId = require('mongodb').ObjectId;

const docs = {
    getAllDocs: async function getAllDocs() {
        var db;

        try {
            db = await database.getDb();

            const documents = await db.collection.find().toArray();

            return documents;
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    getOneDocs: async function getOneDocs(searched) {
        var db;

        try {
            db = await database.getDb();
            var o_id = new ObjectId(searched);
            const documents = await db.collection.find({_id: o_id}).toArray();

            return documents;
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    insertDoc: async function insertDoc(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    updateDoc: async function updateDoc(value) {
        let db;
        let id = value.id;
        let title = value.name;
        let message = value.content;

        try {
            db = await database.getDb();

            var o_id = new ObjectId(id);
            const result = await db.collection.updateOne({_id: o_id},{$set: {name: title, content: message}}, {upsert: false});

            return result.data;
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    appendAllowed: async function appendAllowed(id, key) {
        let db;
        let data = {
            id: id,
        }
        console.log(data)
        try {
            db = await database.getDb();

            var o_id = new ObjectId(key);
            const result = await db.collection.updateOne({_id: o_id},{$push: {allowed_users: data}}, {upsert: false});
            console.log(result)
            return result.data;
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    appendComment: async function appendComment(id, line, comment, content) {
        let db;
        let data = {
            line: line,
            comment: comment,
            content: content
        }

        try {
            db = await database.getDb();

            var o_id = new ObjectId(id);
            const result = await db.collection.updateOne({_id: o_id},{$push: {comments: data}}, {upsert: false});

            return result.data;
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    init: async function init() {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.deleteMany({});
            result = await db.collection.insertMany(initDocs);

            console.log(`${result.insertedCount} documents were inserted`);
        } catch (error) {
            console.error(error.message);
        } finally {
            try {
                await db.client.close();
            } catch (error) {
                console.log("could not close")
        }}
    }
};

module.exports = docs;
