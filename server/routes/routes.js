var path = require('path');
var jwt = require('jsonwebtoken');
var pug = require('pug');
var dbLogic = require('./../businessLogic/dbLogic/collections/users.js');

// var dd = "wooot";

module.exports = function (app, projectRootSrc, db) {

    require(projectRootSrc + 'server/routes/userController.js')(app, projectRootSrc, dbLogic, db);



    app.get('/', function(req, res) {
        res.render(process.env.projectRootSrc + "client/app/index", {environment: process.env.environment});
    });

};