var bcrypt = require('bcrypt');
var path = require('path');
// var projectRootSrc = __dirname + '/../../';



module.exports = function (app, projectRootSrc, db) {



    app.get('/', function(req, res) {
        res.sendFile(path.join(projectRootSrc + 'client/app/index.html'));
    });

    app.get('/api/gettest', function (req, res) {
        console.log('gotit2345');
        res.send('Hello World234577!');
    });



    app.get('/getUsers2', function (req, res) {

        function findUsers(callback) {
            db.collection('users').find().toArray(function(err, docs) {
                callback(docs);
            });
        }


        function sendResponse(result) {
            res.send(result);
        }

        findUsers(sendResponse);


    });

    app.get('/getUsers', function (req, res) {
        var result = [];

        var findUsers = function(callback) {
            var cursor = db.collection('users').find( );
            cursor.each(function(err, doc) {
                // assert.equal(err, null);
                if (doc != null) {
                    // console.dir(doc);
                    result.push(doc);
                } else {
                    callback();
                }
            });
        };

        findUsers(function() {
            res.send(result);
        });

    });


    app.post('/signup', function (req, res) {
        var userObject = req.body;
        var existingUser;

        function findExistingUser(cb) {
            var users = db.collection('users').findOne({
                "username" : userObject.username
            }).then(function(item) {
                if (!item) {
                    cb(sendResponse);
                }
                else {
                    console.log("FAIL - user exists already");
                    res.send("FAIL - user exists already");
                }
            });
        }

        function insertUser(cbSendResponse) {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return console.log('bcryptgensalt', err);
                }
                bcrypt.hash(userObject.password, salt, function(err, hash) {
                    if (err) {
                        return console.log('hash', err);
                    }

                    var newUser = {
                        'username': userObject.username,
                        'password': hash
                    };

                    db.collection('users').insert(newUser)
                        .then(function() {
                            cbSendResponse();
                        });

                });
            });
        }

        function sendResponse(result) {
            res.send(result);
        }

        // findExistingUser(insertUser);

        // require('./../businessLogic/dbLogic/collections/users.js')(db);

        var dbLogic = require('./../businessLogic/dbLogic/collections/users.js');

        function getExistingUser(cb) {
            dbLogic.findUser('Simon', db, cb);

        }

        function sendRes(result) {
            res.send(result);
        }

        getExistingUser(sendRes);









        // res.send('yes23');
    });

    var insertDocument = function(db, callback, newUser) {
        db.collection('users').insertOne({
            "address" : {
                "street" : "2 Avenue",
                "zipcode" : "10075",
                "building" : "1480",
                "coord" : [ -73.9557413, 40.7720266 ]
            },
            "borough" : "Manhattan",
            "cuisine" : "Italian",
            "grades" : [
                {
                    "date" : new Date("2014-10-01T00:00:00Z"),
                    "grade" : "A",
                    "score" : 11
                },
                {
                    "date" : new Date("2014-01-16T00:00:00Z"),
                    "grade" : "B",
                    "score" : 17
                }
            ],
            "name" : "Vella",
            "restaurant_id" : "41704620"
        }, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the users collection.");
            callback();
        });
    };
    
    // app.post('/api/registerUser', function (req, res) {
    //
    //     var user = req.body;
    //
    //     bcrypt.genSalt(10, function(err, salt) {
    //         if (err) {
    //             return console.log('bcryptgensalt', err);
    //         }
    //         bcrypt.hash("my password", salt, function(err, hash) {
    //             if (err) {
    //                 return console.log('hash', err);
    //             }
    //             // Store hash in your password DB.
    //
    //             user.password = hash;
    //
    //             db.collection('users').insert(user, (err, result) => {
    //                 if (err)  {
    //                     return console.log(err);
    //                 }
    //             });
    //         });
    //     });
    //
    //     res.send();
    //
    // });
};