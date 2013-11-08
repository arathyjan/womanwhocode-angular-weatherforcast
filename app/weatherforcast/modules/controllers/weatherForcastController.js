'use strict';

angular.module('weatherForcast')
.controller('WeatherController',['$scope','weatherForecastService',
    function ($scope,forecastService){
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
])
   .directive('forecastdirective', function () {
         return {
            restrict: 'A',
            scope: true,
            template: '<div> {{ forecast.date }} ({{ forecast.day}}) - HIGH: {{ forecast.high}}&degC, Low: {{ forecast.low}}&degC'+
                        '<div class="italic">' +
                        '{{ forecast.text}}'+
                        '</div>'+
                        'Range : {{ forecast.range }} </br>'+
                    ' </div>',
            link: function(scope){
                    scope.forecast.range = scope.forecast.high - scope.forecast.low;

            }
        }
})
    .directive('myAutocomplete', function ($parse) {
        return function (scope, element, attrs) {
            var ngModel = $parse(attrs.ngModel);
            element.autocomplete({
                autofocus: true,
                minLength: 2,
                source: function (request, response) {
                    var results = ['Bangalore','Chennai','Pune','Gurgoan'];
                        response(results);
                },
                select: function (event, ui) {
                    scope.$apply(function (scope) {
                        ngModel.assign(scope, ui.item.value);
                        scope.$eval(attrs.ngChange);
                    });
                    return true;
                },
                search: function (event) {
                    var searchTerm = $.trim(element.val());
                    if (searchTerm.length < 2) {
                        event.preventDefault();
                    }
                }
            });
        }
    });

