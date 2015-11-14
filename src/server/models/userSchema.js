var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created: Date
  });

schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.displayFields = function() {
  return ['firstName', 'lastName', 'email', 'password'];
};

module.exports = schema;
