'use strict';

angular.module('weatherForcast', ['wwc.weatherForcast'])
angular.module('weatherForcast').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/weatherforcast', {templateUrl: 'modules/views/weatherForcast.html', controller: 'WeatherController'});
        $routeProvider.otherwise({redirectTo: '/weatherforcast'});
}]);