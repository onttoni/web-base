var mongoose = require('mongoose');

var User = mongoose.model('User', {
  username: { type: String, unique: true },
  password: String
});

module.exports = User;
