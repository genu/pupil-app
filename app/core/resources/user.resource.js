'use strict';

angular.module('app.core')
  .service('User', function (DS, DSStamplayAdapter) {
    return DS.defineResource({
      name: 'user',

      // Static methods
      login: function (credentials) {
        return DSStamplayAdapter.login(credentials);
      },
      register: function (credentials) {
        return DSStamplayAdapter.register(credentials);
      },
      logout: function () {
        return DSStamplayAdapter.logout();
      },
      currentUser: function () {
        return DSStamplayAdapter.currentUser();
      }
    });
  }).run(function (User) {
});
