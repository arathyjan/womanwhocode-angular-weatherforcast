'use strict';

angular.module('weatherForcast').
factory('weatherForecastService',['$http','$q',function($http,$q){
	var getWeatherForcastFor=function(city,country,unit){
	var defer=$q.defer();
	$http({
		method:'JSONP',
		url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D'"+city+","+country+"'&format=json&callback=JSON_CALLBACK"})
	.success(function(data,status,headers,config){
		console.log(data);
		$http({
           method: 'JSONP',
           url: "http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast " +
                   "where woeid='"+data.query.results.place.woeid+ "' and u='" + unit + "'&format=json&callback=JSON_CALLBACK"
            }).success(function(data){
            			console.log(JSON.stringify(data));
            	defer.resolve(data)
            });
		})
	.error(function(data,status,headers,config){alert("error");console.log(data)});
	return defer.promise;
	};
	return {
		getWeatherForcastFor:getWeatherForcastFor
	}
}])