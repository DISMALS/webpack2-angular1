class PatientCtrl {
    constructor($rootScope,$scope,$state,APP_CONFIG,patientsService){
        patientsService.patients().then((data) => {
            console.log(data);
        });
    }
}

module.exports = (ngMod) => {
    ngMod.controller('patientCtrl',PatientCtrl)
         .factory('patientsService',require('../service/patients-service')).name;
}