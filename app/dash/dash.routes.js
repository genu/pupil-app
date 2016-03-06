'use strict';

angular.module('app.dash')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.dash', {
        url: '/dash',
        views: {
          'pageContent': {
            templateUrl: 'dash/views/dash.html',
            controller: 'DashCtrl as dash'
          }
        }
      });
  });
