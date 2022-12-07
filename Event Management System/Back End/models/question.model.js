const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
    content: String,
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
})

module.exports.schema = questionSchema

module.exports.model = mongoose.model('Question', questionSchema)
