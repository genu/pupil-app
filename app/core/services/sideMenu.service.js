'use strict';

angular.module('app.core').service('SideMenu', function () {
  var menu = [];

  this.add = function (label, sref, icon) {
    menu.push({
      label: label,
      sref: sref,
      icon: icon
    })
  };

  this.getItems = function () {
    return menu;
  }
});
