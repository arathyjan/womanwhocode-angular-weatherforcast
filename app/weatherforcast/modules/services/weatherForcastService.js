'use strict';

angular.module('wwc.weatherForcast.services')
    .factory('WeatherService', ['$http', function ($http) {

        var getWeatherForLocation = function (woeid, unit) {
            delete $http.defaults.headers.common['X-Requested-With'];
            return $http.get("http://weather.yahooapis.com/forecastrss", {
                method:"GET",
                params:{w:woeid, u:unit}
            });
        }

        return {
            getWeatherForLocation : getWeatherForLocation
        }

    }]);
