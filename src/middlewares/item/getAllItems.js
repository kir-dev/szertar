var objectRepository = require('../../models/objectRepository')
var itemModel = objectRepository.itemModel

var listItems = function () {
  return function (req, res, next) {
    itemModel.find({}, (err, items) => {
      if (err) return next(err)
      req.items = items
      return next()
    })
  }
}

module.exports = listItems