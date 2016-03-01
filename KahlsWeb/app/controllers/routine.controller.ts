module Kahls.Controllers {
    export class RoutineController {
        routines = [];
        static $inject = ['$q', 'RoutineService'];
        constructor(private $q, RoutineService: IRoutineService) {
            RoutineService.getRoutines().then((data) => {
                console.log(data);
                this.routines = data;
            })
        };
    }
}

angular.module('Kahls')
    .controller('RoutineController', Kahls.Controllers.RoutineController);