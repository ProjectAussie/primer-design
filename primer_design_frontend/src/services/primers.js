import axios from "axios"

const baseURL = '/api/primers'

const create = (newPrimerConfig) => {
  return axios
    .post(baseURL, newPrimerConfig)
    .then(response => response.data)
}

const getAll = () => {
  return axios
    .get(baseURL)
    .then(response => response.data)
}

const get = (genome, chrom, loc, targetLength) => {
  return axios
    .get(baseURL, {
      params: {
        genome: genome,
        chrom: chrom,
        loc: loc,
        targetLength: targetLength
      }
    })
    .then( response => {
      console.log("Data", response.data)
      return response.data
    })
}

const primers = {
  create,
  getAll,
  get
}

export default primers