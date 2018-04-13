var objectRepository = require('../../models/objectRepository');
var rentModel = objectRepository.rentModel;

module.exports = function(){
    return function(req, res, next){
        console.log(req);
        rentModel.create(new rentModel({
            isRented: true, 
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