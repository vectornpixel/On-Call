// Create Users Controller
var UsersControllers = angular.module('UsersControllers', []);

// Declare View Users Controller

UsersControllers.controller('ViewUsersController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('js/data/users.json').success(function(data) {
            $scope.usersinfo = data;
        });
    }

]);

// Declare View User Porfile Controller
UsersControllers.controller('UserProfileController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('js/data/users/' + $routeParams.userId + '.json').success(function(data) {
            $scope.userinfo = data;
        });

    }
]);
