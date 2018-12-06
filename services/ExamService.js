const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService');

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

// function getCurrActiveExam(schoolCode) {
//     return MongoService.connect()
//         .then(db => {
//             const collection = db.collection('exam')
//             return collection.findOne({ schoolCode, isActive: true })
//                 .then(exam => {
//                     return exam
//                 })

//         })
// }

function getCurrActiveExam(schoolCode) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('exam')
            return collection.findOne({ schoolCode, isActive: true })
                .then(exam => {
                    const questsIds = exam.questsIds.map(id => ObjectId(id))
                    return db.collection('quest').find({ _id: { $in: questsIds } }).toArray()
                        .then(quests => {
                            return { ...exam, quests }
                        })
                })

        })
}
// function getCurrActiveExam2(schoolCode) {
//     return MongoService.connect()
//         .then(db => {
//             return db.collection('exam').aggregate(
//                 [
//                     {
//                         $match:
//                             { schoolCode, isActive: true }
//                     },
//                     {
//                         $lookup: {
//                             from: 'quest',
//                             localField: 'questsIds',
//                             foreignField: '_id',
//                             as: 'quests'
//                         }
//                     },
//                     {
//                         $unwind: {
//                             path: '$quest',
//                             preserveNullAndEmptyArrays: true
//                         }
//                     },
//                     {
//                         $group
//                             : {
//                             _id: new ObjectId('5bc32235408a2e35888f7db5'),
//                             quests: {
//                                 $push: "$answers"
//                             },
//                             title: {
//                                 $first: "$title"
//                             },
//                             sortOrder: {
//                                 $first: "$sortOrder"
//                             },
//                             description: {
//                                 $first: "$description"
//                             },
//                             resultChart: {
//                                 $first: "$resultChart"
//                             },
//                             freeTextIncluded: {
//                                 $first: "$freeTextIncluded"
//                             },
//                         }
//                     }
//                 ])

//         })
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