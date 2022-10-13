import axios from 'axios'

const baseURL = '/api/config'

const get = (type) => {
  return axios
    .get(baseURL, {
      params: {
        type: type
      }
    })
    .then( response => response.data[0]) //hacky solution
}

const update = (id, newConfig) => {
  return axios
    .put(`${baseURL}/${id}`, newConfig)
    .then( response => response.data)
}

const configServices = {
  get,
  update
}

export default configServices