(function() {
    angular.module('Kahls')
        .config([
            '$routeProvider', ($routeProvider) => {
                $routeProvider
                    .when('/test', {
                        templateUrl: 'views/routines.html',
                        controller: 'RoutineController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/test'
                    });
            }
        ])
})();