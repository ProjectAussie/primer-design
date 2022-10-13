const mongoose = require('mongoose')
const advancedConfigSchema = require('./primer').advancedConfigSchema

const customConfigSchema = new mongoose.Schema({
  type: String,
  config: advancedConfigSchema
})

const CustomConfig = mongoose.model("CustomConfig", customConfigSchema)

module.exports = CustomConfig