module Kahls.Controllers {
    export class RoutineDetailController {

        static $inject = ['$q', 'RoutineService', '$stateParams', '$scope', '$state'];

        constructor(private $q, private RoutineService: IRoutineService, $stateParams, private $scope, private $state) {
            console.log($stateParams)
            $scope.routine = _.find($scope.vm.routines, (routine: Routine) => {
                return routine._id == $stateParams.routineID;
            });
        };

        save = () => {
            this.RoutineService.updateRoutine(this.$scope.routine).then(() => {
                this.$scope.vm.updateRoutines();
                this.$state.go('routines')
            })
        }

        delete = () => {
            this.RoutineService.deleteRoutine(this.$scope.routine._id).then(() => {
                this.$scope.vm.updateRoutines();
                this.$state.go('routines')
            })
        }
    }
}

angular.module('Kahls')
    .controller('RoutineDetailController', Kahls.Controllers.RoutineDetailController);