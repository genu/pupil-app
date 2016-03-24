'use strict';

angular.module('app.core').provider('DSStamplayAdapter', function DSStamplayAdapterProvider() {
  this.defaults = {};

  function DSStamplayAdapter(defaults, service) {
    this.defaults = defaults;
    this.lib = Stamplay;
    this.service = service;

    this.lib.init(this.defaults.appid);
  }

  DSStamplayAdapter.prototype.getLib = function () {
    return this.lib;
  };

  DSStamplayAdapter.prototype.getService = function () {
    return this.service;
  };

  DSStamplayAdapter.prototype.create = function (definition, attrs, options) {

  };


  this.$get = function ($stamplay) {
    return new DSStamplayAdapter(this.defaults, $stamplay);
  }
});
