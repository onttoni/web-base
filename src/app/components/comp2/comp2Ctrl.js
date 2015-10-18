module.exports = function ($scope, comp1Factory) {

  'use strict';

  $scope.person = {};

  $scope.person.data = comp1Factory.get_data();

};
