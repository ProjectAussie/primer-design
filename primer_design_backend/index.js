require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PrimerSet = require('./models/primer').model
const CartEntry = require('./models/cartentry')
const Order = require('./models/order')
const CustomConfig = require('./models/config')
const createPrimer = require('./utils/primerDesign')
const csvWriter = require('./utils/csvWriter')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/primers', (request, response) => {
  const filter = {}
  const query = request.query
  for (const key in query){
    if (query[key] !== "") {
      filter[key] = query[key]
    }
    else {
      filter[key] = {$exists: true}
    }
  }
  PrimerSet
    .find({
      "designParameters.standard.genome": filter.genome,
      "designParameters.standard.chrom": filter.chrom,
      "designParameters.standard.loc": filter.loc,
      "designParameters.standard.targetLength": filter.targetLength,
    })
    .then( (data) => {
      response.json(data)
    })
})

app.post('/api/primers', async (request, response) => {

  const { standard, advanced } = request.body
  //TODO: alter function so it uses all of the given parameters
  const output = await createPrimer(standard, advanced)

  const primerSet = new PrimerSet(output)

  primerSet
    .save()
    .then((savedPrimerSet) => response.json(savedPrimerSet))
    .catch((error) => console.error(error))
})

app.post('/api/cart', (request, response) => {
  const cartEntry = request.body

  const newCartEntry = new CartEntry(cartEntry)

  newCartEntry
    .save()
    .then((savedEntry) => response.json(savedEntry))
    .catch((error) => console.error(error))
})

app.get('/api/cart', (request, response) => {
  CartEntry
    .find({})
    .then((cart) => response.json(cart))
    .catch((error) => console.error(error))
})

app.get('/api/cart/order-form', (request, response) => {
  CartEntry
    .find({})
    .then((cart) => {
      csvWriter
        .writeOrderForm(cart)
        .then(() => response.download('files/primer_order_form.csv'))
    })
    .catch((error) => console.error(error))
})

app.delete('/api/cart/:id', (request, response) => {
  const id = request.params.id
  CartEntry
    .findByIdAndRemove(id)
    .then( () => response.status(204).end())
})

app.get('/api/order', (request, response) => {
  OrderHistory
    .find({})
    .then((orderHistory) => response.json(orderHistory))
})

//Should clear out old order first
app.post('/api/order', (request, response) => {
  const orderBody = request.body

  const newOrder = new Order(orderBody)

  newOrder
    .save()
    .then((savedOrder) => response.json(savedOrder))
    .catch((error) => console.error(error))
})

app.get('/api/config', (request, response) => {
  const query = request.query
  const typeFilter = query['type'] ? query['type'] : {$exists: true}
  CustomConfig
    .find({
      type: typeFilter
    })
    .then((data) => {
    response.json(data)
  })
})

app.post('/api/config', (request, response) => {
  newConfig = request.body

  const newCustomConfig = new CustomConfig(newConfig)

  newCustomConfig
    .save()
    .then( (data) => response.json(data))
})

app.put('/api/config/:id', (request, response) => {
  id = request.params.id
  newConfig = request.body

  CustomConfig
    .findByIdAndUpdate()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.` )
})