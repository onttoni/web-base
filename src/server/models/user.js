var mongoose = require('mongoose');

var User = mongoose.model('User', {
  authId: {type: String, unique: true},
  username: {type: String, unique: true},
  password: String,
  email: {type: String, unique: true},
  created: Date
});

module.exports = User;
