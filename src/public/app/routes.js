var app = require('angular').module('app');

app.config(function($routeProvider) {
  
    'use strict';

    $routeProvider.
    when('/', {
      templateUrl: 'components/comp1/comp1view.html.tmpl',
      controller: 'comp1Ctrl'
    }).
    when('/view2', {
      templateUrl: 'components/comp2/comp2view.html.tmpl',
      controller: 'comp2Ctrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
);
