define(['angular', 'shared/services'], function(angular) {

  var user = angular.module('user');

  user.controller('userLogoutCtrl', function($log, UserService) {

    'use strict';

    $log.debug('User is logging out');
    UserService.logout();

  });

});
