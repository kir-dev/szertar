var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var userModel = objectRepository.userModel

module.exports = function () {
    return function (req, res, next) {
        rentModel.findOne({_id: req.body.id, state: 0, user: req.user._id}).populate({path: 'items._id', model: 'Item'}).exec(function (err, rent){
            if (err) return next(err)
            var error = false
            rent.items.some(item => {
                var tmp = parseInt(req.body[item._id._id])
                console.log('tmp: %s item: %s', tmp, item._id.stock)
                if(tmp > item._id.stock) {
                    error = true
                    return true
                }else{
                    item.amount = tmp
                    return false
                }
            })
            if(error) return next()
            rent.state = 1
            rent.save()
            var text = {title: 'Új kölcsönzés', body: req.user.name+' kölcsönözne'}
            adminSSE.send(text)
            return next()
        })
    }
}