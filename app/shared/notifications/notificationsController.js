onCallApp.factory('notificationService', function(){
    return {message:'the message',
            date: 'the date',
            time: 'the time',
            fromuser: 'users name',
            accept: false
            };
});


onCallApp.controller('notifications', function($scope, notificationService){
    $scope.message = notificationService.message;
    $scope.getMessage = function(message){
        notificationService.getMessage(message);
    };
    $scope.fromuser = notificationService.fromuser;
    $scope.getUser = function(fromuser){
        notificationService.getUser(fromuser);
    };
});