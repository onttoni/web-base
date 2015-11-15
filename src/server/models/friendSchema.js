var PersonSchema = require('./personSchema');

var FriendSchema = new PersonSchema({
  age: {type: Number, required: true, min: 0, max: 100},
  address: {type: String, required: true},
});

FriendSchema.methods.displayFields = function() {
  return ['firstName', 'lastName', 'age', 'email', 'address'];
};

module.exports = FriendSchema;
