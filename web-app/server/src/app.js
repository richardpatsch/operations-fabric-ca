const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/queryAllFoods', (req, res) => {
  network.queryAllFoods().then((response) => {
    var foodRecords = JSON.parse(response)
    res.send(foodRecords)
  })
})

app.get('/queryAllDeliveries', (req, res) => {
  network.queryAllDeliveries().then((response) => {
    var deliveryRecords = JSON.parse(response)
    res.send(deliveryRecords)
  })
})

app.post('/createFood', (req, res) => {
  console.log(req.body)
  network
    .createFood(req.body.quantity, req.body.name, req.body.best_before)
    .then((response) => {
      console.log(response)
      res.send(response)
    })
})

app.post('/transferFood', (req, res) => {
  console.log(req.body)
  network.transferFood(req.body.id, req.body.to).then((response) => {
    console.log(response)
    res.send(response)
  })
})

app.listen(process.env.PORT || 8081)
