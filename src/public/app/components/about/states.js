var app = require('angular').module('app');

app.config(function($stateProvider) {

  'use strict';

  var previousState;

  $stateProvider.state('about', {
    url: '/about',
    onEnter: function($stateParams, $state, $previousState, $uibModal) {
      previousState = $previousState.memo('previousState');
      $uibModal.open({
        templateUrl: 'app/components/about/about.html.tmpl',
        // @ngInject
        controller: function($scope, $uibModalInstance) {
          // FIXME: Controller from a separate module.
          $scope.about = {};
          $scope.about.ok = function() {
            $uibModalInstance.close();
          };
          $scope.about.getUa = function() {
            return navigator.userAgent;
          };
        }
      }).result.finally(function() {
        $previousState.go('previousState');
      });
    }
  });

});
