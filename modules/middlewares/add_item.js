module.exports = function (dal) {
    return  function (req, res, next) {
        var name = req.body.item;
        if (name === "newItem") {
            name = req.body.newItem;
            if (name == null)
                return console.log("No new Item specified.");
        }
        req.itemName = name;
        var count = req.body.count;

        var Item = dal.model;
        Item.findOne({name: name}, function (err, item) {
            if (err) return console.log(err);
            var newItem;
            if (item == null) {
                newItem = new dal.model({ name: NAME, count: COUNT});
            } else {
                item.count += parseInt(count, 10);
                newItem = item;
            }
            newItem.save(function (err) {
                if (err) return console.log(err);
                req.count = count;
                next();
            });
        });
    };
};