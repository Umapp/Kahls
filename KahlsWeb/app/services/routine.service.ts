interface IRoutineService {
    getRoutines(): any;
}
module Kahls.Services {
    export class RoutineService {

        static $inject = ['$http', '$q'];
        constructor(private $http, private $q) {

        };

        getRoutines = () => {
            var def = this.$q.defer();
            this.$http.get('api/routines').then((res) => {
                def.resolve(res.data);
            })
            return def.promise;
        };
    }
}

angular.module('Kahls')
    .service('RoutineService', Kahls.Services.RoutineService)

