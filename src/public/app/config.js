define(['angular'], function(angular) {

  var app = angular.module('app');

  app.config(function($locationProvider, $logProvider, $ocLazyLoadProvider, $stickyStateProvider) {

    $logProvider.debugEnabled(true);
    $stickyStateProvider.enableDebug(true);
    $locationProvider.html5Mode(true);
    $ocLazyLoadProvider.config({debug: true});

  });

});
