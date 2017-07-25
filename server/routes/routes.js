var path = require('path');
var jwt = require('jsonwebtoken');
var dbLogic = require('./../businessLogic/dbLogic/collections/users.js');

module.exports = function (app, projectRootSrc, db) {

    require(projectRootSrc + 'server/routes/userController.js')(app, projectRootSrc, dbLogic, db);

};