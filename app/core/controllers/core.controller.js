'use strict';

angular.module('app.core').controller('CoreCtrl', function ($scope, $stamplay, store, $state, $ionicLoading, $ionicModal, Auth, RegisterFields, $ionicPopup, LoginFields, DS) {
  this.fields = {
    register: RegisterFields,
    login: LoginFields
  };

  this.register = function (registration) {
    $ionicLoading.show();

    DS.definitions.user.register(registration.credentials).then(function (user) {
      registration.profile.user_id = user.id;
      DS.create('profile', registration.profile).then(function (profile) {
        $ionicLoading.hide();
        $state.go('app.dash');
        $scope.modal.hide();
      })
    }).catch(function (error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Registration Error',
        template: error.message
      })
    });
  };

  this.login = function (credentials) {
    $ionicLoading.show();
    DS.definitions.user.login(credentials).then(function () {
      $ionicLoading.hide();
      $state.go('app.dash.student');
      $scope.modal.hide();
    }).catch(function (error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: "Login Error",
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
    $scope.modal.hide().then(function () {
      $state.go('app.dash');
    })
  };
});
