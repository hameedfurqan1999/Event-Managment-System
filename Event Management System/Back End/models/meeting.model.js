const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        event: { type: Schema.Types.ObjectId, ref: 'Event' },
        user: { type: Schema.Types.ObjectId, ref: 'Users' },
        date: Date,
        time: Date,
    },
    { timestamps: true }
)

module.exports.schema = meetingSchema

module.exports.model = mongoose.model('Meeting', meetingSchema)
