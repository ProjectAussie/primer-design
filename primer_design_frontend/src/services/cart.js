import axios from "axios"
import fileDownload from 'js-file-download'

const baseURL = '/api/cart'

const create = (newEntry) => {
  return axios
    .post(baseURL, newEntry)
    .then( (response) => response.data)
}

const getAll = () => {
  return axios
    .get(baseURL)
    .then( (response) => response.data)
}

const downloadOrderForm = () => {
  return axios
    .get(`${baseURL}/order-form`, {
      responseType: 'blob',
    }).then(res => {
      fileDownload(res.data, 'primer_order_form.csv');
    })
}

const remove = (id) => {
  return axios
    .delete(`${baseURL}/${id}`)
}

const cart = {
  create,
  getAll,
  downloadOrderForm,
  remove
}

export default cart