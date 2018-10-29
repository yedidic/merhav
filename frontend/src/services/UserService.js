import axios from 'axios';
import StorageService, { LOGGEDIN_USER_KEY } from '../services/StorageService'

const USER_URL =
    process.env.NODE_ENV !== 'development'
        ? '/data/user'
        : 'http://localhost:3000/data/user';

// var gUsers = [
//     {
//         userTz: 312231053,
//         psw: '123ab',
//         schoolCode: 99
//     }
// ]

function login(userDetails) {
    return axios.post(USER_URL + '/login', userDetails)
        .then(res => {
            let loggedinUser = res.data;
            return loggedinUser;
        })
}

function getUserById(userId) {
    return axios.get(USER_URL + '/' + userId)
        .then(res => res.data)
}

function updateUser(user) {
    return axios.put(USER_URL + '/' + user._id, user)
        .then(res => res.data)
}

function getLoggedinUser() {
    let userFromLocalStorage = StorageService.load(LOGGEDIN_USER_KEY);
    return userFromLocalStorage ? userFromLocalStorage : null;
}

function addSubmission(submission, userId) {
    return axios.put(USER_URL + '/submission/' + userId, submission)
        .then(res => res.data)

}

function getByClassCode(classCode, schoolCode) {
    return axios.get(`${USER_URL}/byClass`, {
        params: {
            classCode, schoolCode
        }
    })
        .then(res => res.data)
}
export default {
    login,
    getUserById,
    updateUser,
    getLoggedinUser,
    getByClassCode,
    addSubmission
};