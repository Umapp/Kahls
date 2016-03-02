module Kahls.Controllers {
    export class NewRoutineController {

        static $inject = ['$q', 'RoutineService', '$stateParams', '$scope', '$state'];

        constructor(private $q, private RoutineService: IRoutineService, private $stateParams, private $scope, private $state) {

        };

        save = () => {
            console.log('sparar');
            this.RoutineService.addRoutine(this.$scope.routine).then(() => {
                this.$scope.vm.updateRoutines();
                this.$state.go('routines')
            })
        }
    }
}

angular.module('Kahls')
    .controller('NewRoutineController', Kahls.Controllers.NewRoutineController);