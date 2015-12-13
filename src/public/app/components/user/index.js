define(['angular'], function(angular) {

  var user = angular.module('user', []);

  require('./userSignUpCtrl');
  require('./userLoginCtrl');
  require('./userLogoutCtrl');
  require('./userProfileCtrl');
  require('./states');

});
