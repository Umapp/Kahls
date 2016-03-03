angular.module('Kahls', ['ui.router']);

(function () {
    angular.module('Kahls')
        .config([
        '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                template: '<h1>FAQ</h1>'
            })
                .state('reports', {
                url: '/reports',
                template: '<h1>Rapporter</h1>'
            });
        }
    ]);
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

var Kahls;
(function (Kahls) {
    var Controllers;
    (function (Controllers) {
        var RoutineController = (function () {
            function RoutineController(RoutineService, $state) {
                var _this = this;
                this.RoutineService = RoutineService;
                this.$state = $state;
                this.routines = [];
                this.occurences = [];
                this.state = {};
                this.updateRoutines = function () {
                    _this.RoutineService.getRoutines().then(function (data) {
                        _this.routines = data;
                    });
                };
                this.state = $state;
                this.occurences = RoutineService.occurences;
                RoutineService.getRoutines().then(function (data) {
                    _this.routines = data;
                });
            }
            ;
            RoutineController.$inject = ['RoutineService', '$state'];
            return RoutineController;
        }());
        Controllers.RoutineController = RoutineController;
    })(Controllers = Kahls.Controllers || (Kahls.Controllers = {}));
})(Kahls || (Kahls = {}));
angular.module('Kahls')
    .controller('RoutineController', Kahls.Controllers.RoutineController);

var Kahls;
(function (Kahls) {
    var Controllers;
    (function (Controllers) {
        var RoutineDetailController = (function () {
            function RoutineDetailController($q, RoutineService, $stateParams, $scope, $state) {
                var _this = this;
                this.$q = $q;
                this.RoutineService = RoutineService;
                this.$scope = $scope;
                this.$state = $state;
                this.save = function () {
                    _this.RoutineService.updateRoutine(_this.$scope.routine).then(function () {
                        _this.$scope.vm.updateRoutines();
                        _this.$state.go('routines');
                    });
                };
                this.delete = function () {
                    _this.RoutineService.deleteRoutine(_this.$scope.routine._id).then(function () {
                        _this.$scope.vm.updateRoutines();
                        _this.$state.go('routines');
                    });
                };
                console.log($stateParams);
                $scope.routine = _.find($scope.vm.routines, function (routine) {
                    return routine._id == $stateParams.routineID;
                });
            }
            ;
            RoutineDetailController.$inject = ['$q', 'RoutineService', '$stateParams', '$scope', '$state'];
            return RoutineDetailController;
        }());
        Controllers.RoutineDetailController = RoutineDetailController;
    })(Controllers = Kahls.Controllers || (Kahls.Controllers = {}));
})(Kahls || (Kahls = {}));
angular.module('Kahls')
    .controller('RoutineDetailController', Kahls.Controllers.RoutineDetailController);

var Kahls;
(function (Kahls) {
    var Controllers;
    (function (Controllers) {
        var NewRoutineController = (function () {
            function NewRoutineController($q, RoutineService, $stateParams, $scope, $state) {
                var _this = this;
                this.$q = $q;
                this.RoutineService = RoutineService;
                this.$stateParams = $stateParams;
                this.$scope = $scope;
                this.$state = $state;
                this.save = function () {
                    console.log('sparar');
                    _this.RoutineService.addRoutine(_this.$scope.routine).then(function () {
                        _this.$scope.vm.updateRoutines();
                        _this.$state.go('routines');
                    });
                };
            }
            ;
            NewRoutineController.$inject = ['$q', 'RoutineService', '$stateParams', '$scope', '$state'];
            return NewRoutineController;
        }());
        Controllers.NewRoutineController = NewRoutineController;
    })(Controllers = Kahls.Controllers || (Kahls.Controllers = {}));
})(Kahls || (Kahls = {}));
angular.module('Kahls')
    .controller('NewRoutineController', Kahls.Controllers.NewRoutineController);



var Kahls;
(function (Kahls) {
    var Services;
    (function (Services) {
        var RoutineService = (function () {
            function RoutineService($http, $q) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.occurences = [
                    { title: 'Morgon' },
                    { title: 'Stängning' },
                    { title: 'Varje dag' },
                    { title: 'Måndag' },
                    { title: 'Tisdag' },
                    { title: 'Onsdag' },
                    { title: 'Torsdag' },
                    { title: 'Fredag' },
                    { title: 'Lördag' },
                    { title: 'Söndag' }
                ];
                this.getRoutines = function () {
                    return _this.$http.get('api/routines').then(function (res) {
                        return res.data;
                    });
                };
                this.updateRoutine = function (routine) {
                    return _this.$http.put('api/routine/' + routine._id, routine).then(function (res) {
                        return res.data;
                    });
                };
                this.addRoutine = function (routine) {
                    return _this.$http.post('api/routine', routine).then(function (res) {
                        return res;
                    });
                };
                this.deleteRoutine = function (id) {
                    return _this.$http.delete('api/routine/' + id).then(function (res) {
                        return res;
                    });
                };
            }
            ;
            RoutineService.$inject = ['$http', '$q'];
            return RoutineService;
        }());
        Services.RoutineService = RoutineService;
    })(Services = Kahls.Services || (Kahls.Services = {}));
})(Kahls || (Kahls = {}));
angular.module('Kahls')
    .service('RoutineService', Kahls.Services.RoutineService);
