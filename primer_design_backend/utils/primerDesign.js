const axios = require('axios').default
const fs = require('fs').promises
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const getSourceSequence = (genome, chrom, loc, sourceSeqLength) => {
  const halfSourceSeqLength = Math.floor(sourceSeqLength/2)
  const startLoc = loc - halfSourceSeqLength - 1 //offset by one to match UCSC genome browser
  const endLoc = loc + halfSourceSeqLength
  const url = ("https://api.genome.ucsc.edu/getData/sequence?genome=" + String(genome)+
  ";chrom=" + String(chrom) + ";start=" + String(startLoc) + ";end=" + String(endLoc))
  return axios
    .get(url)
    .then((response) => {
      console.log("Fetched source genome data from UCSC genome browser.")
      const sourceSequence = response.data['dna']
      return sourceSequence
    })
    .catch((error) => {
      console.log("Failed to load source genome data")})
}

const getJsonParameters = () => {
  return fs.readFile("primer3_data/paramaters.json")
    .then((fileContents) => {
      console.log("Loaded parameters.json")
      const jsonParameters = JSON.parse(fileContents)
      return jsonParameters
    })
    .catch( (error) => {
      console.log("Failed to load parameters.json")})
}

const writePrimer3Parameters = (jsonParameters, sourceSequence, sourceSeqLength,
   targetLength) => {
    const allParameters = []
    for (const key in jsonParameters) {
      allParameters.push(key + "=" + jsonParameters[key])
    }
    allParameters.push("SEQUENCE_TARGET=" + String(Math.floor(sourceSeqLength/2)) + "," +
      String(targetLength))
    allParameters.push("SEQUENCE_TEMPLATE=" + sourceSequence)
    allParameters.push('=')
    return fs.writeFile("primer3_data/primer3-parameters.txt", allParameters.join("\n"))
      .then((result) => console.log("Wrote Primer 3 Parameters"))
      .catch((error) => console.log("Failed to write Primer 3 Parameters"))
}

const runPrimer3 = () => {
  return exec("primer3/src/primer3_core primer3_data/primer3-parameters.txt")
    .then( (output) => {
      console.log("Sucessfully ran primer3")
      return output
    })
    .catch( (err) => {
      console.log("Failed to run primer3")
      console.error(err)
    })
}

//TODO: Optimize using RegEX
const changeCase = (input) => {
  const lower = input.toLowerCase()
  const words = lower.split('_')
  const camelCasedWords = words.map( (word, index) => {
    if (index === 0){
      return word
    }
    else {
      return word[0].toUpperCase() + word.slice(1)
    }
  })
  return camelCasedWords.join('')
}

const parseOutput = (output) => {
  const primer3Output = {}
  const properties = output.split("\n")
  properties.forEach((property) => {
    const [key, value] = property.split("=")
    if (key===""){
      return
    }
    primer3Output[key] = value
  })
  return primer3Output
}

const extractPrimerPairs = (primer3Data) => {
  const primerPairs = []
  for (let i = 0; i < primer3Data.PRIMER_PAIR_NUM_RETURNED; i++) {
    const leftPrimer = {
      gcPercent: primer3Data[`PRIMER_LEFT_${i}_GC_PERCENT`],
      tm: primer3Data[`PRIMER_LEFT_${i}_TM`],
      endStability: primer3Data[`PRIMER_LEFT_${i}_END_STABILITY`],
      penalty: primer3Data[`PRIMER_LEFT_${i}_PENALTY`],
      sequence: primer3Data[`PRIMER_LEFT_${i}_SEQUENCE`],
    }
    const rightPrimer = {
      gcPercent: primer3Data[`PRIMER_RIGHT_${i}_GC_PERCENT`],
      tm: primer3Data[`PRIMER_RIGHT_${i}_TM`],
      endStability: primer3Data[`PRIMER_RIGHT_${i}_END_STABILITY`],
      penalty: primer3Data[`PRIMER_RIGHT_${i}_PENALTY`],
      sequence: primer3Data[`PRIMER_RIGHT_${i}_SEQUENCE`],
    }
    const primerPair = {
      productSize: primer3Data[`PRIMER_PAIR_${i}_PRODUCT_SIZE`],
      penalty: primer3Data[`PRIMER_PAIR_${i}_PENALTY`],
      leftPrimer: leftPrimer,
      rightPrimer: rightPrimer
    }
    primerPairs.push(primerPair)
  }
  return primerPairs
}

const extractPrimerSet = (primer3Data, standard, advanced, sourceSequence) => {
  const primerPairs = extractPrimerPairs(primer3Data)
  const primerSet = {
    created: new Date(),
    lastModified: new Date(),
    sourceSequence: sourceSequence,
    designParameters: {
      standard: standard,
      advanced: advanced
    },
    primerPairs: primerPairs,
  }
  return primerSet
}

//TODO: select unique primers, sort by different conditions, etc.

const createPrimers = async (standard, advanced) => {
    const { genome, chrom, loc, targetLength, normalTargetSeq,
      variantTargetSeq, numPrimerPairs, healthId } = standard

    const { sourceSeqLength, primerOptSize, primerMinSize, primerMaxSize,
      productMinSize, productMaxSize, primerMaxTm, primerOptTm, primerMinTm,
      primerGcClamp } = advanced

    const sourceSequence = await getSourceSequence(genome, chrom, loc, sourceSeqLength)
    const jsonParameters = await getJsonParameters()
    await writePrimer3Parameters(jsonParameters, sourceSequence, sourceSeqLength, targetLength)
    const primer3Output = await runPrimer3()
    const primer3Data = parseOutput(primer3Output["stdout"])
    const primerSet = extractPrimerSet(primer3Data, standard, advanced, sourceSequence)
    return primerSet
}

module.exports = createPrimers