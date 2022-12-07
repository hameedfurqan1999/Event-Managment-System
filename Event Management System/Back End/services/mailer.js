const nodemailer = require('nodemailer');
const config = require('../common/config/env.config.js');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.MAILER_SENDER,
        pass: config.MAILER_PASS
    }
});


module.exports = {
    sendMail: (req, res) => {
        const mailOptions = {
            from: config.MAILER_SENDER,
            to: req.body.mailReceiver,
            subject: 'New event invitation!',
            text: `You have been invited to event: ${req.body.eventName}! Visit link: ${req.body.invitationLink}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.send({
                    success: false,
                })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).json({
                    success: true,
                })
            }
        })
    }
}