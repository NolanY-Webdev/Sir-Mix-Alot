var datastore = require('./DataStore.js');
var Model = require('./Model.js');

function User() {
  var UserSchema = {
    username : String,
    password : String
  };

  Model.call(this, UserSchema);
  Model.extend(User);
};

module.exports = User;