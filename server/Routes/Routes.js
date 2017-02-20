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

    app.post('/signup', function (req, res) {
        var userObject = req.body;
        var kk = 223553322222;
        var a = 25567888;
        var ss = "sasa";
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

                    db.collection('userLogins').insert(newUser);

                    // MongoClient.connect(url, function(err, db) {
                    //     assert.equal(null, err);
                    //     insertDocument(db, function() {
                    //         db.close();
                    //     });
                    // });


                    // var users = db.collection('users').find();


                    var haha = 123;
                });
            });


        res.send('yes23');
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