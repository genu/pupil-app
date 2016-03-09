'use strict';

angular.module('app.core').service('Auth', function ($q, DS) {
  //var ref = DS.adapters.firebase.ref;
  //
  //this.auth = function (email, password) {
  //  var defer = $q.defer();
  //
  //  ref.authWithPassword({email: email, password: password}).then(function (uid) {
  //     get profile and return profile
  //
  //defer.resolve(uid);
  //
  //}).catch(function (err) {
  //  defer.reject(err.message);
  //});
  //
  //return $q.promise;
  //};
  //
  //this.register = function (email, password, profile) {
  //  var defer = $q.defer();
  //  ref.createUser({email: email, password: password}).then(function (uid) {
  //     1. Create profile
  //     2. Auth this user
  //     3. Resolve to the profile data
  //defer.resolve(uid)
  //}).catch(function (err) {
  //  defer.reject(err.message);
  //});
  //
  //return defer.promise;
  //}
});
