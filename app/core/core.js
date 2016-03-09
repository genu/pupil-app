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
  .run(function (DS) {
    DS.registerAdapter('stamplay', new DSStamplayAdapter(), {default: true});
  })
  .config(function (DSProvider, Config) {
  });
