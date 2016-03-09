'use strict';

angular.module('app.user').config(function ($stateProvider) {
  $stateProvider
    .state('app.profile', {
      url: '/profile',
      views: {
        'pageContent': {
          templateUrl: 'user/views/profile.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
    .state('app.profile_edit_name', {
      url: '/profile_edit_name',
      views: {
        'pageContent': {
          templateUrl: 'user/views/edit_name.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
});
