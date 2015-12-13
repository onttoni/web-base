define(['angular'], function(angular) {

  var filters = angular.module('filters');

  filters.filter('sanitize', function($sce) {

    'use strict';

    return function(snippet) {
      return $sce.trustAsHtml(snippet);
    };

  });

});
