var app = require('angular').module('app');

app.filter('sanitize', function($sce) {

  'use strict';

  return function(snippet) {
    return $sce.trustAsHtml(snippet);
  };

});
