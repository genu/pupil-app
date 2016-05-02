'use strict';

angular.module('app.dash').controller('DashCtrl', function ($scope, $window, $ionicPlatform, $ionicPopup, $timeout, PusherInstance, Session, Profile, profile, $ionicModal, $cordovaGeolocation, $ionicLoading, leafletData, geo) {
  var vm = this;

  this.session = Session.createInstance();
  this.map = {
    center: {
      lat: geo.coords.latitude,
      lng: geo.coords.longitude,
      zoom: 17
    },
    controls: {},
    defaults: {
      attributionControl: false
    },
    markers: {
      _user: {
        lat: geo.coords.latitude,
        lng: geo.coords.longitude,
        draggable: false,
        focus: true
      }
    }
  };

  this.navigate = function (label, geo_location) {
    if ($ionicPlatform.is('ios')) {
      $window.open("http://maps.apple.com/?q=" + label + '&ll=' + geo_location.coordinates[0] + ',' + geo_location.coordinates[1], "_system", "location=yes")
    }
  };

  // Remove Leaflet Attribution
  leafletData.getMap('map-canvas').then(function (map) {
    map.attributionControl.removeAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');
    map.attributionControl.setPrefix('');
  });

  // Pusher Events
  PusherInstance.subscribe('session').bind('changed', function (session) {
    if (session.id === vm.session.id) {
      Session.find(session.id, {bypassCache: true}).then(function (session) {
        session.DSLoadRelations(['profile', 'location', 'course']).then(function (session) {
          vm.session = session;
        })
      })
    }
  });

  //
  // this.cancelSession = function () {
  //   $ionicLoading.show();
  //   this.session.DSDestroy().then(function () {
  //     $ionicLoading.hide();
  //     vm.session = Session.createInstance({
  //       student_id: profile.id
  //     });
  //     vm.findTutorModal.hide();
  //     $ionicPopup.alert({
  //       title: "Cancelled",
  //       template: "Tutor Request Cancelled"
  //     })
  //   });
  // };
  //
  // this.setCurrentLocation = function () {
  //   $ionicLoading.show();
  //   $cordovaGeolocation
  //     .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
  //     .then(function (position) {
  //       $timeout(function () {
  //         $ionicLoading.hide();
  //       }, 500);
  //
  //       vm.map.center = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //         zoom: 17
  //       };
  //
  //       vm.map.markers.my_location = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //         draggable: false,
  //         focus: true
  //       };
  //
  //       if (!profile.isAvailable) {
  //         vm.map.markers.my_location.message = vm.tutors.length + ' tutors near you';
  //       }
  //
  //     });
  // };
});
