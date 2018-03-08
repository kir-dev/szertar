module.exports = function () {
    return function (req, res) {
        var itemRows = [];
        var chunkSize = 3;
        for (var i = 0; i < res.items.length; i += chunkSize) {
            itemRows.push(res.items.slice(i, i + chunkSize));
        }

        res.render('pages/main', {
            message: res.tpl.message,
            itemRows: itemRows
        });
    };
};
