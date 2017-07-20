module.exports = {


    /**
     * @param {string} userName
     * @param {mongoose.connection} db
     * @param {function} cb
     */
    findByUserName : function (userName, db, cb) {

        db.collection('users').findOne({
            "username" : userName
        }).then(function(item) {
            cb(item);
        });

    },
    addUser : function (newUser, db, cb) {
        db.collection('users').insert(newUser)
            .then(function() {
                cb();
            });
    },




};