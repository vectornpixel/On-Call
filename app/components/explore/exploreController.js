// Create Users Controller
var ExploreContollers = angular.module('ExploreController', []);

// Declare View Users Controller

ExploreContollers.controller('ViewExploreController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('js/data/users.json').success(function(data) {
            $scope.usersinfo = data;
        });
    }

]);

// Declare View User Porfile Controller
ExploreContollers.controller('UserProfileController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('js/data/users/' + $routeParams.userId + '.json').success(function(data) {
            $scope.userinfo = data;
        });

    }
]);
