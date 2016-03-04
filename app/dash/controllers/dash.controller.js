'use strict';

angular.module('app.dash').controller('DashCtrl', function ($cordovaGeolocation, NgMap) {
  var vm = this;

  NgMap.getMap().then(function (map) {

  });

  this.setCurrentLocation = function () {
    $cordovaGeolocation
      .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
      .then(function (position) {
        vm.coords = [position.coords.latitude, position.coords.longitude];
      });
  };

  // Get location
  this.setCurrentLocation();
});
