'use strict';

angular.module('weatherForcast')
    .controller('WeatherController', ['$scope',
    function ($scope) {

        $scope.title = "The Weather App";
        $scope.date = "Today";
        $scope.condition = {temp : "15 C", text : "Its chilly"};
        $scope.show = false;

        $scope.getWeather = function(){
        	$scope.show = true;
        }
  }]);