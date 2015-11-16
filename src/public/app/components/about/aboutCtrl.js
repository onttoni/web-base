var app = require('angular').module('app');

app.controller('aboutCtrl', function($scope, $uibModalInstance) {

  'use strict';

  $scope.about = {};

  $scope.about.ok = function() {
    $uibModalInstance.close();
  };

  $scope.about.getUa = function() {
    return navigator.userAgent;
  };
});
