const USER_URL = '/data/user'
const UserService = require('../services/UserService')

module.exports = (app) => {
    //Login User
    app.post(USER_URL + '/login', (req, res, handleErr) => {
        var userDetails = req.body;
        UserService.getByUserTz(userDetails)
            .then(user => {
                delete user.psw;
                // req.session.loggedinUser = user;
                res.json(user);
            })
            .catch(err => res.status(401).send('Wrong User/Password'));
    });

    //Query
    app.get(USER_URL, (req, res) => {
        UserService.query()
            .then(users => res.json(users))
    })
    //get By Class
    app.get(USER_URL + '/byClass', (req, res) => {
        const classCode = +req.query.classCode;
        const schoolCode = +req.query.schoolCode;
        UserService.getByClassCode(classCode, schoolCode)
            .then(users => res.json(users))
    })


    //getById
    app.get(USER_URL + '/:userId', (req, res) => {
        const userId = req.params.userId
        UserService.getById(userId)
            .then(user => {
                res.json(user)
            })
    })

    //updateUser
    app.put(USER_URL + '/:userId', (req, res) => {
        let updatedUser = req.body;
        UserService.update(updatedUser)
            .then(user => {
                res.json(user)
            })
    })

    //unshiftSubmission
    app.put(`${USER_URL}/submission/:userId`, (req, res) => {
        const userId = req.params.userId;
        const submission = req.body;
        UserService.addSubmission(userId, submission)
            .then(() => res.json(submission))
    })


    //delete
    app.delete(USER_URL + ':/userId', (req, res) => {
        const userId = req.params.userId;
        UserService.remove(userId)
            .then(() => res.end(`User ${userId} was Deleted successfully`));
    })

    //add
    app.post(USER_URL, (req, res) => {
        const user = req.body;
        UserService.add(user)
            .then(user => {
                if (user) res.json(user);
            })
    })
}