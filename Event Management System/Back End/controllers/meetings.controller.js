const Meeting = require('./../models/meeting.model').model
const Message = require('./../models/message.model').model
const indicative = require('indicative/validator')

module.exports = {
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'string|max:255',
                description: 'string|max:65000',
                date: 'date',
                time: 'date',
                event: 'required|string',
            })
            .then(async (data) => {
                let meeting = await Meeting.find({
                    event: data.event,
                })

                if (meeting.length) {
                    return res.json({
                        success: false,
                        message: 'A meeting alrady exists for this event',
                    })
                }

                meeting = await Meeting.create({
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    time: data.time,
                    event: data.event,
                    user: req.user._id,
                })

                meeting = await Meeting.findById(meeting._id).populate('event')

                return res.json({
                    success: true,
                    meeting,
                })
            })
            .catch((error) => {
                return res.json({
                    success: false,
                    message: error,
                })
            })
    },
    getAllMessages: (req, res) => {
        Message.find({
            meeting: req.params.id,
        })
            .populate('user')
            .exec((err, result) => {
                if (err) {
                    return res.json({
                        success: false,
                    })
                }

                return res.json({
                    success: true,
                    messages: result,
                })
            })
    },
}
