(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getFoods = function () {
                var deferred = $q.defer();
                $http.get('/Food/Index').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                        deferred.reject();
                });
                return deferred.promise;
            };

            service.getFoodsById = function (id) {
                var deferred = $q.defer();
                $http.get('/Food/Details/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addFood = function (food) {
                var deferred = $q.defer();
                $http.post('/Food/Create', food).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editFood = function (food) {
                var deferred = $q.defer();
                $http.post('/Food/Edit', food).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteFood = function (id) {
                var deferred = $q.defer();
                $http.post('/Food/Delete', {id: id }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);

})();