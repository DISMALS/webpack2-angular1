class PatientCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, patientsService, $uibModal) {
        console.log($uibModal);
        // var modals = $uibModal.open({
        //     animation: true,
        //     backdrop: 'static',
        //     template: '<div>这是内容</div>'
        // });
        patientsService.patients().then((data) => {
            console.log(data);
        });
    }
}
PatientCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'patientsService', '$uibModal'];
module.exports = (ngMold) => {
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, './patients/patients-serve');
    ngMold.controller('patientCtrl', PatientCtrl);
}