const objectRepository = require('../../models/objectRepository')
const rentModel = objectRepository.rentModel

module.exports = function() {
  return function(req, res, next) {
    rentModel.findOneAndUpdate(
      { user: req.user._id, state: 0 },
      { $pull: { items: { _id: req.params.id } } },
      () => {}
    )
    return next()
  }
}
