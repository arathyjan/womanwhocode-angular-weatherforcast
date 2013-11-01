'use strict';

var wwc = wwc || {};
wwc.WeatherForcast = wwc.WeatherForcast || {};

angular.module('wwc.weatherForcast.services', []);
angular.module('wwc.weatherForcast.controllers', ['wwc.weatherForcast.services']);
angular.module('wwc.weatherForcast', ['wwc.weatherForcast.controllers', 'wwc.weatherForcast.services' ]);