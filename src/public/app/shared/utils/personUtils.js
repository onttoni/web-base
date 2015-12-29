var _ = require('lodash');
var mongoose = require('mongoose');
var friendSchema = require('models/friendSchema');
var userSchema = require('models/userSchema');

module.exports = {
  getPersonDoc: function(scope, data, schemaName) {
    var schema = schemaName === 'friendSchema' ? friendSchema : userSchema;
    scope.personDoc = mongoose.Document(data, schema);
    scope.displayFields = {};
    scope.personDoc.displayFields().forEach(function(field) {
      scope.displayFields[field] = 'personDoc.' + field;
    });
  },
  extractDocData: function(scope) {
    var data = {};
    _.keys(scope.displayFields).forEach(function(field) {
      _.set(data, field, _.get(scope, scope.displayFields[field]));
    });
    return data;
  }
};
