var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var itemModel = objectRepository.itemModel;

module.exports = function(){
    return function(req, res, next){
    rentModel.findOne({user: req.user._id, state: 0}, (err, res) => {
        if(res){
            rentModel.findOneAndUpdate({user: req.user._id, state: 0, 'items._id': req.body.itemId}, {$inc: {'items.$.amount': req.body.amount}}, (err, res) => {
                console.log(err+' '+res)
                if(!res) rentModel.findOneAndUpdate({user: req.user._id, state: 0}, {$push: {items: {_id: req.body.itemId, amount: 1 }}}, () => {})
            })
            return next()
        }else{
            rentModel.create(new rentModel({
                state: 0,
                isRented: false, 
                isReturned: false,
                items: [{_id: req.body.itemId, amount: req.body.amount}],
                user: req.user._id,
            }), function(err){
                if(err) next(err);
                return next();
            });
        }
    })
    }
}