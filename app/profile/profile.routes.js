'use strict';

angular.module('app.profile').config(function ($stateProvider) {
  $stateProvider
    .state('app.profile', {
      url: '/profile',
      views: {
        'pageContent': {
          templateUrl: 'profile/views/profile.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
    .state('app.profile_edit_name', {
      url: '/profile_edit_name',
      views: {
        'pageContent': {
          templateUrl: 'profile/views/edit_name.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
    .state('app.profile_edit_picture', {
      url: '/edit_picture',
      views: {
        'pageContent': {
          templateUrl: 'profile/views/edit_picture.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
    .state('app.profile_edit_phone', {
      url: '/profile_edit_phone',
      views: {
        'pageContent': {
          templateUrl: 'profile/views/edit_phone.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
    .state('app.profile_edit_school', {
      url: '/profile_edit_school',
      views: {
        'pageContent': {
          templateUrl: 'profile/views/edit_school.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
});
