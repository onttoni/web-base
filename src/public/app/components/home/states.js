define(['angular'], function(angular) {

  var home = angular.module('home');

  home.config(function($stateProvider) {

    'use strict';

    $stateProvider.
    state('app.home', {
      url: '/',
      templateUrl: 'app/components/home/homeView.html.tmpl',
      controller: 'homeCtrl'
    });

  });

});
