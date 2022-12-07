const UserEventQuestionAnswer = require('./../models/user-event-question-answer.model')
    .model
const Event = require('./../models/event.model').model
const Answer = require('./../models/answer.model').model
const Payment = require('./../models/payment.model').model

module.exports = {
    submit: (req, res) => {
        Event.findById(req.params.eventId).exec((error, result) => {
            if (error) {
                return this.handleError(res)
            }
            for (const questionId in req.body) {
                for (const answer of req.body[questionId]) {
                    Answer.findOne({
                        content: answer,
                        question: questionId,
                    }).exec((error, result) => {
                        if (error) {
                            return this.handleError(res)
                        }

                        let record = new UserEventQuestionAnswer({
                            user: req.user,
                            event: req.params.eventId,
                            question: questionId,
                            answer: result._id,
                        }) // TODO: check if record already exists (or make the unique index work)

                        record.save()
                    })
                }
            }

            

            res.status(201).json({
                success: true,
            })
        })
    },
    handleError: (res) => {
        return res.send({
            success: false,
        })
    },
}
