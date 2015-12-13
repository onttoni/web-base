define(['angular'], function(angular) {

  var directives = angular.module('directives');

  // See http://stackoverflow.com/questions/12553617/how-can-i-set-a-dynamic-model-name-in-angularjs
  directives.directive('dynamicModel', function($compile, $parse) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function(scope, elem) {
        var name = $parse(elem.attr('dynamic-model'))(scope);
        elem.removeAttr('dynamic-model');
        elem.attr('ng-model', name);
        $compile(elem)(scope);
      }
    };
  });

});
