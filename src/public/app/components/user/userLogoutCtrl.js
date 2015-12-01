var app = require('angular').module('app');

app.controller('userLogoutCtrl', function($log, UserService) {

  'use strict';

  $log.debug('User is logging out');
  UserService.logout();

});
