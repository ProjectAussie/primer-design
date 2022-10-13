const mongoose = require('mongoose')
const primerSetSchema = require('./primer').schema

const orderItemSchema = new mongoose.Schema({
  primerSet: primerSetSchema,
  primerPairIds: [String]
})

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  date: Date
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order

