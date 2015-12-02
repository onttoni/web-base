var ObjectId = require('mongoose').Schema.Types.ObjectId;
var PersonSchema = require('./personSchema');

var FriendSchema = new PersonSchema({
  age: {type: Number, required: true, min: 0, max: 100},
  address: {type: String, required: true},
  user: {type: ObjectId}
});

FriendSchema.methods.displayFields = function() {
  return ['firstName', 'lastName', 'age', 'email', 'address'];
};

module.exports = FriendSchema;
