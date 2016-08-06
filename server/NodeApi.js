var express = require('express');
var app = express();

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//  });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// var allowCrossDomain = function(req, res, next) {
//     if ('OPTIONS' == req.method) {
//       res.header('Access-Control-Allow-Origin', '*');
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };

// app.use(allowCrossDomain);

// app.use(express.static('/home/ubuntu/workspace/client/views'));
// app.use(express.static('/home/ubuntu/workspace/client/js/app_start'));
// app.use(express.static('/home/ubuntu/workspace/client/js/controllers'));
// app.use(express.static('/home/ubuntu/workspace/client/js/libraries'));


app.get('/api/GetTest', function (req, res) {
    console.log('gotit');
    res.send('Hello World!');
});

var server = app.listen(process.env.PORT, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  console.log(__dirname);

})

// app.use(express.static(__dirname + '/public'));




// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log('Listening on port ' + process.env.PORT);
//     console.log('Example app listening on port !' + process.env.PORT);
// })



// var listener = app.listen(8888, function(){
//     console.log('Listening on port ' + listener.address().address); //Listening on port 8888
// });

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(process.env.PORT, process.env.IP);