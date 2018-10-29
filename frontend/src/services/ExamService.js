import axios from 'axios';

const EXAM_URL =
    process.env.NODE_ENV !== 'development'
        ? '/data/exam'
        : 'http://localhost:3000/data/exam';

// create
function add(exam) {
    return axios.post(EXAM_URL, exam)
        .then(res => res.data)
}

// read
function getCurrActiveExam(schoolCode) {
    return axios.get(EXAM_URL + '/active/' + schoolCode)
        .then(res => res.data)

}
// list
function getBySchoolCode(schoolCode) {
    return axios.get(EXAM_URL + '/' + schoolCode)
        .then(res => res.data)
}

function query() {
    return axios.get(EXAM_URL)
        .then(res => res.data)
}
//  no-delete for exam. only creating new one.
//  no-update for exam. updating means creating a new one.

export default {
    add,
    getCurrActiveExam,
    getBySchoolCode,
    query
};