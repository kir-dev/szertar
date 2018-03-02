var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var Item = requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        var id=req.body.id;
        var count = req.body.count;
        console.log(count);
        var item = req.item;
        var newItem;
        if (!item) {
            newItem = new Item({name: req.body.newItem, count: count});
        } else {
            item.count = parseInt(count, 10);
            newItem = item;
        }
        req.item = newItem;
        item =newItem;
        item.save(function(err) {
            if (err) return console.log(err);
            next();
        });
        return next();
    }
};