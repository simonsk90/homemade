var bcrypt = require('bcrypt');

module.exports = function (app, db) {


    app.get('/api/GetTest', function (req, res) {
        console.log('gotit2');
        res.send('Hello World2!');
    });
    
    app.post('/api/registerUser', function (req, res) {
        
        var user = req.body;
        
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return console.log('bcryptgensalt', err);
            }
            bcrypt.hash("my password", salt, function(err, hash) {
                if (err) {
                    return console.log('hash', err);
                }
                // Store hash in your password DB.
                
                user.password = hash;
                
                db.collection('users').insert(user, (err, result) => {
                    if (err)  {
                        return console.log(err);
                    }
                });
            });
        });
        
        res.send();
        
    });
}