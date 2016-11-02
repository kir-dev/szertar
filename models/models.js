/* Create models from schemas. */
var _items = require('./item');

module.exports = function(mongoose) {
	return _items(mongoose);
};
