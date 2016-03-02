interface IRoutineService {
    getRoutines(): any;
    updateRoutine(routine: Routine)
    addRoutine(routine: Routine)
    deleteRoutine(routine: Routine)
}
module Kahls.Services {
    export class RoutineService {

        static $inject = ['$http', '$q'];
        constructor(private $http, private $q) {

        };

        getRoutines = () => {
            return this.$http.get('api/routines').then((res) => {
                return res.data
            })
        };

        updateRoutine = (routine: Routine) => {
            return this.$http.put('api/routine/' + routine._id, routine).then((res) => {
                return res.data;
            })
        };

        addRoutine = (routine: Routine) => {
            return this.$http.post('api/routine', routine).then((res) => {
                return res;
            })

        };

        deleteRoutine = (id: string) => {
            return this.$http.delete('api/routine/' + id).then((res) => {
                return res;
            })
        };
    }
}

angular.module('Kahls')
    .service('RoutineService', Kahls.Services.RoutineService)

