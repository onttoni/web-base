$ = jQuery = require('jquery');
require('bootstrap');
require('angular');
require('angular-route');
require('angular-modal-service');

var app = angular.module('app', [ 'ngRoute', 'angularModalService' ]);

require('../js/jquery_parts');
require('./shared/modal');
require('./components/about');
require('./components/comp1');
require('./components/comp2');
require('./routes');
