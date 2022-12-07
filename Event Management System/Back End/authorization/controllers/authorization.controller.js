const UsersController = require('../../users/controllers/users.controller')
const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken')
const crypto = require('crypto')
const uuid = require('uuid')

exports.login = (req, res) => {
    console.log('Generating token')
    try {
        let token = jwt.sign(req.body, jwtSecret)
        res.status(200).send({
            accessToken: token,
            userId: req.body.userId,
            email: req.body.email,
            name: req.body.name,
        })
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}

exports.register = (req, res) => {
    UsersController.insert(req, res)
        .then((results) => {
            if (results) {
                const name = results.firstName + ' ' + results.lastName
                let token = jwt.sign(
                    {
                        userId: results._id,
                        email: req.body.email,
                        name,
                    },
                    jwtSecret
                )
                res.status(200).send({
                    accessToken: token,
                    userId: results._id,
                    email: req.body.email,
                    name,
                })
            }
        })
        .catch(() => {
            res.json({
                succes: false,
            })
        })
}
