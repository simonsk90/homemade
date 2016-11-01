var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var path = require('path');
// var db = require('./Database.js')();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      if ('OPTIONS' === req.method) {
        res.send(200);
      } 
      else {
        next();
      }
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Example app listening at http://%s:%s", host, port)
});

// require('./Routes.js')(app, db);








// app.use(express.static('/home/ubuntu/workspace/client/views'));
// app.use(express.static('/home/ubuntu/workspace/client/js/app_start'));
// app.use(express.static('/home/ubuntu/workspace/client/js/controllers'));
// app.use(express.static('/home/ubuntu/workspace/client/js/libraries'));
app.use(express.static('/home/ubuntu/workspace/client/js/libraries/angular2/'));
app.use(express.static('/home/ubuntu/workspace/client/js/libraries/angular2/app/'));
app.use(express.static('/home/ubuntu/workspace/client/app/js/'));
app.use(express.static('/home/ubuntu/workspace/client/styles/'));
app.use(express.static('/home/ubuntu/workspace/app/ts'));
app.use(express.static('/home/ubuntu/workspace/'));


app.use(express.static(__dirname + '/public'));
