var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel

module.exports = function(){
    return function(req, res, next) {
        rentModel.find({user : req.user._id, state: 0}, function(err, cart){
            if (err) return next(err)
            req.cart = cart[0]
            return next()
        })
    }
}