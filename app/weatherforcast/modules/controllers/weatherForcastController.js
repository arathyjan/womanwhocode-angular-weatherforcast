'use strict';

angular.module('weatherForcast')
.controller('WeatherController',['$scope','weatherForecastService',
    function ($scope,forecastService){

    $scope.title = "The Weather App";
        $scope.date = "Today";
        $scope.condition = {temp : "15 C", text : "Its chilly"};
        $scope.show = false;
        $scope.getWeather = function(){
        	var data = forecastService.getWeatherForcastFor($scope.city,$scope.country,"c").then(function(data){
        		$scope.condition={temp:data.query.results.channel.item.condition.temp};
        		$scope.show = true;
        	});
        	

            
        }}
]);
