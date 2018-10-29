import ExamService from '../services/ExamService';
import StorageService, { CURR_EXAM } from '../services/StorageService'

export const SET_EXAM = 'exam/setBySchoolCode'

export default {
    state: {
        exam: null
    },
    mutations: {
        [SET_EXAM](state, { exam }) {
            StorageService.save(CURR_EXAM, exam)
            state.exam = exam;
        }

    },
    actions: {
        [SET_EXAM](context, { schoolCode }) {
            return ExamService.getCurrActiveExam(schoolCode)
                .then(exam => context.commit({ type: SET_EXAM, exam }))
        }

    },
    getters: {
        exam({ exam }) {
            return exam;
        }
    }
};