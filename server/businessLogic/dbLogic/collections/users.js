var dependencyFactory = require(process.env.projectRootSrc + 'server/dependencyFactory.js');
var userDbModel = dependencyFactory.dbModelUsers();

module.exports = {

    findByUserName : function (userName, cb) {

        // db.collection('users').findOne({
        //     "username" : userName
        // }).then(function(item) {
        //     cb(item);
        // });

        userDbModel.findOne({'username': userName}, 'username password', function (err, user) {
            if (err) {
                cb(err);
            }
            cb(err, user);
        });

    },
    
    findAllUsers : function (db, cb) {
        db.collection('users').find().toArray(function(err, items) {
            if (err) {
                cb(err);
            } else {
                cb(err, items);
            }
        });
    },
    
    addUser : function (newUser, cb) {
        var newUserDoc = new userDbModel(newUser);
        newUserDoc.save();
        cb();
    },
    
    getAllUsers : function(cb) {
        userDbModel.find({}, function(err, users) {
            if (err) throw err;
        
            // object of all the users
            cb(users);
        });
    }

};