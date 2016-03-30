'use strict';

angular.module('app.core').provider('DSStamplayAdapter', function DSStamplayAdapterProvider(DSProvider) {
  DSProvider.defaults = {
    idAttribute: '_id'
    // defaultFilter: function(){
    //   debugger;
    // }
  };

  this.defaults = {};

  function DSStamplayAdapter(defaults, service, q, store, config) {
    this.defaults = defaults;
    this.lib = Stamplay;
    this.service = service;
    this.q = q;
    this.store = store;
    this.config = config;

    this.lib.init(defaults.appid);
  }

  DSStamplayAdapter.prototype.logout = function () {
    var deferred = this.q.defer();

    this.store.remove(window.location.origin + '-jwt');

    deferred.resolve();

    return deferred.promise;
  };

  DSStamplayAdapter.prototype.login = function (credentials) {
    return this.service.User.login(credentials);
  };

  DSStamplayAdapter.prototype.currentUser = function () {
    var deferred = this.q.defer();

    this.service.User.currentUser().then(function (user) {
      deferred.resolve(user.user);
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  DSStamplayAdapter.prototype.register = function (credentials) {
    return this.service.User.signup(credentials);
  };

  DSStamplayAdapter.prototype.getLib = function () {
    return this.lib;
  };

  DSStamplayAdapter.prototype.getService = function () {
    return this.service;
  };

  DSStamplayAdapter.prototype.find = function (resourceConfig, id, options) {
    var deferred = this.q.defer();
    if (resourceConfig.name === 'user') {
      return this.currentUser();
    } else {
      this.service.Object(resourceConfig.endpoint).get({_id: id}).then(function (data) {
        deferred.resolve(data.data[[0]]);
      }).catch(function (error) {
        deferred.reject(error);
      });
    }

    return deferred.promise;
  };

  DSStamplayAdapter.prototype.findAll = function (resourceConfig, params, options) {
    var deferred = this.q.defer();

    if (resourceConfig.name === 'user') {
      this.currentUser().then(function (user) {
        deferred.resolve([user]);
      })
    } else {
      this.service.Object(resourceConfig.endpoint).get(params).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (error) {
        deferred.reject(error);
      });
    }

    return deferred.promise;
  };

  DSStamplayAdapter.prototype.create = function (resourceConfig, params, options) {
    var deferred = this.q.defer();

    this.service.Object(resourceConfig.endpoint).save(params).then(function (response) {
      deferred.resolve(response);
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };


  this.$get = function ($stamplay, $q, store, Config) {
    return new DSStamplayAdapter(this.defaults, $stamplay, $q, store, Config);
  }
})
;
