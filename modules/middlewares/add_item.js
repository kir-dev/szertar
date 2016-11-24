module.exports = function (dal) {
    return  function (req, res, next) {
        console.log("adding item to db, add_item");
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
            if (item == null) {
                saveNewItem(name, count);
            } else {
                item.count += parseInt(count, 10);
                item.save(printError);
            }
        });

        req.count = count;

        next();
    };
};

function saveNewItem(NAME, COUNT) {
    var newItem = new dal.model({ name: NAME, count: COUNT});
    newItem.save(printError);
}

function printError(err) {
    if (err) return console.log(err);
}