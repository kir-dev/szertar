module.exports = function () {

    return function (req, res, next) {
        var count = req.body.count;
        var item = req.item;
        var newItem;
        if (!item) {
            newItem = new dal.model({name: req.body.item, count: count});
        } else {
            item.count += parseInt(count, 10);
            newItem = item;
        }
        req.updatedItem = newItem;
        return next();
    }
};