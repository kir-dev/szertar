var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel

var listRents = function(){
    return function(req, res, next) {
        rentModel.find((req.user.isAdmin && req.originalUrl.split('/')[1] != "user") ? {} : {user : req.user._id}, function(err, rents){
            if(err) throw err

            req.rents = rents
            return next()
        })
    }
}

module.exports = listRents