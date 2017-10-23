class MedicalhistoryDiagnosisCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history disgnosis!');
    }
}
MedicalhistoryDiagnosisCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('medicalhistoryDiagnosisCtrl', MedicalhistoryDiagnosisCtrl);
}