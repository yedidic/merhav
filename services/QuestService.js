const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService');

function query() {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('quest')
            return collection.find({}).toArray();
        })
}

function getById(questId) {
    questId = new ObjectId(questId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('quest')
            return collection.findOne({ _id: questId })
        })
}

function update(quest) {
    quest._id = new ObjectId(quest._id);
    quest.modified = new Date()
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('quest')
            return collection.findOneAndUpdate({ _id: quest._id }, { $set: quest })
                .then(() => quest)
        })
}

function add(quest) {
    quest.modified = new Date()
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('quest')
            return collection.insertOne(quest)
                .then(({ insertedId }) => ({ ...quest, _id: insertedId }))
        })
}

function remove(questId) {

    questId = new ObjectId(questId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('quest');
            return collection.remove({ _id: questId })
        })
}


module.exports = {
    remove,
    add,
    query,
    update,
    getById
}

