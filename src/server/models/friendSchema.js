var mongoose = require('mongoose');

var validateEmail = function(email) {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
};

var schema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true, min: 0, max: 100},
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address.']
  },
  address: {type: String, required: true},
});

schema.methods.displayFields = function() {
  return ['firstName', 'lastName', 'age', 'email', 'address'];
};

module.exports = schema;
