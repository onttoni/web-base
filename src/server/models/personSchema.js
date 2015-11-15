var mongoose = require('mongoose');
var util = require('util');

var validateEmail = function(email) {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
};

function PersonSchema() {
  mongoose.Schema.apply(this, arguments);

  this.add({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
      type: String,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address.']
    }
  });
}

util.inherits(PersonSchema, mongoose.Schema);

module.exports = PersonSchema;
