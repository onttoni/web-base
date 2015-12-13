define(['angular'], function(angular) {

  var home = angular.module('home');

  home.controller('homeCtrl', function($scope) {

    'use strict';

    $scope.home = {};

    $scope.home.reload = function() {
      location.reload();
    };

  });

});
