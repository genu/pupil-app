'use strict';

angular.module('app.core', [
    'app.db',
    'ionic',
    'ngCordova',
    'ui.router',
    'js-data',
    'formly', 'formlyIonic',
    'ngMap',
    'ngStamplay'
  ])
  .run(function (DS, DSFirebaseAdapter) {
    DS.registerAdapter('stamplay', new DSStamplayAdapter(), {default: true});
  })
  .config(function (DSProvider, DSFirebaseAdapterProvider, Config) {
    DSFirebaseAdapterProvider.defaults.basePath = Config.ENV.DB_URL;
  });
