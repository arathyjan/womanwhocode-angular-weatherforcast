'use strict';

angular.module('wwc.weatherForcast.controllers')
    .controller('WeatherController', ['$scope', '$location', 'WeatherService',
    function ($scope, $location, weatherService) {

        var woeidForBangalore = 2295420;
        var unit = 'c';

        $scope.getWeather = function () {
            weatherService.getWeatherForLocation(woeidForBangalore, unit).success(function (result){
                console.log(result);
            });
        }

    }]);