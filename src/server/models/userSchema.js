var bcrypt   = require('bcrypt-nodejs');
var PersonSchema = require('./personSchema');

var UserSchema = new PersonSchema({
  password: {type: String, required: true}
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.displayFields = function() {
  return ['name.given', 'name.family', 'email', 'password'];
};

module.exports = UserSchema;
