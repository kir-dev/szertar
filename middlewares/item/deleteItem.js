var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

module.exports = function () {
    return function (req, res, next) {     
        itemModel.findByIdAndRemove(
           req.params.id
        , function (err) {
            if (err) return next(err);        
            return next();
        });
    };
};