
// User Profile Service

onCallApp.factory('profileFactory', function(){
    return {name:'Lorens Goro',
            company:'E&G Design',
            location:'Sterling Heights, MI',
            ratings: 4,
            email:'lorensgoro@gmail.com',
            service:'Web Design',
            daysopen:{
                mon:true,
                tues:false,
                wed:true,
                thurs:true,
                fri:true,
                sat:true,
                sun:true
            }

            };
});

onCallApp.controller('ProfileController', function($scope,profileFactory){
    $scope.name = profileFactory.name;
    $scope.location = profileFactory.location;
    $scope.ratings = profileFactory.ratings;
    $scope.email = profileFactory.email;


});