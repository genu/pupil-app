'use strict';

angular.module('app.dash', ['app.core'])
  .run(function ($rootScope, SideMenu, $ionicPlatform) {

    // Add sidemenu
    // SideMenu.add('Dashboard', 'app.dash', 'ion-speedometer', 0);

    // Setup needed cordova plugins
    $ionicPlatform.ready(function () {

    });
  });
