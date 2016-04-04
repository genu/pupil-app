'use strict';

angular.module('app.core', [
    'ionic',
    'ngCordova',
    'nemLogging',
    'ui.router', 'ui-leaflet',
    'js-data',
    'formly', 'formlyIonic',
    'ngMap',
    'ngStamplay',
    'ngMask',
    'angular-storage',
    'angular-stripe',
    'pusher-angular'
  ])
  .run(function ($rootScope, $stamplay, DS, Config, DSStamplayAdapter, $pusher) {
    // Stamplay.init(Config.ENV.APP_ID);
    DS.registerAdapter('stamplay', DSStamplayAdapter, {default: true});

    // Initialize pusher
    window.client = new Pusher(Config.ENV.PUSHER_KEY);
  })
  .config(function (formlyConfigProvider, DSProvider, DSHttpAdapterProvider, DSStamplayAdapterProvider, Config, stripeProvider) {
    // Configure Stamplay adapter
    DSStamplayAdapterProvider.defaults.appid = Config.ENV.APP_ID;

    // Configure Stripe
    stripeProvider.setPublishableKey(Config.ENV.STRIPE_PUBLISHABLE_KEY);

    // Configure Formly
    formlyConfigProvider.setType({
      name: 'item-divider',
      template: '<ion-item class="item-divider">{{options.templateOptions.label}}</ion-item>'
    });
  });
