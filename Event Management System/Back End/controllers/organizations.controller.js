const indicative = require('indicative/validator')
const Organization = require('./../models/organization.model').model
const Event = require('./../models/event.model').model
const Post = require('./../models/post.model').model

module.exports = {
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'required|string|max:255',
                description: 'required|string|max:65000',
            })
            .then(async (data) => {
                const organization = await Organization.create({
                    title: data.title,
                    description: data.description,
                    owner: req.user._id,
                })
                return res.json({
                    success: true,
                    organization,
                })
            })
            .catch((error) => {
                return res.json({
                    success: false,
                    message: error,
                })
            })
    },
    show: async (req, res) => {
        const organization = await Organization.findById(
            req.params.id
        ).populate('owner')

        organization.events = await Event.find({
            organization: organization._id,
        })

        if (organization) {
            return res.json({
                success: true,
                organization,
            })
        } else {
            res.json({
                success: false,
            })
        }
    },
    getOwnOrganizations: (req, res) => {
        Organization.find(
            {
                owner: req.user._id,
            },
            (err, results) => {
                if (err) {
                    return res.json({
                        success: false,
                    })
                }

                return res.json({
                    success: true,
                    organizations: results,
                })
            }
        )
    },
    getEvents: (req, res) => {
        Event.find(
            {
                organization: req.params.id,
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
    createPost: (req, res) => {
        indicative
            .validate(req.body, {
                content: 'required|string|max:3000',
            })
            .then(async ({ content, organization }) => {
                Post.create(
                    {
                        content,
                        organization: req.params.id,
                    },
                    (err, result) => {
                        if (err) {
                            return res.json({
                                success: false,
                                message: err,
                            })
                        }

                        return res.json({
                            success: true,
                            post: result,
                        })
                    }
                )
            })
            .catch((error) => {
                return res.json({
                    success: false,
                    message: error,
                })
            })
    },
    posts: (req, res) => {
        console.log(req.params.id)
        Post.find({
            organization: req.params.id,
        })
            .sort({ createdAt: -1 })
            .exec((err, results) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: err,
                    })
                }

                return res.json({
                    success: true,
                    posts: results,
                })
            })
    },
}
