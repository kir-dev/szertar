const objectRepository = require('../../models/objectRepository')

module.exports = function() {
  const items = objectRepository.itemModel
  return function(req, res, next) {
    items.findOne(
      {
        _id: req.body.id
      },
      (err, item) => {
        if (err) return next(err)
        req.item = item
        return next()
      }
    )
  }
}
