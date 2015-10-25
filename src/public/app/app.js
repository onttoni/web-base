$ = jQuery = require('jquery');
require('bootstrap');
require('angular');
require('angular-modal-service');
require('angular-resource');
require('angular-route');
require('angular-sanitize');

var app_deps = [ 'angularModalService', 'ngResource', 'ngRoute', 'ngSanitize' ];
var app = angular.module('app', app_deps);

require('./config');
require('../js/jquery_parts');
require('./shared');
require('./components/about');
require('./components/comp1');
require('./components/friends');
require('./routes');
