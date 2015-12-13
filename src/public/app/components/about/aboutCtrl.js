define(['angular'], function(angular) {

  var about = angular.module('about');

  about.controller('aboutCtrl', function($scope, $uibModalInstance) {

    'use strict';

    $scope.about = {};

    $scope.about.ok = function() {
      $uibModalInstance.close();
    };

    $scope.about.getUa = function() {
      return navigator.userAgent;
    };

  });

});
