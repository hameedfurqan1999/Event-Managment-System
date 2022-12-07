const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userEventQuestionAnswerSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
})

userEventQuestionAnswerSchema.index(
    { user: 1, event: 1, question: 1, answer: 1 },
    { unique: true }
)

module.exports.schema = userEventQuestionAnswerSchema

module.exports.model = mongoose.model(
    'UserEventQuestionAnswer',
    userEventQuestionAnswerSchema
)
