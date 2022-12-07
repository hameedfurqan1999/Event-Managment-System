
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new mongoose.Schema({
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true},
    purchaser: { type: Schema.Types.ObjectId , ref: 'Users', required: true },
    price: { type: Number , required: true }
})

module.exports.schema = paymentSchema

module.exports.model = mongoose.model('Payment', paymentSchema)