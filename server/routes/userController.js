var authenticationLogic = require('./../businessLogic/authentication.js');
var userModel = require('./../models/user.js');
var jwt = require('jsonwebtoken');

module.exports = function (app, projectRootSrc, dbLogic, db) {


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
            var cursor = db.collection('users').find();
            cursor.each(function(err, doc) {
                // assert.equal(err, null);
                if (doc !== null) {
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

    app.post('/login', function (req, res) {
        var userObject = req.body;

        dbLogic.findByUserName(userObject.username, db, function(existingUser) {

            if (existingUser) {

                authenticationLogic.comparePassword(userObject.password, existingUser.password, function(result) {
                	var token = jwt.sign({ foo: 'bar' }, process.env.jwtSecret);
                	
                	res.json({
                		success: true,
                		message: 'Enjoy your token!',
                		token: token
                	});
                	
                    //res.send(result);
                });



            }
            else {
                res.status(500);
                res.send("Not real user");
            }

        });

    });

    app.post('/signup', function (req, res) {
        var userObject = req.body;

        var newUser = userModel.user(userObject.username);
        
        dbLogic.findByUserName(userObject.username, db, function(existingUser) {
            if (!existingUser) {
                authenticationLogic.generatePassword(userObject.password, function(hash) {
                    var newUser = {
                        'username': userObject.username,
                        'password': hash
                    };

                    dbLogic.addUser(newUser, db, function() {
                        res.send('Success');
                    });

                });
            }
            else {
                res.status(500);
                res.send("Fail - user already exists");
            }
        });

    });

};