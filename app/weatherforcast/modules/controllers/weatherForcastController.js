'use strict';

angular.module('weatherForcast')
.controller('WeatherController',['$scope','weatherForecastService',
    function ($scope,forecastService){

    
        $scope.date = "Today";
        $scope.condition = {temp : "15 C", text : "Its chilly"};
        $scope.show = false;
        $scope.getWeather = function(){
        	var data = forecastService.getWeatherForcastFor($scope.city,$scope.country,"c")
        		.then(function(data){
        			$scope.condition=data.query.results.channel.item.condition||{};
                    $scope.forecasts = data.query.results.channel.item.forecast||[];
                    $scope.condition.image="http://l.yimg.com/a/i/us/we/52/" + $scope.condition.code + ".gif";
                    $scope.title=data.query.results.channel.item.title;
        			$scope.show = true;
        	});
        };
        $scope.back=function(){
            $scope.show=false;

        }
    }
]);
