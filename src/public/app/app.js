define(['angular'],
  function(angular) {

    'use strict';

    require('shared/directives');
    require('shared/filters');
    require('shared/interceptors');
    require('shared/services');

    var appDeps = [
      'ct.ui.router.extras',
      'oc.lazyLoad',
      'ui.router',
      'directives',
      'filters',
      'interceptors',
      'services'
    ];
    var app = angular.module('app', appDeps);

    require('config');
    require('../js/jquery_parts');
    require('states');

    return app;
  }
);
