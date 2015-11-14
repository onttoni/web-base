var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    created: Date
  });

// generating a hash
schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = schema;
