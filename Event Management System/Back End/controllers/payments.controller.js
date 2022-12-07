const indicative = require('indicative/validator')
const Payment = require('./../models/payment.model').model

module.exports = {
    create: (req, res) => {
        indicative
            .validate(req.body, {
                eventId: 'required|string',
                cardNumber: 'required|string|min:1|max:16',
                price: 'required|float',
            })
            .then(async (data) => {
                const payment = await Payment.create({
                    event: data.eventId,
                    purchaser: req.user._id,
                    price: data.price,

                })
                return res.json({
                    success: true,
                    payment,
                })
            })
            .catch((error) => {
                return res.json({
                    success: false,
                    message: error,
                })
            })
    }
}