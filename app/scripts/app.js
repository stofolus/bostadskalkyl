'use strict';

/**
 * @ngdoc overview
 * @name bostadskalkylApp
 * @description
 * # bostadskalkylApp
 *
 * Main module of the application.
 */
angular
  .module('bostadskalkylApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
