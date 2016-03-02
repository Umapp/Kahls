module Kahls.Controllers {
    export class RoutineController {
        routines = [];
        state = {};

        static $inject = ['RoutineService', '$state'];

        constructor(private RoutineService: IRoutineService, private $state) {
            this.state = $state;
            RoutineService.getRoutines().then((data) => {
                this.routines = data;
            })
        };


        updateRoutines = () => {
            this.RoutineService.getRoutines().then((data) => {
                this.routines = data;
            })
        }
    }
}

angular.module('Kahls')
    .controller('RoutineController', Kahls.Controllers.RoutineController);