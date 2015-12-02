var app = require('angular').module('app');

app.config(function($stateProvider, $urlRouterProvider) {

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
    }).
    state('app.home', {
      url: '/',
      templateUrl: 'app/components/home/homeView.html.tmpl',
      controller: 'homeCtrl'
    });
});
