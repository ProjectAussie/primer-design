const mongoose = require('mongoose')
const primerSetSchema = require('./primer').schema

const cartEntrySchema = new mongoose.Schema({
  primerSet: primerSetSchema,
  primerPairIds: [String]
})


// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   shoppingCart: [shoppingCartEntrySchema]
// })

// const User = mongoose.model('User', userSchema)

const CartEntry = mongoose.model('CartEntry', cartEntrySchema)

module.exports = CartEntry