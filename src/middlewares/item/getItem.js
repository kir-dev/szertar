var objectRepository = require('../../models/objectRepository')

module.exports = function () {
  var items = objectRepository.itemModel
  return function (req, res, next) {
    items.findOne({
      _id: req.body.id
    }, (err, item) => {
      if (err) return next(err)
      req.item = item
      return next()
    })
  }
}