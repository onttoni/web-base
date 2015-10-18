module.exports = function ($scope) {

  'use strict';

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };

};
