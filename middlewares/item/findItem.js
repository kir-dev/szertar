var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var Item= requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        Item.findOne({_id: req.body.id}, function (err, item) {
            if (err) {
                console.log("error:"+err);
                return next();
            }
            req.item = item;
            next();
        });
    }
};
