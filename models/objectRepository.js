var itemModel = require('./item');
var userModel = require('./user');

var objectRepository = {
    itemModel: itemModel,
    userModel: userModel
};

module.exports = objectRepository;