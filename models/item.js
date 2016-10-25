module.exports = function(mongoose) {
    var Schema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: function() {
                return new mongoose.Types.ObjectId();
            }
        },
        name: {
            type: String
        },
        count: {
            type: Number
        }
    });

    var Model = mongoose.model('Item', Schema);

    return Model;
};
