'use strict';

angular.module('app.core').factory('PusherInstance', function ($window, $pusher, Config) {
  var client;

  client = new Pusher(Config.ENV.PUSHER_KEY);

  return $pusher(client);
});
