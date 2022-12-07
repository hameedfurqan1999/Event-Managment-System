const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        event: { type: Schema.Types.ObjectId, ref: 'Event' },
        organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    },
    { timestamps: true }
)

module.exports.schema = postSchema

module.exports.model = mongoose.model('Post', postSchema)
