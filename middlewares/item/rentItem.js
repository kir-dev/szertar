var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;
var itemModel = objectRepository.itemModel;

module.exports = function(){
    return function(req, res, next){
        rentModel.create(new rentModel({
            isRented: false, 
            isReturned: false,
            items: [{_id : req.body.itemId}],
            user: req.user._id,
        }), function(err){
            if(err) next(err);
            console.log("Success");
            return next();
        });
    }
}