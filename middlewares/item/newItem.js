var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

var newItem = function(){
    return function(req, res, next){

            console.log(req.body);
        itemModel.create(new itemModel({
            name: req.body.item,
            count: req.body.count,
            stock: req.body.count,
            imgPath: req.body.image
        }), (err) => {
            if(err) next(err);
            return next();
        });
    };
};

module.exports = newItem;