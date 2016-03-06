'use strict';

angular.module('app.session', ['app.core'])
  .run(function (SideMenu) {
    SideMenu.add('Session History', 'app.session', 'ion-clock', 3);

  });
