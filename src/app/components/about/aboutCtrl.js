module.exports = function ($scope, ModalService) {

  'use strict';

  $scope.show = function() {
    ModalService.showModal({
      templateUrl: 'components/about/about.html.tmpl',
      controller: 'modalCtrl'
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.message = "You said " + result;
      });
    });
  };

};
