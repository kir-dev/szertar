var objectRepository = require('../../models/objectRepository');
var itemModel = objectRepository.itemModel;

module.exports = function () {

    return function (req, res, next) {
        var id=req.body.id;
        var count = req.body.count;
        console.log(count);
        var item = req.item;
        var newItem;
        if (!item) {
            itemModel.create({name: req.body.newItem, count: count}).then(() => {return next();});
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