var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var projectRootSrc = __dirname + '/../';
var db = require('./Database.js')();

var configure = function() {
    app.use(bodyParser.json());
};



configure();

require(projectRootSrc + 'server/Static.js')(app, express, projectRootSrc);
require(projectRootSrc + 'server/Routes/Routes.js')(app, projectRootSrc, db);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  var addr = server.address();

  console.log("Example app listening at http://%s:%s", process.env.PORT , host, port, addr);
});






