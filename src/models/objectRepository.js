var itemModel = require('./item')
var userModel = require('./user')
var rentModel = require('./rent')

var objectRepository = {
  itemModel: itemModel,
  userModel: userModel,
  rentModel: rentModel
}

module.exports = objectRepository