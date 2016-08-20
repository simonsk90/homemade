var mongoose = require('mongoose');

module.exports = function () {

    var hostname = "legolasdk-homemade-3586533:27017";

    mongoose.connect('mongodb://' + hostname + '/bosse');
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("CONNECTED WOHOO2");
      // we're connected!
    });
    
    return db;
}