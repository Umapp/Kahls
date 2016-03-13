module Kahls.Controllers {
    export class RoutineController {
        routines = [];
        occurences = [];
        state = {};
        categories: [];

        static $inject = ['RoutineService', '$state'];

        constructor(private RoutineService: IRoutineService, private $state) {
            this.state = $state;
            this.occurences = RoutineService.occurences;
            this.categories = RoutineService.categories;
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