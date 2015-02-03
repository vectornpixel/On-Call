
// User Profile Service
onCallApp.constant("dataUrl", "http://localhost:5500/providers");
onCallApp.factory("profileFactory", function($http, dataUrl){

    return $http.get(dataUrl);


});

onCallApp.controller("ExploreController", function($scope, profileFactory){

    profileFactory.success(function(data){
        $scope.profileinfo = data;
    });



//call google map
    var map = new GMaps({
        el: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

});