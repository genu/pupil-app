'use strict';

angular.module('app.dash').controller('TutorDashCtrl', function ($scope, $interval, $timeout, $ionicModal, $ionicPopup, Utilities, PusherInstance, ENUM, profile, Session) {
  var vm, _handshakeTimer, _sessionTimer, _modal, _requestPopup;

  vm = this;

  this.sessionLength = 0;

  this.startSession = function (session) {
    session.state = ENUM.SESSION.IN_PROGRESS;
    session.start = moment();
    session.end = moment();
    updateSessionTimer(session.start, session.end);
    session.DSSave().then(function (session) {
      $scope.dash.session = session;
      _sessionTimer = $interval(function () {
        session.end = moment();
        updateSessionTimer(session.start, session.end);
      }, 1000)
    });
  };

  this.endSession = function (session) {
    session.end = moment();
    session.state = ENUM.SESSION.FINISHED;
    session.DSSave().then(function (session) {
      $scope.dash.session = session;
    });
    $interval.cancel(_sessionTimer);
  };

  this.rateSession = function (session) {
    session.state = ENUM.SESSION.FINISHED;
    session.DSSave().then(function () {
      $scope.dash.session = Session.createInstance({});
      _modal.hide().then(function () {
        _modal.remove();
      })
    })
  };

  // Pusher events
  PusherInstance.subscribe('session').bind('new', function (session) {
    Session.find(session.id).then(function (session) {
      session.DSLoadRelations(['profile', 'location', 'course']).then(function (session) {
        // Only consider sessions from the same university as tutor
        if (session.location.school.id === profile.school.id) {
          // Temporarily reserve this session to this tutor
          session.state = ENUM.SESSION.AWAITING_HAND_SHAKE;
          session.DSSave().then(function (temporary_reservation_session) {
            $scope.dash.session = temporary_reservation_session;
            _handshakeTimer = $timeout(requestTimeout, 15000);
            _requestPopup = $ionicPopup.confirm({
              title: 'Tutoring Request',
              scope: $scope,
              templateUrl: 'dash/views/modals/tutorConfirmSession.html',
              buttons: [
                {
                  text: 'Reject',
                  type: 'button-assertive',
                  onTap: function () {
                    return false;
                  }
                }, {
                  text: 'Accept',
                  type: 'button-balanced',
                  onTap: function () {
                    return true;
                  }
                }
              ]
            });

            _requestPopup.then(function (accepted) {
              if (accepted) {
                $timeout.cancel(_handshakeTimer);
                $scope.dash.session.state = ENUM.SESSION.PENDING_START;
                $scope.dash.session.tutor = profile;

                $scope.dash.session.DSSave().then(function (active_session) {
                  $scope.dash.session = active_session;

                  $ionicModal.fromTemplateUrl('dash/views/modals/tutorSession.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                  }).then(function (modal) {
                    _modal = modal;
                    modal.show();
                  })
                })
              }
            })
          });
        }
      });
    });
  });

  function requestTimeout() {
    _requestPopup.close();
    // Put the session back on the queue
    $scope.dash.session.state = ENUM.SESSION.PENDING;
    $scope.dash.session.DSSave().then(function () {
      $scope.dash.session = Session.createInstance();
      $ionicPopup.alert({
        title: 'Request expired',
        template: 'The tutoring request expired. Please disable <strong>Tutor Mode</strong> if you are not available to tutor'
      })
    });
  }

  function updateSessionTimer(start, end) {
    vm.sessionLength = Utilities.formatSessionTime(end.diff(moment(start), 'seconds'));
  }
});
