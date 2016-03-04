'use strict';

angular.module('app.core').controller('CoreCtrl', function ($scope, $state, $ionicModal, RegisterFields, LoginFields, Auth) {
  this.fields = {
    register: RegisterFields,
    login: LoginFields
  };

  this.auth = function (credentials) {
    Auth.auth(credentials.email, credentials.password).then(function (user) {

    });
  };

  this.register = function (registration) {
    Auth.register(registration.email, registration.password, registration.profile).then(function (user) {
      $scope.modal.hide();
      $state.go('app.main')
    })
  };

  this.showAuthModal = function (page) {
    $ionicModal.fromTemplateUrl('core/views/modals/' + page + '.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      modal.show();
    });
  };

  $scope.hideModal = function () {
    $scope.modal.hide();
  };
});
