import UserService from '../services/UserService';
import StorageService, { LOGGEDIN_USER_KEY } from '../services/StorageService'
import { SET_EXAM } from './ExamModule';

export const LOGIN_USER = 'user/login';
export const RELOGIN_USER = 'user/relogin';
export const UPDATE_USER = 'user/update';
export const UNSHIFT_SUBMISSION = 'user/unshiftSubmission'

export default {
    state: {
        loggedinUser: UserService.getLoggedinUser(),
    },
    mutations: {
        [LOGIN_USER](state, { user }) {
            StorageService.save(LOGGEDIN_USER_KEY, user)
            state.loggedinUser = user;
        },
        [UNSHIFT_SUBMISSION](state, { submission }) {
            state.loggedinUser.submissions.unshift(submission);
            console.log('user.submissions', state.loggedinUser.submissions)
            StorageService.save(LOGGEDIN_USER_KEY, state.loggedinUser)
        }
    },
    actions: {
        [LOGIN_USER](context, { userDetails }) {
            return UserService.login(userDetails)
                .then(user => {
                    context.commit({ type: LOGIN_USER, user })
                    return user;
                })
        },
        [RELOGIN_USER](context, payload) {
            let userLocal = context.state.loggedinUser;
            if (!userLocal) return;
            return UserService.getUserById(userLocal._id)
                .then(user => {
                    console.log('User fresh from server', user)
                    context.commit({ type: LOGIN_USER, user })
                    return user;
                })
        },
        [UPDATE_USER](context, { user }) {
            return UserService.updateUser(user)
                .then(_ => {
                    console.log('user After Updating...', user);
                    context.commit({ type: LOGIN_USER, user });
                    return user;
                })
        },
        [UNSHIFT_SUBMISSION](context, { submission }) {
            const userId = context.getters.loggedinUser._id;
            return UserService.addSubmission(submission, userId)
                .then(() => context.commit({ type: UNSHIFT_SUBMISSION, submission }))
        }


    },
    getters: {
        loggedinUser({ loggedinUser }) {
            return loggedinUser;
        },
        submissions({ loggedinUser }) {
            return loggedinUser.submissions;
        }
    }
};