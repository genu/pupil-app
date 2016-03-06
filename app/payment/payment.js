'use strict';

angular.module('app.payment', ['app.core'])
  .run(function (SideMenu) {
    SideMenu.add('Payment', 'app.payment', 'ion-card', 2);
  });
