const objectRepository = require('../../models/objectRepository')
const userModel = objectRepository.userModel

const listUser = function() {
  return function(req, res, next) {
    userModel.find({}, (err, users) => {
      if (err) throw err
      req.users = users
      return next()
    })
  }
}

module.exports = listUser
