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

};