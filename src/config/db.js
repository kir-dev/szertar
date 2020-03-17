const mongoose = require('mongoose')
const config = require('../config/config')
const db = mongoose.connection

db.on('error', error => {
  console.log('MongoDb threw an exception: ' + error)
  throw error
})

db.once('open', () => {
  console.log('✔ Connected to db.')
})

mongoose.connect(config.mongo.path, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('MongoDB connection can not be established. Error: ' + err)
    throw err
  }
})

module.exports = mongoose
