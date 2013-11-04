'use strict';

angular.module('wwc.weatherForcast.controllers')
    .controller('WeatherController', ['$scope', '$location', 'WeatherService',
    function ($scope, $location, weatherService) {

        $scope.condition = null;
        var woeidForBangalore = 2295420;
        var unit = 'c';

        $scope.getWeather = function () {
            weatherService.getWeatherForLocation(woeidForBangalore, unit).success(function(result){
                $scope.title = result.query.results.channel.item.title;
                $scope.forecasts = result.query.results.channel.item.forecast;
                $scope.condition = result.query.results.channel.item.condition;
                $scope.image = "http://l.yimg.com/a/i/us/we/52/" + $scope.condition.code + ".gif";
            });
        }

    }]);