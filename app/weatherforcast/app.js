'use strict';

var app = angular.module('weatherForcast',[]);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/weatherforcast', {templateUrl: 'modules/views/weatherForcast.html', controller: 'WeatherController'});
        $routeProvider.otherwise({redirectTo: '/weatherforcast'});
}]);