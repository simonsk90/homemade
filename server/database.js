var mongoose = require('mongoose');

module.exports = function (Promise) {

    Promise.promisifyAll(mongoose);

    var hostname = "127.0.0.1:27017";

    mongoose.connect('mongodb://' + hostname + '/test');
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("CONNECTED WOHOO2");
      // we're connected!
    });
    
    return db;
};