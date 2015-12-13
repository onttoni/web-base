define(['angular'], function(angular) {

  var about = angular.module('about');

  about.config(function($stateProvider) {

    'use strict';

    var previousState;

    $stateProvider.state('about', {
      url: '/about',
      onEnter: function($previousState, $uibModal) {
        previousState = $previousState.memo('previousState');
        $uibModal.open({
          templateUrl: 'app/components/about/about.html.tmpl',
          controller: 'aboutCtrl'
        }).result.finally(function() {
          $previousState.go('previousState');
        });
      }
    });

  });

});
