var app = require('angular').module('app');

app.controller('comp1Ctrl', function($scope) {

  'use strict';

  $scope.home = {};

  $scope.home.reload = function() {
    location.reload();
  };

});
