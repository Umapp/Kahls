(function() {
    angular.module('Kahls')
        .config([
            '$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                $urlRouterProvider.otherwise('/routines');

                $stateProvider
                
                    .state('routines', {
                        url: '/routines',
                        templateUrl: 'views/routines.html',
                        controller: 'RoutineController',
                        controllerAs: 'vm'
                    })
                    
                    .state('routines.detail', {
                        url: '/detail/:routineID',
                        templateUrl: 'views/routinedetail.html',
                        controller: 'RoutineDetailController',
                        controllerAs: 'detail'
                    })
                    
                    .state('routines.new', {
                        url: '/new',
                        templateUrl: 'views/newroutine.html',
                        controller: 'NewRoutineController',
                        controllerAs: 'newRoutine'
                    })
                    
                    .state('faq', {
                        url: '/faq',
                        template: '<h1>FAQ</h1>',
                    })
                    
                    .state('reports', {
                        url: '/reports',
                        template: '<h1>Rapporter</h1>'
                    })
            }
        ])
})();





/*


(function() {
    angular.module('Kahls')
        .config([
            '$routeProvider', ($routeProvider) => {
                $routeProvider
                    .when('/routines', {
                        templateUrl: 'views/routines.html',
                        controller: 'RoutineController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/routines'
                    });
            }
        ])
})();
*/