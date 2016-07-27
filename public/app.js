define(['angular', 'require', 'angular-route','angular-resource', 'uiSwitch','bootstrap','controllers',
    'filters','directives','services','factories','data'], function (angular, require) {

    var app = angular.module('BarbecueShop', 
        ['ngRoute','ngResource','controllers','filters','directives','services', 'uiSwitch']);

    app.config(function($routeProvider,$locationProvider,$controllerProvider) {

        $routeProvider
            .when('/', {
                // controller: 'HomeController',
                templateUrl:'tpls/home.html'

            })
            .when('/shop', {
                // controller: 'ShopController',
                templateUrl: 'tpls/shop.html'
            })
            .when('/pos', {
                // controller: 'ShopController',
                templateUrl: 'tpls/pos.html'
            })
            .when('/mcart', {
                // controller: 'McartController',
                templateUrl: 'tpls/mcart.html'
            })
            .when('/checkout', {
                // controller: 'McartController',
                templateUrl: 'tpls/checkout.html'
            })
            .otherwise({
                templateUrl:'tpls/home.html'

            });

        $locationProvider.html5Mode(true);
    });

    return app;
});

