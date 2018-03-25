var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

module.exports = function () {

    return function (req, res, next) {
              
        var count = req.body.count; 
        
        if (!req.item) {
            return next();         
        }          
        req.item.count = parseInt(count, 10);                            
        req.item.save(function(err) {
            if (err) return next(err);
            return next();
        });
        return next();
    }
};