const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then( () => console.log("Connected to MongoDB"))
  .catch( (error) => console.log("Failed to connect to MongoDB", error.message))

const standardParameterSchema = new mongoose.Schema({
  genome: String,
  chrom: String,
  loc: Number,
  targetLength: Number,
  normalTargetSeq: String,
  variantTargetSeq: String,
  numPrimerPairs: Number,
  healthId: String
})

const advancedParameterSchema = new mongoose.Schema({
  sourceSeqLength: Number,
  primerOptSize: Number,
  primerMinSize: Number,
  primerMaxSize: Number,
  productMinSize: Number,
  productMaxSize: Number,
  primerMaxTm: Number,
  primerOptTm: Number,
  primerMinTm: Number,
  primerGcClamp: Number
})

const primerSchema = new mongoose.Schema({
  gcPercent: Number,
  tm: Number,
  endStability: Number,
  penalty: Number,
  sequence: String
})

//Track how many poeple have actually used the Primer Pair and 
//if it was successful
const primerPairSchema = new mongoose.Schema({
  productSize: Number,
  penalty: Number,
  leftPrimer: primerSchema,
  rightPrimer: primerSchema
})

const primerSetSchema = new mongoose.Schema({
  created: Date,
  lastModified: Date,
  sourceSequence: String,
  designParameters: {
    standard: standardParameterSchema,
    advanced: advancedParameterSchema
  },
  primerPairs: [primerPairSchema]
})

const PrimerSet = mongoose.model('PrimerSet', primerSetSchema)

module.exports = {
  schema: primerSetSchema,
  model: PrimerSet,
  advancedConfigSchema: advancedParameterSchema
}