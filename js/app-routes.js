/*
 *  Application Page Routes
 */

onCallApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/explore', {
                templateUrl: 'components/explore/exploreView.html',
                controller: 'ExploreController'
            }).otherwise({
                redirectTo: '/login'
            });

    }
]);