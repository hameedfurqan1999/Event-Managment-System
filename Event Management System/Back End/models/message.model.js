const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
        meeting: { type: Schema.Types.ObjectId, ref: 'Meeting' },
    },
    {
        timestamps: true,
    }
)

module.exports.schema = messageSchema

module.exports.model = mongoose.model('Message', messageSchema)
