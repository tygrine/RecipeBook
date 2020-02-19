(function () {
    'use strict';

    angular
        .module('app')
        .controller('foodControl', ['$scope', '$filter', 'dataService', function ($scope, $filter, dataService) {
            $scope.foods = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;

            getData();

            function getData() {
                dataService.getFoods().then(function (result) {
                        $scope.$watch('searchText', function (term) {
                        $scope.foods = $filter('filter')(result, term);
                    });
                });
            }

            $scope.deleteFood = function (id) {
                dataService.deleteFood(id).then(function () {
                    toastr.success('Food entry deleted successfully.');
                    getData();
                }, function () {
                    toastr.error('Error in deleting food entry with Id:' + id);
                });
            };

            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            }
        }])
        .controller('foodAddControl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createFood = function (food) {
                dataService.addFood(food).then(function () {
                    toastr.success('Success! Your food entry has been recorded.')
                    $location.path('/');
                }, function () {
                        toastr.error('Error in creating food entry.');
                });
            };
        }])
        .controller('foodEditControl', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.food = {};
            $scope.states = {
                showUpdateButton: false
            };

            dataService.getFoodsById($routeParams.id).then(function (result) {
                $scope.food = result;
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error in fetching entry data: ' + $routeParams.id);
            });

            $scope.updateFood = function (food) {
                dataService.editFood(food).then(function () {
                    toastr.success('Entry updated successfully!')
                    $location.path('/');
                }, function () {
                    toastr.error('Error in updating food entry.')
                });
            };
        }]);
})();
