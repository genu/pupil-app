'use strict';

angular.module('app.core').provider('DSStamplayAdapter', function DSStamplayAdapterProvider() {
  this.defaults = {};

  function DSStamplayAdapter(defaults, service, q) {
    this.defaults = defaults;
    this.lib = Stamplay;
    this.service = service;
    this.q = q;

    this.lib.init(this.defaults.appid);
  }

  DSStamplayAdapter.prototype.getLib = function () {
    return this.lib;
  };

  DSStamplayAdapter.prototype.getService = function () {
    return this.service;
  };

  DSStamplayAdapter.prototype.find = function (resourceConfig, id, options) {
    var deferred = this.q.defer();

    this.service.Object(resourceConfig.endpoint).get({_id: id}).then(function (data) {
      deferred.resolve(data.data[[0]]);
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  DSStamplayAdapter.prototype.findAll = function (resourceConfig, params, options) {
    var deferred = this.q.defer();

    this.service.Object(resourceConfig.endpoint).get().then(function (data) {
      deferred.resolve(data.data);
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  DSStamplayAdapter.prototype.create = function (definition, attrs, options) {

  };


  this.$get = function ($stamplay, $q) {
    return new DSStamplayAdapter(this.defaults, $stamplay, $q);
  }
});
