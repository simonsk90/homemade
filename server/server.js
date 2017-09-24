var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var Promise = require("bluebird");
var projectRootSrc = __dirname + '/../';
var db = require('./database.js')(Promise);
var jwt = require('jsonwebtoken');


var configure = function() {
    app.use(bodyParser.json());
};

configure();

require(projectRootSrc + 'server/static.js')(app, express, projectRootSrc);
require(projectRootSrc + 'server/routes/routes.js')(app, projectRootSrc, db);

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  var addr = server.address();

  process.env.jwtSecret = "wxf5QdgF49Pv2Nnnp3ymH7sDCPJcUfEIMwqRH7yFkAjckdLtXNDrB0jqD7Rebiu";

  console.log("Example app listening at http://%s:%s", host, port, addr);
});






