module.exports = {
    
    collectionLogicUsers : function() {
        var blogicCollectionUsers = require("./businessLogic/dbLogic/collections/users.js");
        return blogicCollectionUsers;
    },
    
    dbModelUsers: function() {
        var dbModelUsers = require("./models/dbModels/userDbModel.js");
        return dbModelUsers;
    }
    
};