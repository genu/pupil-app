'use strict';

angular.module('app.dash').controller('StudentDashCtrl', function ($scope, $ionicModal, PusherInstance, ENUM, profile, tutors, Location, Course, Session, Profile) {
    var vm, _modal;

    vm = this;
    _modal = '';

    this.tutors = tutors;
    this.locations = [];
    this.courses = [];

    $scope.dash.session.student_id = profile.id;

    this.selectLocation = function () {
      Location.findAll({
        where: {
          school_id: {
            '==': profile.school.id
          }
        }
      }).then(function (locations) {
        vm.locations = locations;
        createModal('selectLocation').then(function (modal) {
          modal.show();
        })
      });
    };

    this.selectCourse = function () {
      Course.findAll({
        where: {
          school_id: {
            '==': profile.school.id
          }
        }
      }).then(function (courses) {
        vm.courses = courses;
        createModal('selectCourse').then(function (modal) {
          modal.show();
        })
      })
    };

    this._closeModal = function () {
      _modal.hide().then(function () {
        _modal.remove();
      })
    };

    this.requestTutor = function (session) {
      session.state = ENUM.SESSION.PENDING;

      session.DSCreate().then(function (session) {
        $scope.dash.session = session;
      });

      createModal('studentSession').then(function (modal) {
        modal.show();
      })
    };

    this.cancelSession = function () {
      
    };

    function createModal(name) {
      return $ionicModal.fromTemplateUrl('dash/views/modals/' + name + '.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        _modal = modal;
        return modal;
      })
    }

    function updateTutors(tutors) {
      angular.extend($scope.dash.map.markers._user, {
        message: tutors.length + ' tutors near you!'
      });
      // Remove all current tutors and replace them with newly available ones
      for (var marker in $scope.dash.map.markers) {
        if (marker.includes('tutor')) {
          delete $scope.dash.map.markers[marker];
        }
      }
      _.forEach(tutors, function (tutor, index) {
        $scope.dash.map.markers['tutor_' + index] = {
          lat: tutor._geolocation.coordinates[1],
          lng: tutor._geolocation.coordinates[0],
          icon: {
            iconUrl: 'dash/assets/tutor.png',
            iconSize: [48, 48],
            iconAnchor: [48, 48]
          }
        }
      });
    }

    // Pusher events
    PusherInstance.subscribe('tutors').bind('availability_changed', function () {
      Profile.refreshAll({
        where: {
          isAvailable: {
            '==': true
          }
        }
      }).then(function (tutors) {
        vm.tutors = tutors;
        updateTutors(tutors);
      })
    });

    updateTutors(tutors)
  }
);
