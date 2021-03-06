const USER_URL = '/data/user'
const UserService = require('../services/UserService')

module.exports = (app) => {
    //Login User
    app.post(USER_URL + '/login', (req, res, handleErr) => {
        var userDetails = req.body;
        UserService.loginUser(userDetails)
            .then(user => {
                delete user.psw;
                req.session.cookie.maxAge = 60 * 60 * 1000;
                req.session.loggedinUser = user;
                res.json(user);
            })
            .catch(err => res.status(401).send('Wrong User/Password'));
    });

    //Query
    app.get(USER_URL, (req, res) => {
        if (!!true);
        UserService.query()
            .then(users => res.json(users))
    })
    
    //get By Class
    app.get(USER_URL + '/byClass', (req, res) => {
        // const { type } = req.session.loggedinUser;
        // if (!req.session.loggedinUser || (type !== 'h' && type !== 't')) return;
        const classCode = +req.query.classCode;
        const schoolCode = +req.query.schoolCode;
        UserService.getByClassCode(classCode, schoolCode)
            .then(users => {
                users.forEach(user => delete user.psw);
                res.json(users)
            })
    })


    //getById
    app.get(USER_URL + '/:userId', (req, res) => {
        // if (!req.session.loggedinUser) return;
        const userId = req.params.userId
        UserService.getById(userId)
            .then(user => {
                delete user.psw
                res.json(user)
            })
    })

    //reloginUser
    app.get(USER_URL + '/relogin/:userId', (req, res) => {
        const userId = req.params.userId
        // if (req.session.loggedinUser !== userId) return;
        UserService.getById(userId)
            .then(user => {
                delete user.psw
                res.json(user)
            })
    })

    //updateUser
    app.put(USER_URL + '/:userId', (req, res) => {
        return res.end();
        // if (!req.session.loggedinUser) return;
        let updatedUser = req.body;
        UserService.update(updatedUser)
            .then(user => {
                delete user.psw;
                res.json(user)
            })
    })

    //unshiftSubmission
    app.put(`${USER_URL}/submission/:userId`, (req, res) => {
        // if (!req.session.loggedinUser) return;
        const userId = req.params.userId;
        const submission = req.body;
        UserService.addSubmission(userId, submission)
            .then(() => res.json(submission))
    })


    //delete
    app.delete(USER_URL + ':/userId', (req, res) => {
        return res.end();
        if (!req.session.loggedinUser) return;
        const userId = req.params.userId;
        UserService.remove(userId)
            .then(() => res.end(`User ${userId} was Deleted successfully`));
    })

    //add
    app.post(USER_URL, (req, res) => {
        return res.end();
        if (!req.session.loggedinUser) return;
        const user = req.body;
        UserService.add(user)
            .then(user => {
                delete user.psw;
                if (user) res.json(user);
            })
    })
}