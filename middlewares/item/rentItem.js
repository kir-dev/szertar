var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var userModel = objectRepository.userModel

module.exports = function(){
    return function(req, res, next){
    var query = rentModel.findOne({user: req.user._id, state: 0})
    var user = userModel.findOne({_id: req.user._id})
    query.exec((err, res) => {
        if(res){
            query.findOneAndUpdate({'items._id': req.body.itemId}, {$inc: {'items.$.amount': req.body.amount}}, (err, res) => {
                if(!res) rentModel.findOneAndUpdate({user: req.user._id, state: 0}, {$push: {items: {_id: req.body.itemId, amount: req.body.amount }}}, (err, res) => {
                    user.exec((err, user) => {
                        user.inCart++
                        user.save()
                        return next()
                    })
                })
                else return next()
            })
        }else{
            rentModel.create(new rentModel({
                state: 0,
                isRented: false, 
                isReturned: false,
                items: [{_id: req.body.itemId, amount: req.body.amount}],
                user: req.user._id,
            }), function(err, res){
                if(err) return next(err);
                user.exec((err, user) => {
                    user.inCart = 1
                    user.save()
                    return next()
                })
            })
        }
    })
    }
}