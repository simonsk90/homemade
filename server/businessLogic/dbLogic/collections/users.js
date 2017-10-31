var dependencyFactory = require(process.env.projectRootSrc + 'server/dependencyFactory.js');
var userDb = dependencyFactory.dbModelUsers();

module.exports = {

    findByUserName : function (userName, db, cb) {

        db.collection('users').findOne({
            "username" : userName
        }).then(function(item) {
            cb(item);
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
    
    addUser : function (newUser, db, cb) {
        db.collection('users').insert(newUser)
            .then(function() {
                cb();
            });
    },
    
    getAllUsers : function(cb) {
        userDb.find({}, function(err, users) {
            if (err) throw err;
        
            // object of all the users
            cb(users);
        });
    }

};