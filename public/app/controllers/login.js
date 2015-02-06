/**
 * Created by asimcraft on 2/5/15.
 */
//allow user from database to login using his credentials
onCallApp.constant("loginUrl", "http://localhost:5500/providers/login");
onCallApp.factory("authorization", function($http, loginUrl){
    return {
        login: function(credentials){
            return $http.post(loginUrl, credentials);
        }
    };

});
onCallApp.controller("AuthController", function($scope, $location, authorization){


    $scope.login = function(){
        var credentials = {
            username: this.username,
            password: this.password

        };

        var success = function(data){
            var password = data.password;
            var username = data.username;
            $location.path('/');
        };

        var error = function(){

        };

        authorization.login(credentials).success(success).error(error);

    };


});


