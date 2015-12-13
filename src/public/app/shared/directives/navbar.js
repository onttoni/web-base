define(['angular', 'bootstrap'], function(angular) {

  var directives = angular.module('directives');

  directives.directive('navbar', function() {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = 'app/shared/directives/navbar.html.tmpl';

    directive.scope = {};
    directive.controller =
      /*@ngInject*/
      function($log, $rootScope, $scope, UserService) {

        whoAmI();

        function whoAmI() {
          UserService.whoAmI(
            function(userObj) {
              $scope.userName = userObj.name.formatted;
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

});
