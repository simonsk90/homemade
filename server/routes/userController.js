var authenticationLogic = require('./../businessLogic/authentication.js');
var jwt = require('jsonwebtoken');
// var userDb = require('./../models/dbModels/userDbModel.js');
// var dependencyFactory = require('./../dependencyFactory.js');
var dependencyFactory = require(process.env.projectRootSrc + 'server/dependencyFactory.js');
var collectionLogicUsers = dependencyFactory.collectionLogicUsers();

module.exports = function (app, projectRootSrc, dbLogic, db) {


    app.get('/users', function (req, res) {
        dbLogic.findAllUsers(db, function(err, users) {
            if (err) {
                res.status(500).send('Error trying to get all users');
            }
            
            res.send(users);
        });
    });

    app.post('/login', function (req, res) {
        var userObject = req.body;

        collectionLogicUsers.findByUserName(userObject.username, function(err, existingUser) {

            if (err) {
                res.status(500);
                res.send("Error while finding user by username ", err.toString());
            }

            if (existingUser) {
                authenticationLogic.comparePassword(userObject.password, existingUser.password, function(err, result) {
                	if (err) {
                	    res.status(500);
                	    res.send("Error during password verification ", err.toString());
                    }
                    if (result === true) {
                        var token = jwt.sign({ foo: 'bar' }, process.env.jwtSecret);

                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                    else {
                	    res.status(401);
                	    res.send("Incorrect password");
                    }
                });
            }
            else {
                res.status(401);
                res.send("Not real user");
            }
        });

    });

    app.post('/user', function (req, res) {
        var userObject = req.body;

        collectionLogicUsers.findByUserName(userObject.username, function(err, existingUser) {
            if (err) {
                res.status(500);
                res.send("Error while finding user by username ", err.toString());
            }

            if (!existingUser) {
                authenticationLogic.generatePassword(userObject.password, function(hash) {
                    var newUser = {
                        'username': userObject.username,
                        'password': hash
                    };

                    collectionLogicUsers.addUser(newUser, function() {
                        res.send('Success');
                    });
                });
            }
            else {
                res.status(409);
                res.send("Fail - user already exists");
            }
        });

    });


    app.get('/users4', function(req, res) {
        collectionLogicUsers.getAllUsers(function(users) {
            console.log('hej2');
            res.send(users);
        });
    });

};