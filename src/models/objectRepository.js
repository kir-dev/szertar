const itemModel = require('./item')
const userModel = require('./user')
const rentModel = require('./rent')

const objectRepository = {
  itemModel: itemModel,
  userModel: userModel,
  rentModel: rentModel
}

module.exports = objectRepository
