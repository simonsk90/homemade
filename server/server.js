var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// var fs = require('fs');
// var http = require('http');
// var Promise = require("bluebird");
var projectRootSrc = __dirname + '/../';
var db = require('./database.js')();

var webpack = require('webpack');

// var jwt = require('jsonwebtoken');


var configure = function() {
    process.env.projectRootSrc = projectRootSrc;
    process.env.environment = "development";
    app.use(bodyParser.json());
    app.set("view engine", "pug");
};

configure();

require(projectRootSrc + 'server/static.js')(app, express, projectRootSrc);
require(projectRootSrc + 'server/routes/routes.js')(app, projectRootSrc, db);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  var addr = server.address();

  process.env.jwtSecret = "wxf5QdgF49Pv2Nnnp3ymH7sDCPJcUfEIMwqRH7yFkAjckdLtXNDrB0jqD7Rebiu";

  console.log("Example app listening at http://%s:%s", host, port, addr);
});






