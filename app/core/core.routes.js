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
      controller: 'AppCtrl as app',
      resolve: {
        geo: function ($cordovaGeolocation) {
          return $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true});
        },
        user: function (User) {
          return User.currentUser();
        },
        schools: function (School) {
          return School.findAll();
        },
        profile: function (Profile, user) {
          return Profile.findAll({
            where: {
              user_id: {
                '==': user.id
              }
            }
          }).then(function (profile) {
            return profile[0].DSLoadRelations(['school', 'user']);
          });
        }
      }
    })
    .state('core.main', {
      url: '/main',
      templateUrl: 'core/views/main.html',
      controller: 'MainCtrl as main'
    });
});
