var app = require('angular').module('app');

app.controller('friendsCtrl', require('./friendsCtrl'));
app.controller('friendsAddCtrl', require('./friendsAddCtrl'));
app.controller('friendsDeleteCtrl', require('./friendsDeleteCtrl'));
app.factory('Friend', require('./friendsFactory'));
