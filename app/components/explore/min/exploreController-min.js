var ExploreContollers=angular.module("ExploreController",[]);ExploreContollers.controller("ViewExploreController",["$scope","$http",function(o,e){e.get("js/data/users.json").success(function(e){o.usersinfo=e})}]),ExploreContollers.controller("UserProfileController",["$scope","$routeParams","$http",function(o,e,r){r.get("js/data/users/"+e.userId+".json").success(function(e){o.userinfo=e})}]);