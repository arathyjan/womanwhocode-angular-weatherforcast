'use strict';

angular.module('wwc.weatherForcast.services')
    .factory('WeatherService', ['$http', function ($http) {

        var getWeatherForLocation = function (woeid, unit) {
           return $http({
               method: 'JSONP',
               url: "http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast " +
                   "where woeid='" + woeid + "' and u='" + unit + "'&format=json&callback=JSON_CALLBACK"
            });
        }

        return {
            getWeatherForLocation : getWeatherForLocation
        }
    }]);
