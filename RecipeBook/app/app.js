(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ui.bootstrap'
        ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', {
                    controller: 'foodControl',
                    templateUrl: '/app/templates/food.html'
                })
                .when('/addfood', {
                    controller: 'foodAddControl',
                    templateUrl: '/app/templates/foodAdd.html'
                })
                .when('/editfood/:id', {
                    controller: 'foodEditControl',
                    templateUrl: '/app/templates/foodEdit.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();