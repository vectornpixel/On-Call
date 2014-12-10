// Create Users Controller

//Post  A Service, web service
onCallApp.factory('postFactory', function(){
    return {title: 'the tite',
            description: 'the description',
            pricerange: 'the price range',
            categories: 'the category'};
});

onCallApp.controller('postService', function($scope,postFactory) {
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