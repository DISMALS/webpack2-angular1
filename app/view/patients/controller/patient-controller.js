class PatientCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, patientsService) {
        patientsService.patients().then((data) => {
            console.log(data);
        });
    }
}
PatientCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'patientsService'];
module.exports = (ngMold) => {
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, 'patients-serve');
    ngMold.controller('patientCtrl', PatientCtrl);
}