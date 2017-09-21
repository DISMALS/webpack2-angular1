class PatientCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, patientsService) {
        patientsService.patients().then((data) => {
            console.log(data);
        });
    }
}
PatientCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'patientsService'];
module.exports = (ngMold) => {
    ngMold.controller('patientCtrl', PatientCtrl);
    // .factory('patientsService', require('../service/patients-service'))
}