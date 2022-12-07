const indicative = require('indicative/validator')
const Event = require('./../models/event.model.js').model
const Question = require('./../models/question.model.js').model
const Answer = require('./../models/answer.model.js').model
const Meeting = require('./../models/meeting.model.js').model
const mongoose = require('mongoose')
const groupBy = require('./../common/helpers').groupBy
const isObjEmpty = require('./../common/helpers').isObjEmpty
const Payment = require('./../models/payment.model').model

module.exports = {
    index: (req, res) => {
        Event.find((error, results) => {         
            if (error) {
                res.json({
                    success: false,
                })
            }
            res.json({
                success: true,
                events: results,
            })
        })
    },
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'required|string|max:255',
                description: 'required|string',
                date: 'required|date',
                time: 'required|date',
                organization: 'string',
                questions: 'array',
                price: 'float'
            })
            .then(async () => {
                const event = new Event()
                event.title = req.body.title
                event.description = req.body.description
                event.price = req.body.price
                event.date = req.body.date
                event.time = req.body.time
                event.user = req.user._id
                if (req.body.organization) {
                    event.organization = req.body.organization
                }
                event.questions = []
                await event.save()

                if (req.body.questions) {
                    for (const question of req.body.questions) {
                        const questionEntity = new Question()
                        questionEntity.content = question.content
                        questionEntity.event = event._id
                        questionEntity.answers = []
                        questionEntity.save()

                        event.questions.push(questionEntity._id)

                        const uniqueAnswers = [...new Set(question.answers)]

                        for (const answer of uniqueAnswers) {
                            const answerEntity = new Answer()
                            answerEntity.content = answer
                            answerEntity.question = questionEntity._id
                            answerEntity.save()

                            questionEntity.answers.push(answerEntity._id)
                        }

                        questionEntity.save()
                    }
                }

                await event.save()

                res.json({
                    success: true,
                    message: 'Event created',
                    event,
                })
            })
            .catch((err) => {
                res.send(err)
            })
    },
    show: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id).populate([
                'user',
                'organization'
            ])

            if (!event) {
                return res.json({
                    success: false,
                    message: 'No event found',
                })
            }

            const meeting = await Meeting.findOne({
                event: event._id
            })

            const questions = await Question.find({
                event: event._id,
            }).populate('answers')

            let payments = await Payment.find({
                event: event._id,
            }).populate('user') || [];

            event.questions = questions

            Event.generateStatistics(event.questions).then(async (items) => {
                for (const item of items) {
                    item.savedAnswers = groupBy(item.savedAnswers, 'answer')
                    if (isObjEmpty(item.savedAnswers)) {
                        return res.json({
                            success: true,
                            event,
                            statistics: [],
                            meeting,
                            payments
                        })
                    }
                }

                for (const item of items) {
                    item.answers = []
                    for (const answerId in item.savedAnswers) {
                        let answer = await Answer.findById(answerId)

                        item.answers.push({
                            id: answer._id,
                            name: answer.content,
                            value: item.savedAnswers[answerId].length,
                        })

                        delete item.savedAnswers[answerId]
                    }
                }

                res.json({
                    success: true,
                    event,
                    meeting,
                    statistics: items,
                    payments
                })
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Error: ' + error,
            })
        }
    },
    getOwn: (req, res) => {
        Event.find(
            {
                user: req.user._id,
            },
            (err, results) => {
                if (err) {
                    return res.json({
                        success: false,
                    })
                }

                return res.json({
                    success: true,
                    events: results,
                })
            }
        )
    },
    getPurchases: (req, res) => {
        Payment.findById(req.params.id),
            (err, results) => {
                if (err) {
                    return res.json({
                        success: false,
                    })
                }

                res.json({
                    success: true,
                    events: results,
                })
            }
    }
}
