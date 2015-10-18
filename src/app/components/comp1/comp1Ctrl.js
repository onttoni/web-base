module.exports = function ($scope, $log, comp1Factory) {

  'use strict';

  $scope.person = {};

  $scope.person.addPerson = function() {
    $log.info('You pressed save.');
    var temp_data = {
      name: $scope.person.name,
      age: $scope.person.age,
      address: $scope.person.address
    };

    comp1Factory.add_data(temp_data);
  };

};
