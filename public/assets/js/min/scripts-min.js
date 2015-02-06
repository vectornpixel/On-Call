//App Module

var onCallApp = angular.module('onCallApp', []);

/*var onCallApp = angular.module('onCallApp', [
    'ngRoute',
    'PostserviceController'
]);*/


// Create Users Controller

//Post  A Service, web service
onCallApp.factory('postFactory', function(){
    return {title: 'the tite',
            description: 'the description',
            pricerange: 'the price range',
            categories: 'the category'};
});

onCallApp.controller('PostServiceController', function($scope,postFactory) {
        $scope.title = postFactory.title;
        $scope.posttitle = function(title){
            postFactory.posttitle(title);
        };

        $scope.description = postFactory.description;
        $scope.postdescription = function(description){
            postFactory.postdescription(description);
        };

        $scope.pricerange = postFactory.pricerange;
        $scope.postprice = function(pricerange){
            postFactory.postprice(pricerange);
        };

        $scope.categories = postFactory.categories;
        $scope.postcategory = function(categories){
            postFactory.postcategory(categories);
        };

    }

);


// User Profile Service

onCallApp.factory('profileFactory', function(){
    return {name:'First last name',
            location:'the location',
            ratings: 'User ratings',
            email:'User Email',
            password: 'User Password'
            };
});

onCallApp.controller('UserProfileController', function($scope,profileFactory){
    $scope.name = profileFactory.name;
    $scope.location = profileFactory.location;
    $scope.ratings = profileFactory.ratings;
    $scope.email = profileFactory.email;
    $scope.password = profileFactory.password;

});



