
// User Profile Service

onCallApp.factory('profileFactory', function(){
    return {name:'First last name',
            location:'the location',
            ratings: 'User ratings',
            email:'User Email',
            password: 'User Password'
            };
});

onCallApp.controller('userProfile', function($scope,profileFactory){
    $scope.name = profileFactory.name;
    $scope.location = profileFactory.location;
    $scope.ratings = profileFactory.ratings;
    $scope.email = profileFactory.email;
    $scope.password = profileFactory.password;

});