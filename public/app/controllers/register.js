onCallApp.constant("providerUrl", "http://localhost:5500/providers");

onCallApp.controller("RegisterController", function($scope, $http, providerUrl){
    $scope.data = {};
    $http.get(providerUrl).success(function(data){
        $scope.data.providers = data;
    }).error(function(error){
        $scope.data.error = error;
    });

    $scope.registeruser = function(provider){
        $http.post(providerUrl, provider).success(function(provider){
            $scope.data.provider.push(provider);
        });
    };



});