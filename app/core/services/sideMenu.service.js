'use strict';

angular.module('app.core').service('SideMenu', function () {
  var menu = [];

  this.add = function (label, sref, icon, order) {
    menu.push({
      label: label,
      sref: sref,
      icon: icon,
      order: order
    })
  };

  this.addCustom = function () {

  };

  this.getItems = function () {
    return menu;
  }
});
