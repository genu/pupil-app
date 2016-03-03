'use strict';

angular.module('app.core').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/core/main');

  $stateProvider
    .state('core', {
      url: '/core',
      abstract: true,
      templateUrl: 'core/views/layouts/core.html',
      controller: 'CoreCtrl as core'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'core/views/layouts/app.html',
      controller: 'AppCtrl as app'
    })
    .state('core.main', {
      url: '/main',
      templateUrl: 'core/views/main.html',
      controller: 'MainCtrl as main'
    })
});
