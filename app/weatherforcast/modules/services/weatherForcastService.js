'use strict';

angular.module('wwc.weatherForcast.services')
    .factory('WeatherService', ['$http', function ($http) {
//
//        var bedsForWard = function (uuid) {
//            return $http.get("/openmrs/ws/rest/v1/admissionLocation/" + uuid, {
//                method: "GET",
//                params: {v: "full"},
//                withCredentials: true
//            });
//        }
//
//        var assignBed = function (bedId, patientUuid) {
//            var patientJson = {"patientUuid":patientUuid};
//            return $http.post("/openmrs/ws/rest/v1/beds/"+ bedId, patientJson, {
//                withCredentials: true,
//                headers: {"Accept": "application/json", "Content-Type": "application/json"}
//            });
//        }
//
//        return {
//            bedsForWard: bedsForWard,
//            assignBed: assignBed
//        };
    }]);
