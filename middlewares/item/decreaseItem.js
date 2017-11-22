var requireOption = require('../requireOption');

module.exports = function (objectRepository) {

    var Item = requireOption(objectRepository, 'itemModel');

    return function (req, res, next) {
        req.item.count-=1;
        req.item.save(function(err, doc) {
            if (err) return console.log(err);
            res.json(doc.count);
        });
    }
}