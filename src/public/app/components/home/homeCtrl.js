var app = require('angular').module('app');

app.controller('homeCtrl', function($scope) {

  'use strict';

  $scope.home = {};

  $scope.home.reload = function() {
    location.reload();
  };

});
