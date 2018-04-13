var mongoose = require('mongoose');
var db = require('../config/db');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserScema =  new Schema({
    _id: {
        type: ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    authSchId: String,
    name: String,
    email: String,
    isAdmin: Boolean
}, {
    timestamps: true
});

UserScema.statics.findByAuthSchOrCreate = function(authSchUser, callback){
    this.findOne({
        authSchId: authSchUser.internal_id
    }, (err, user) => {
        if (err)
            return callback(err);

        if (user) {
            return callback(null, user);
        } else {
            var newUser = new User();

            newUser.name = authSchUser.displayName;
            newUser.authSchId = authSchUser.internal_id;
            newUser.email = authSchUser.mail;
            newUser.isAdmin = authSchUser.eduPersonEntitlement.some(
                (obj) => {
                   
                return callback(null, newUser);
            });
        }
    });
};

User = mongoose.model('User', UserScema);

module.exports = User;
