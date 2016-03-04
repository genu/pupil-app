'use strict';

angular.module('app.core').controller('CoreCtrl', function ($scope, $ionicModal, RegisterFields, LoginFields, Auth) {
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

    })
  };


  // Login Modal
  $ionicModal.fromTemplateUrl('core/views/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.loginModal = modal;
  });

  // Register Modal
  $ionicModal.fromTemplateUrl('core/views/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.registerModal = modal;
  });

  $scope.hideLogin = function () {
    $scope.loginModal.hide();
  };

  $scope.showLogin = function () {
    $scope.loginModal.show();
  };

  $scope.hideRegister = function () {
    $scope.registerModal.hide();
  };

  $scope.showRegister = function () {
    $scope.registerModal.show();
  }
});
