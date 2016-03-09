'use strict';

angular.module('app.db', [])
  .run(function ($window, $q, $stamplay) {
    function DSStamplayAdapter() {
      var user = $stamplay.User;

      this.register = function (registration) {
        var deferred = $q.defer();

        user.signup(registration).then(function (user) {
          deferred.resolve(user)
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      };

      this.login = function (credentials) {
        var deferred = $q.defer();

        user.login(credentials).then(function (user) {
          deferred.resolve(user)
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      };

      this.logout = function () {
        var deferred = $q.defer();

        store.remove(window.location.origin + '-jwt');
        deferred.resolve(true);

        return deferred.promise;
      };

      this.currentUser = function () {
        var deferred = $q.defer();

        user.currentUser().then(function (response) {
          if (response.user === undefined) {
            deferred.resolve(false);
          } else {
            deferred.resolve(response.user);
          }
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    }

    DSStamplayAdapter.prototype.create = function (definition, attrs, options) {

    };

    $window.DSStamplayAdapter = DSStamplayAdapter;
  });
