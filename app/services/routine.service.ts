interface IRoutineService {
    getRoutines(): any;
    updateRoutine(routine: Routine);
    addRoutine(routine: Routine);
    deleteRoutine(routine: Routine);
    occurences: any;
    categories: any;
}
module Kahls.Services {
    export class RoutineService {

        occurences = [
            { title: 'Morgon' },
            { title: 'Stängning' },
            { title: 'Varje dag' },
            { title: 'Måndag', lower: 'måndag' },
            { title: 'Tisdag', lower: 'tisdag' },
            { title: 'Onsdag', lower: 'onsdag' },
            { title: 'Torsdag', lower: 'torsdag' },
            { title: 'Fredag', lower: 'fredag' },
            { title: 'Lördag', lower: 'lördag' },
            { title: 'Söndag', lower: 'söndag' }
        ];
        
        categories = [
           { title: 'Dammtorka'},
           { title: 'Exponering'},
           { title: 'Kassa'},
           { title: 'Diskmaskin'},
           { title: 'Kyl'},
          { title:  'Kaffebryggare'},
          { title:  'Espressomaskin'},
          { title:  'Kemikalier'},
          { title:  'Skadedjur'},
          { title:  'Infoskärm'},
          { title:  'Golv'},
         { title:   'Städ'},
         { title:   'Fyll på'},
         {title: 'Kakor'},
         {title: 'Våttorka'},
         {title: 'Sopor'},
          { title:  'Övrigt'}
        ]

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

