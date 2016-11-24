module.exports = function (dal) {
    return function (req, res, next) {
        console.log("query_items start");
        var Item = dal.model;
        Item.find({}, function (err, items) {
            if (err) return console.log(err);
            console.log(items);
            req.items = items;
            console.log("query_items going to next");
            next();
        });
    };
};
