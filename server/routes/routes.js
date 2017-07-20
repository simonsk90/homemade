
var path = require('path');
var jwt = require('jsonwebtoken');
var dbLogic = require('./../businessLogic/dbLogic/collections/users.js');
// var createUserLogic = require('./../businessLogic/createUser.js');

/**
 *
 * @param app
 * @param projectRootSrc
 * @param db
 */
module.exports = function (app, projectRootSrc, db) {

    require(projectRootSrc + 'server/routes/userController.js')(app, projectRootSrc, dbLogic, db);

    app.get('/', function(req, res) {
        res.sendFile(path.join(projectRootSrc + 'client/app/index.html'));
    });

    app.post('/api/gettest', function (req, res) {
    	  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    	  var jwtSecret = process.env.jwtSecret;
//    	  var token = jwt.sign({ foo: 'bar' }, 'shhhshgh');
    	  
    	  jwt.verify(token, jwtSecret, function(err, decoded) {      
    	      if (err) {
    	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
    	      } else {
    	        // if everything is good, save to request for use in other routes
    	        req.decoded = decoded;    
    	        //next();
    	      }
    	    }); 
    	
        console.log('gotit2345');
        //res.send('Hello World234577!');
    });



    // app.get('/getUsers2', function (req, res) {
    //
    //     function findUsers(callback) {
    //         db.collection('users').find().toArray(function(err, docs) {
    //             callback(docs);
    //         });
    //     }
    //
    //     function sendResponse(result) {
    //         res.send(result);
    //     }
    //
    //     findUsers(sendResponse);
    // });
    //
    // app.get('/getUsers', function (req, res) {
    //     var result = [];
    //
    //     var findUsers = function(callback) {
    //         var cursor = db.collection('users').find();
    //         cursor.each(function(err, doc) {
    //             // assert.equal(err, null);
    //             if (doc != null) {
    //                 // console.dir(doc);
    //                 result.push(doc);
    //             } else {
    //                 callback();
    //             }
    //         });
    //     };
    //
    //     findUsers(function() {
    //         res.send(result);
    //     });
    //
    // });
    //
    //
    // app.post('/signup', function (req, res) {
    //     var userObject = req.body;
    //
    //     dbLogic.findByUserName(userObject.username, db, function(existingUser) {
    //         if (!existingUser) {
    //             createUserLogic.generatePassword(userObject.password, function(hash) {
    //                 var newUser = {
    //                     'username': userObject.username,
    //                     'password': hash
    //                 };
    //
    //                 dbLogic.addUser(newUser, db, function() {
    //                     res.send('Success');
    //                 });
    //
    //             });
    //         }
    //         else {
    //             res.status(500);
    //             res.send("Fail - user already exists");
    //         }
    //     });
    //
    // });

};