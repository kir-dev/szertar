var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

var newItem = function(){
    return function(req, res, next){
        if(req.body.id){
            
        }

        itemModel.create(new itemModel({
            name: req.body.item,
            count: req.body.count,
            stock: req.body.count,
            imgPath: req.body.image
        }), (err) => {
            if(err) throw err;

            return next();
        });
    };
};

module.exports = newItem;