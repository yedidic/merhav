const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./mongoService');

function query() {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.find({}).toArray();
        })
}

function getByClassCode(classCode, schoolCode) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.find({ classCode, schoolCode, type: 's' }).toArray();
        })
}

function getByUserTz(userDetails) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.findOne({ userTz: userDetails.userTz })
                .then(user => {
                    if (user && user.psw === userDetails.psw && user.schoolCode === userDetails.schoolCode) {
                        return user;
                    } else throw new Error('wrong password / unexisting user');
                })

        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.findOne({ _id: userId })
                .then(user => {
                    return user
                })

        })
}
function update(user) {
    user._id = new ObjectId(user._id);
    user.submissions.forEach(submission => submission.at = new Date(submission.at))
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection
                .findOneAndUpdate({ _id: user._id }, { $set: user })
                .then(result => {
                    return user;
                });
        });
}

function addSubmission(userId, submission) {
    userId = new ObjectId(userId)
    submission.at = new Date(submission.at)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.findOneAndUpdate({ _id: userId }
                , {
                    $push: {
                        submissions: {
                            $each: [submission],
                            $position: 0
                        }
                    }
                })
        })
}

function remove(userId) {
    userId = new ObjectId(userId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.remove({ _id: userId })
        })
}

function add(user) {
    // _isTzAlreadyExists(user)).then(()=>{})
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.insertOne({ user })
        })
}

module.exports = {
    getByUserTz,
    query,
    getByClassCode,
    getById,
    update,
    remove,
    add,
    addSubmission
}

function _isTzAlreadyExists({ userTz }) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.findOne({ userTz })
        })
}