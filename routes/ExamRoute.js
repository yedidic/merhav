const EXAM_URL = '/data/exam'
const ExamService = require('../services/ExamService')

module.exports = (app) => {

    //Query
    app.get(EXAM_URL, (req, res) => {
        ExamService.query()
            .then(exams => res.json(exams))
    })


    //getBySchoolCode
    app.get(EXAM_URL + '/:schoolCode', (req, res) => {
        const schoolCode = +req.params.schoolCode
        ExamService.getBySchoolCode(schoolCode)
            .then(exams => {
                res.json(exams)
            })
    })

    // getCurrActiveExam
    app.get(EXAM_URL + '/active/:schoolCode', (req, res) => {
        const schoolCode = +req.params.schoolCode;        
        ExamService.getCurrActiveExam(schoolCode)
            .then(exam => {
                res.json(exam)
            })
    })


    // //updateUser
    // app.put(EX + '/:userId', (req, res) => {
    //     var updatedUser = req.body;
    //     UserService.update(updatedUser)
    //         .then(user => {
    //             res.json(user)
    //         })
    // })

    // //deleteExam
    // app.delete(EXAM_URL + '/delete' + ':/examId', (req, res) => {
    //     const examId = req.params.examId;
    //     ExamService.remove(examId)
    //         .then(() => res.end(`Exam ${examId} was Deleted successfully`));
    // })

    //add
    app.post(EXAM_URL, (req, res) => {
        const exam = req.body;
        ExamService.add(exam)
            .then(() => {                
                if (exam) res.json(exam);
            })
    })
}