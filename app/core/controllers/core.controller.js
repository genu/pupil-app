'use strict';

angular.module('app.core').controller('CoreCtrl', function ($scope, $state, $ionicLoading, $ionicModal, RegisterFields, $ionicPopup, LoginFields, DS, Auth) {
  this.fields = {
    register: RegisterFields,
    login: LoginFields
  };

  this.register = function (registration) {
    $ionicLoading.show();
    DS.adapters[DS.defaults.defaultAdapter].register(registration).then(function () {
      $state.go('app.dash');
      $ionicLoading.hide();
      $scope.modal.hide();
    }).catch(function (error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Registration Error',
        template: error.message
      });
    });
  };

  this.login = function (credentials) {
    $ionicLoading.show();
    DS.adapters[DS.defaults.defaultAdapter].login(credentials).then(function () {
      $state.go('app.dash');
      $ionicLoading.hide();
      $scope.modal.hide();
    }).catch(function (error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Login Error',
        template: error.message
      })
    });
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
