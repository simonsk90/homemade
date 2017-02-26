/**
 * Created by simon on 2/26/17.
 */

module.exports = {


    findUser : function (userName, db, cb) {

        // var users = db.collection('users').findOne({
        //     "username" : userName
        // }).then(function(item) {
        //     return item;
        // });


        // function getUser() {
        //     var users = db.collection('users').findOne({
        //         "username" : userName
        //     }).then(function(item) {
        //         returnResult(item);
        //     });
        // }
        //
        // function returnResult(result) {
        //     return result;
        // }
        //
        //
        // return getUser();



        db.collection('users').findOne({
            "username" : userName
        }).then(function(item) {
            cb(item);
        });

    }


};