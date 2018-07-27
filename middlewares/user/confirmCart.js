var objectRepository = require('../../models/objectRepository')
var rentModel = objectRepository.rentModel
var userModel = objectRepository.userModel

module.exports = function () {
    return function (req, res, next) {
        userModel.findOneAndUpdate({_id: req.user._id}, {$inc: {inRents: 1}}, ()=>{})
        userModel.findOneAndUpdate({_id: req.user._id}, {$inc: {inCart: -req.user.inCart}}, ()=>{})
        rentModel.findOneAndUpdate({_id: req.body.id, state: 0}, {state: 1}, function (err, rent){
            if (err) return next(err);
            rent.items.forEach(item => {
                item.amount = req.body[item._id]
            })
            for(var i in req.app.locals.adminConnections){
                req.app.locals.adminConnections[i].sseSend({msg: 'Új kölcsönzés!'})
            }
            rent.save()
            return next()
        })
    }
}