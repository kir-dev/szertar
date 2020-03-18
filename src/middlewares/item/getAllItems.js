const objectRepository = require('../../models/objectRepository')
const itemModel = objectRepository.itemModel

const listItems = function() {
  return function(req, res, next) {
    itemModel.find({}, (err, items) => {
      if (err) return next(err)
      req.items = items
      return next()
    })
  }
}

module.exports = listItems
