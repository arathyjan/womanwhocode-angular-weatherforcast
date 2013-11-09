'use strict';

angular.module('weatherForcast').
factory('weatherForecastService',['$http','$q',function($http,$q){
	var fail = function(defer,msg){
		alert(msg);
		defer.reject();
	};

	var getWeatherForcastFor=function(city,country,unit){
		var defer=$q.defer();
		$http({
			method:'JSONP',
			url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D'"+city+","+country+"'&format=json&callback=JSON_CALLBACK"
		}).success(
			function(data,status,headers,config){
				if(!data.query||!data.query.results||!data.query.results.place) 
					fail(defer,"Please check the city and country and try again!!!");
				var woeid;
				if(data.query.results.place.length > 0){
					woeid = data.query.results.place[0].woeid;
				}
				else{
					woeid = data.query.results.place.woeid;
				}
				$http({
           			method: 'JSONP',
           			url: "http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid='"+woeid+ "' and u='" + unit + "'&format=json&callback=JSON_CALLBACK"
            	}).success(function(data){
        			if(data.query.results.channel.item.title=="City not found") 
        				fail(defer,"Multiple cities possible");
        			defer.resolve(data)
        		})
        		.error(function(){
        			fail(defer,"Please check the city and country and try again!!!")
        		});
			})
		.error(function(){
			fail(defer,"Please check the city and country and try again!!!")
		});
		return defer.promise;
	};

	return {
		getWeatherForcastFor:getWeatherForcastFor
	}
}])