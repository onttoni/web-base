var app = require('angular').module('app');

app.directive('navbar', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.templateUrl = 'app/shared/directives/navbar.html.tmpl';

  directive.scope = {};
  directive.controller = function($log, $rootScope, $scope, SocketService) {
    $scope.isSignedIn = SocketService.isConnected();

    $rootScope.$on('user:signIn', function() {
      $log.debug('navbar <- user:signIn');
      $scope.isSignedIn = true;
    });

    $rootScope.$on('user:signOut', function() {
      $log.debug('navbar <- user:signOut');
      $scope.isSignedIn = false;
    });
  };

  return directive;
});
