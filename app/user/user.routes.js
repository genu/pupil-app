'use strict';

angular.module('app.user').config(function ($stateProvider) {
  $stateProvider
    .state('core.login', {
      url: '/login',
      templateUrl: 'user/views/login.html',
      controller: 'UserCtrl as user'
    })
    .state('core.register', {
      url: '/register',
      templateUrl: 'user/views/register.html',
      controller: 'UserCtrl as user'
    })
});
