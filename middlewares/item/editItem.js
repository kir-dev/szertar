var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

module.exports = function () {

    return function (req, res, next) {

        var count = req.body.count;
        var name = req.body.name;
        if (!req.item) {
            return next();
        }
        req.item.count = parseInt(count, 10);
        req.item.name = name;
        req.item.save(function (err) {
            if (err) return next(err);
            return next();
        });
        return next();
    }
};