// @ngInject
module.exports = function ($scope, close) {

  'use strict';


  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
    console.info('You said: ' + result);

  };

};
