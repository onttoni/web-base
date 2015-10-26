var app = require('angular').module('app');

app.controller('aboutCtrl', function($scope, ModalService) {

  'use strict';

  $scope.about = {};

  $scope.about.showModal = function() {
    ModalService.showModal({
      templateUrl: 'app/components/about/about.html.tmpl',
      controller: 'aboutCtrl',
    }).then(function(modal) {
      modal.element.modal();
    });
  };

  $scope.about.getUa = function() {
    return navigator.userAgent;
  };

});
