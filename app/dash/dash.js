'use strict';

angular.module('app.dash', ['app.core'])
  .run(function (SideMenu, $ionicPlatform) {
    // Add sidemenu
    SideMenu.add('Dashboard', 'app.dash', 'ion-speedometer');

    // Setup needed cordova plugins
    $ionicPlatform.ready(function () {

    });
  });
