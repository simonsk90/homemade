var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var Promise = require("bluebird");
var projectRootSrc = __dirname + '/../';
var db = require('./database.js')(Promise);

var configure = function() {
    app.use(bodyParser.json());
};

configure();

require(projectRootSrc + 'server/static.js')(app, express, projectRootSrc);
require(projectRootSrc + 'server/routes/routes.js')(app, projectRootSrc, db);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  var addr = server.address();

  console.log("Example app listening at http://%s:%s", process.env.PORT , host, port, addr);
});






