module.exports = function () {
    return function (req, res) {
        var itemRows = [];
        var chunkSize = 3;
        for (var i = 0; i < req.items.length; i += chunkSize) {
            itemRows.push(req.items.slice(i, i + chunkSize));
        }

        res.render('pages/main', {
            itemRows: itemRows
        });
    };
};