var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true, min: 0, max: 100},
  email: {type: String, required: true},
  address: {type: String, required: true},
});

schema.methods.displayFields = function() {
  return ['firstName', 'lastName', 'age', 'email', 'address'];
};

module.exports = schema;
