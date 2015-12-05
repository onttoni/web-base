var _ = require('lodash');
var mongoose = require('mongoose');
var friendSchema = require('models/friendSchema');

module.exports = {
  getFriendDoc: function(scope, friendData) {
    scope.friends.friendDoc = mongoose.Document(friendData, friendSchema);
    scope.friends.displayFields = {};
    scope.friends.friendDoc.displayFields().forEach(function(field) {
      scope.friends.displayFields[field] = 'friends.friendDoc.' + field;
    });
  },
  extractDocData: function(scope) {
    var data = {};
    _.keys(scope.friends.displayFields).forEach(function(field) {
      data[field] = _.get(scope, scope.friends.displayFields[field]);
    });
    return data;
  }
};
