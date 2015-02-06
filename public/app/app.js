var onCallApp = angular.module('onCallApp', [
    'ngRoute',
    'ngResource'
]);

/*
 *  Application Page Routes
 */


onCallApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/explore', {
                templateUrl: 'views/explore-view.html',
                controller: 'ExploreController'
            }).
            when('/explore/:id', {
                templateUrl: 'views/explore-view.html',
                controller: 'ExploreController'
            }).
            when('/settings', {
                templateUrl: 'views/settings-view.html',
                controller: 'SettingsController'
            }).
            when('/profile', {
                templateUrl: 'views/profile-view.html',
                controller: 'ProfileController'
            }).
            when('/register', {
                templateUrl: 'views/register-view.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'views/login-view.html',
                controller: 'AuthController'
            }).otherwise({
                redirectTo: '/explore'
            });

    }
]);