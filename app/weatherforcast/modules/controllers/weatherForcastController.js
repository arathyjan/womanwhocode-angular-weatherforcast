'use strict';

angular.module('wwc.weatherForcast.controllers')
    .controller('WeatherController', ['$scope', '$route', '$location', '$rootScope', 'WeatherService',
    function ($scope, $route, $location, $rootScope, wardLayoutService) {
//
//        $scope.layout = [];
//        $scope.result = [];
//        $scope.bed;
//
//        var uuid = $route.current.params.wardId;
//
//        $('.bed-info').hide();
//        $scope.bedDetails = function (cell) {
//            $('.bed-info').hide();
//            $scope.bed = cell;
//            $scope.$apply();
//            if (!cell.empty) {
//                $('.bed-info').show();
//            }
//        }
//
//        $scope.back = function () {
//            $location.url("/visit/" + $rootScope.visit.uuid + "/bed-management");
//        }
//
//        $scope.assignBed = function (bed) {
//            wardLayoutService.assignBed(bed.bed.bedId, $scope.patient.uuid).success(function (result) {
//                $rootScope.bed = bed.bed;
//                $scope.layout = [];
//                $rootScope.getBedDetailsForPatient($scope.patient.uuid);
//                $scope.getBedsForWard();
//                $scope.confirmationMessage = "Bed " + bed.bed.bedNumber + " is assigned successfully";
//                $('.bed-info').hide();
//            });
//        }
//
//        $scope.getCurrentBed = function () {
//            return $rootScope.bedDetails;
//        }
//
//        $scope.getBedsForWard = function () {
//            wardLayoutService.bedsForWard(uuid).success(function (result) {
//                $scope.result = result.bedLayouts;
//                $scope.createLayoutGrid();
//            });
//        }
//
//        $scope.maxX = $scope.maxY = $scope.minX = $scope.minY = 1;
//
//        $scope.createLayoutGrid = function () {
//            findMaxYMaxX();
//            var bedLayout;
//            var rowLayout = [];
//            for (var i = $scope.minX; i <= $scope.maxX; i++) {
//                rowLayout = [];
//                for (var j = $scope.minY; j <= $scope.maxY; j++) {
//                    bedLayout = getBedLayoutWithCordinates(i, j);
//                    rowLayout.push({
//                        empty:isEmpty(bedLayout),
//                        available:isAvailable(bedLayout),
//                        bed:{
//                            bedId:bedLayout != null && bedLayout.bedId,
//                            bedNumber:bedLayout != null && bedLayout.bedNumber
//                        }
//                    })
//                }
//                $scope.layout.push(rowLayout);
//            }
//        }
//
//        $scope.fetchBedInfo = function (cell, rowIndex, columnIndex) {
//            if(!cell.available && !cell.empty){
//                return bedService.getBedInfo(cell.bed.bedId).success(function (data) {
//                    $scope.layout[rowIndex][columnIndex].patientInfo = {
//                        "name":data.patient.person.personName.givenName + " " + data.patient.person.personName.familyName,
//                        "identifier":data.patient.identifiers[0].identifier,
//                        "gender":data.patient.person.gender
//                    }
//                })
//            }
//        }
//
//        var isEmpty = function (bedLayout) {
//            if (bedLayout == null || bedLayout.bedId == null) {
//                return true;
//            }
//            return false;
//        }
//
//        var isAvailable = function (bedLayout) {
//            if (bedLayout == null) {
//                return false;
//            }
//            return bedLayout.status === "AVAILABLE";
//        }
//
//        var getBedLayoutWithCordinates = function (rowNumber, columnNumber) {
//            var array = $scope.result;
//            for (var i = 0, len = array.length; i < len; i++) {
//                if (array[i].rowNumber === rowNumber && array[i].columnNumber === columnNumber) {
//                    return array[i];
//                }
//            }
//            return null;
//        }
//
//        var findMaxYMaxX = function () {
//            for (var i = 0; i < $scope.result.length; i++) {
//                var result = $scope.result[i];
//                if (result.rowNumber > $scope.maxX) {
//                    $scope.maxX = result.rowNumber;
//                }
//                if (result.columnNumber > $scope.maxY) {
//                    $scope.maxY = result.columnNumber;
//                }
//            }
//        }
//
//        var init = function () {
//            $scope.getBedsForWard();
//        }
//
//        init();
    }])
    .directive('dialog', function () {
        return {
            restrict:'A',
            link:function (scope, elem, attr) {
                elem.bind('click', function (e) {
                    scope.bedDetails(scope.cell);
                    var leftpos = $(elem).position().left + 28;
                    var toppos = $(elem).offset().top;
//                    $(".bed-info").css('left', leftpos);
//                    $(".bed-info").css('top', toppos);
                });
            }
        };
    });

