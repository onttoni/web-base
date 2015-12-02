var app = require('angular').module('app');

app.directive('navbar', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.templateUrl = 'app/shared/directives/navbar.html.tmpl';

  directive.scope = {};
  directive.controller = function($log, $rootScope, $scope, UserService) {

    whoAmI();

    function whoAmI() {
      UserService.whoAmI(
        function(userObj) {
          $scope.firstName = userObj.firstName;
          $scope.isSignedIn = true;
        },
        iAmNobody
      );
    }

    function iAmNobody() {
      $scope.firstName = null;
      $scope.isSignedIn = false;
    }

    $rootScope.$on('user:signIn', function() {
      $log.debug('navbar <- user:signIn');
      whoAmI();
    });

    $rootScope.$on('user:signOut', function() {
      $log.debug('navbar <- user:signOut');
      iAmNobody();
    });
  };

  return directive;
});
