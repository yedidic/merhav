const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./mongoService');

function query() {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('exam')
            return collection.find({}).toArray();
        })
}

function getBySchoolCode(schoolCode) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('exam')
            return collection.find({ schoolCode }).toArray()
        })
}

function getCurrActiveExam(schoolCode) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('exam')
            return collection.findOne({ schoolCode, isActive: true })
                .then(exam => {
                    return exam
                })

        })
}
// function update(user) {
//     user._id = new ObjectId(user._id);
//     return MongoService.connect()
//         .then(db => {
//             const collection = db.collection('user');
//             return collection
//                 .findOneAndUpdate({ _id: user._id }, { $set: user })
//                 .then(result => {
//                     console.log('updated user from mongoDB', result)
//                     return user;
//                 });
//         });
// }

// function remove(userId) {
//     userId = new ObjectId(userId)
//     return MongoService.connect()
//         .then(db => {
//             const collection = db.collection('user');
//             return collection.remove({ _id: userId })
//         })
// }

function add(exam) {
    //TODO: In Server - update all other exams(supposed to be only one)
    //  by SchoolCode which their isActive === true
    // into isActive === false, and then create 
    return _changePastSchoolExamsToUnActive(exam.schoolCode)
        .then(() => {
            MongoService.connect()
                .then(db => {
                    const collection = db.collection('exam')
                    return collection.insertOne(exam)
                        .then(() => exam)
                })
        })

}

module.exports = {
    getBySchoolCode,
    getCurrActiveExam,
    query,
    add
}

function _changePastSchoolExamsToUnActive(schoolCode) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('exam')
            return collection.update({ schoolCode, isActive: true }, { $set: { isActive: false } }, { multi: true })
        })
}