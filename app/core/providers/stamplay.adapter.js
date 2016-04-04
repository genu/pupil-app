'use strict';

angular.module('app.core').provider('DSStamplayAdapter', function DSStamplayAdapterProvider(DSProvider) {
  DSProvider.defaults = {
    idAttribute: '_id'
  };

  this.defaults = {};

  function DSStamplayAdapter(defaults, service, q, store, config, upload) {
    this.defaults = defaults;
    this.upload = upload;
    this.lib = Stamplay;
    this.service = service;
    this.q = q;
    this.store = store;
    this.config = config;

    this.defaults.basePath = Stamplay.BASEURL;
    this.lib.init(defaults.appid);
  }

  // Stripe
  DSStamplayAdapter.prototype.createCustomer = function (user_id) {
    return this.service.Stripe.createCustomer(user_id);
  };
  DSStamplayAdapter.prototype.createCreditCard = function (user_id, token) {
    return this.service.Stripe.createCreditCard(user_id, token);
  };
  DSStamplayAdapter.prototype.getCreditCard = function (user_id) {
    return this.service.Stripe.getCreditCard(user_id);
  };
  DSStamplayAdapter.prototype.updateCreditCard = function (user_id, token) {
    return this.service.Stripe.updateCreditCard(user_id, token);
  };
  DSStamplayAdapter.prototype.charge = function (user_id, token, amount, currency) {
    return this.service.Stripe.charge(user_id, token, amount, currency);
  };


  DSStamplayAdapter.prototype.uploadFile = function (resourceConfig, file) {
    var deferred = this.q.defer();

    this.upload.upload({
      url: this.defaults.basePath + '/api/cobject' + this.config.ENV.API_VERSION + resourceConfig.endpoint,
      data: file
    }).then(function (response) {
      debugger;
      deferred.resolve(response);
    }).catch(function (error) {
      debugger;
      deferred.reject(error);
    });

    return deferred.promise;
  };
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

  // Objects
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
    } else if (_.isObject(params)) {
      var query = this.service.Query('object', resourceConfig.endpoint);

      for (var verb in params) {
        if (params.hasOwnProperty(verb)) {
          for (var param in params[verb]) {
            if (params[verb].hasOwnProperty(param)) {
              // Where clause
              if (verb === 'where') {
                if (!_.isUndefined(params[verb][param]['=='])) {
                  query = query.equalTo(param, params[verb][param]['==']);
                }
              } else if (verb === 'orderBy') {

              } else if (verb === 'offset') {

              } else if (verb === 'limit') {

              }
            }
          }
        }
      }

      // Execute the query
      query.exec().then(function (results) {
        deferred.resolve(results.data);
      }).catch(function (error) {
        deferred.reject(error);
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
  DSStamplayAdapter.prototype.update = function (resourceConfig, id, attrs, options) {
    var deferred = this.q.defer();

    this.service.Object(resourceConfig.endpoint).update(id, attrs).then(function (response) {
      deferred.resolve(response);
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  this.$get = function ($stamplay, $q, store, Config, Upload) {
    return new DSStamplayAdapter(this.defaults, $stamplay, $q, store, Config, Upload);
  }
})
;
