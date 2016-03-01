angular.module('Kahls', ['ngRoute']);

(function () {
    angular.module('Kahls')
        .config([
        '$routeProvider', function ($routeProvider) {
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
    ]);
})();

var Kahls;
(function (Kahls) {
    var Controllers;
    (function (Controllers) {
        var RoutineController = (function () {
            function RoutineController($q, RoutineService) {
                var _this = this;
                this.$q = $q;
                this.routines = [];
                RoutineService.getRoutines().then(function (data) {
                    console.log(data);
                    _this.routines = data;
                });
            }
            ;
            RoutineController.$inject = ['$q', 'RoutineService'];
            return RoutineController;
        }());
        Controllers.RoutineController = RoutineController;
    })(Controllers = Kahls.Controllers || (Kahls.Controllers = {}));
})(Kahls || (Kahls = {}));
angular.module('Kahls')
    .controller('RoutineController', Kahls.Controllers.RoutineController);

var Kahls;
(function (Kahls) {
    var Services;
    (function (Services) {
        var RoutineService = (function () {
            function RoutineService($http, $q) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.getRoutines = function () {
                    var def = _this.$q.defer();
                    _this.$http.get('api/routines').then(function (res) {
                        def.resolve(res.data);
                    });
                    return def.promise;
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
