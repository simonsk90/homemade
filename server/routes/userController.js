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

        dbLogic.findByUserName(userObject.username, db, function(existingUser) {
            if (existingUser) {

                authenticationLogic.comparePassword(userObject.password, existingUser.password, function(result) {
                	var token = jwt.sign({ foo: 'bar' }, process.env.jwtSecret);
                	
                	res.json({
                		success: true,
                		message: 'Enjoy your token!',
                		token: token
                	});
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
                res.status(409);
                res.send("Fail - user already exists");
            }
        });

    });
    
    app.get('/users3', function(req, res) {
    //     var findUsersCallback = function() {
    //         userDb.find({}, function(err, users) {
    //             if (err) throw err;
            
    //             // object of all the users
    //             console.log(users + "abe23344455552222");
    //             res.send(users);
    //         });
    //   };
       
    // //   function findUsers(callback) {
    // //       callback();
    // //   }
       
    // //   findUsers(findUsersCallback);
       
    //   findUsersCallback();

    });
    
    
    app.get('/users4', function(req, res) {
        collectionLogicUsers.getAllUsers(function(users) {
            res.send(users);
        });
    });

};