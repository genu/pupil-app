'use strict';

angular.module('app.user', ['app.core'])
  .run(function (SideMenu) {
    SideMenu.add('Profile', 'app.profile', 'ion-person');
    SideMenu.add('Logout', 'core.logout', 'ion-power');
  });
