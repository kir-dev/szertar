var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

var newItem = function(){
    return function(req, res, next){
        console.log(req.file);
        
        itemModel.create(new itemModel({
            name: req.body.item,
            count: req.body.count,
            stock: req.body.count,
            imgPath: (req.file != undefined) ? '/img/'+req.file.path.slice(req.file.path.indexOf('\\')+1) : ''
        }), (err) => {
            if(err) next(err);
            return next();
        });
    };
};

module.exports = newItem;