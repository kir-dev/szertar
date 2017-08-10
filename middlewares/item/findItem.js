var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var itemModel = requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        itemModel.findOne({name: req.body.item}, function (err, item) {
            if (err) {
                console.log(err);
                return next();
            }
            req.item = item;
            next();
        });
    }
};
