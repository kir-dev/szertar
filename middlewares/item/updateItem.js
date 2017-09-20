var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var ItemModel = requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        var count = req.body.count;
        var item = req.item;
        var newItem;
        if (!item) {
            newItem = new ItemModel({name: req.body.newItem, count: count});
        } else {
            item.count += parseInt(count, 10);
            newItem = item;
        }
        req.item = newItem;
        return next();
    }
};