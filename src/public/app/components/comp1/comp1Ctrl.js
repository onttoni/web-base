// @ngInject
module.exports = function ($scope) {

  'use strict';

  $scope.home = {};

  $scope.home.reload = function() {
    location.reload();
  };

};
