/**
 * Created by simon on 2/26/17.
 */

var bcrypt = require('bcrypt');

module.exports = {


    generatePassword: function(password, cb) {

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return console.log('bcryptgensalt', err);
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return console.log('hash', err);
                }
                cb(hash);
            });
        });

    },

    comparePassword: function(password, hashedPassword, cb) {
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if (err) {
                cb(err);
            }
            cb(err, result);
        });
    }


};