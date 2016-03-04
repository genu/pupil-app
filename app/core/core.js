'use strict';
angular.module('app.core', [
    'ionic',
    'ngCordova',
    'ui.router',
    'js-data',
    'formly', 'formlyIonic',
    'ngMap'
  ])
  .run(function (DS, DSFirebaseAdapter) {
    DS.registerAdapter('firebase', DSFirebaseAdapter, {default: true});
  })
  .config(function (DSProvider, DSFirebaseAdapterProvider, Config) {
    DSFirebaseAdapterProvider.defaults.basePath = Config.ENV.DB_URL;
  });
