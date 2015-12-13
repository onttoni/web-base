define(['angular'], function(angular) {

  var app = angular.module('app');

  app.config(function($futureStateProvider, $stateProvider, $urlRouterProvider) {

    'use strict';

    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('app', {
        url: '',
        abstract: true,
        sticky: true,
        template: '<ui-view></ui-view>',
        views: {
          'app': {
            templateUrl: 'app/shared/views/body.html.tmpl'
          },
          'header@app': {
            templateUrl: 'app/shared/views/header.html.tmpl'
          },
          'footer@app': {
            templateUrl: 'app/shared/views/footer.html.tmpl'
          }
        }
      });

    var ocLazyLoadStateFactory = function($q, $ocLazyLoad, futureState) {
      var deferred = $q.defer();
      $ocLazyLoad.load(futureState.src).then(function() {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
      return deferred.promise;
    };

    function loadAndRegisterFutureStates($http) {
      return $http.get('app/futureStates.json').then(function(resp) {
        angular.forEach(resp.data, function(fstate) {
          $futureStateProvider.futureState(fstate);
        });
      });
    }

    $futureStateProvider.stateFactory('ocLazyLoad', /*@ngInject*/ ocLazyLoadStateFactory);
    $futureStateProvider.addResolve(/*@ngInject*/ loadAndRegisterFutureStates);

  });

});
