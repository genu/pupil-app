'use strict';

angular.module('app.core').service('Auth', function ($stamplay) {
  this.login = function (credentials) {
    return $stamplay.User.login(credentials);
  };

  this.signup = function (credentials) {
    return $stamplay.User.signup(credentials);
  };
});
