var app = require('angular').module('app');

app.controller('usersLogoutCtrl', function($log, User) {

  'use strict';

  $log.debug('User is logging out');
  User.logout();

});
