var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type:String, required: true },
    admin: Boolean
});

userSchema.methods.getName = function() {
    return this.username;
};

var model = mongoose.model('users', userSchema);

module.exports = model;