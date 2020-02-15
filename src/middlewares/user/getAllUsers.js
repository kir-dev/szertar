var objectRepository = require('../../models/objectRepository')
var userModel = objectRepository.userModel

var listUser = function(){
    return function(req, res, next){
        userModel.find({}, function(err, users){
            if (err) throw err
            req.users = users
            return next()
        })
    }
}

module.exports = listUser