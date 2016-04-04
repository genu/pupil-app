'use strict';

angular.module('app.dash').controller('DashCtrl', function ($scope, $ionicPopup, $pusher, Session, Profile, profile, tutorsQuery, tutors, courses, locations, $ionicModal, $cordovaGeolocation, $ionicLoading, leafletData) {
  var vm = this;

  this.tutors = tutors;
  this.profile = profile;
  this.locations = locations;
  this.courses = courses;
  this.locationSet = false;
  this.courseSet = false;
  this.session = Session.createInstance({
    student_id: profile.id
  });

  this.map = {
    center: {},
    defaults: {},
    markers: {
      tutor: {
        lat: 33.77719,
        lng: -84.39620,
        icon: {
          iconUrl: 'dash/assets/tutor.jpg',
          iconSize: [38, 38],
          iconAnchor: [38, 38]
        }
      }
    }
  };

  if (!_.isUndefined(profile._geolocation)) {
    this.map.center = {
      lat: profile._geolocation.coordinates[1],
      lng: profile._geolocation.coordinates[0],
      zoom: 12
    };

    this.map.markers.my_location = {
      lat: profile._geolocation.coordinates[1],
      lng: profile._geolocation.coordinates[0],
      draggable: false,
      focus: true
    };

    if (!profile.isAvailable) {
      this.map.markers.my_location.message = this.tutors.length + ' tutors near you';
    }
  }

  $pusher(client).subscribe('session').bind('new_session', function (student) {
    if (vm.profile.isAvailable) {
      Profile.find(student.student_id).then(function (_student) {
        $ionicPopup.alert({
          title: "Tutoring Request",
          template: _student.fullName + ' needs help '
        })
      });
    }
  });

  $pusher(client).subscribe('tutors').bind('tutor_availability_changed', function (data) {
    Profile.refreshAll(tutorsQuery).then(function (tutors) {
      vm.tutors = tutors;
    })
  });

  $ionicLoading.show();
  this.setLocation = function (location) {
    this.location = location;
    this.locationSet = true;
    this.locationModal.hide().then(function () {
      vm.locationModal.remove();
    })
  };

  this.setCourse = function (course) {
    this.course = course;
    this.courseSet = true;
    this.courseModal.hide().then(function (modal) {
      vm.courseModal.remove();
    })
  };

  this.selectLocation = function () {
    $ionicModal.fromTemplateUrl('dash/views/modals/setLocation.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.locationModal = modal;
      modal.show();
    })
  };

  this.selectCourse = function () {
    $ionicModal.fromTemplateUrl('dash/views/modals/setCourse.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.courseModal = modal;
      modal.show();
    })
  };

  this.cancelSession = function () {
    this.session.DSDestroy().then(function (test) {
      vm.sessionModal.hide();
      $ionicPopup.alert({
        title: "Cancelled",
        template: "Tutor Request Cancelled"
      })
    });
  };
  this.startSession = function (course, location) {
    this.session.course_id = course.id;
    this.session.location_id = location.id;

    $ionicModal.fromTemplateUrl('dash/views/modals/findTutor.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.sessionModal = modal;
      modal.show();
    });

    this.session.DSCreate().then(function (session) {
      vm.session = session;
    });
  };

  this.getSessionState = function () {
    if (_.isUndefined(this.session.tutor)) {
      return 'Finding Tutor...';
    } else if (!_.isUndefined(this.session.start)) {
      return 'Session Started';
    }
  };

  this.setCurrentLocation = function () {
    $ionicLoading.show();
    $cordovaGeolocation
      .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
      .then(function (position) {
        $ionicLoading.hide();
        vm.map.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 18
        };

        vm.map.markers.my_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          draggable: false,
          focus: true
        };

        if (!profile.isAvailable) {
          vm.map.markers.my_location.message = vm.tutors.length + ' tutors near you';
        }

      });
  };

  this.setCurrentLocation();
});
