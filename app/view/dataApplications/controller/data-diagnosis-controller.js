class DataDiagnosisCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history disgnosis!');
    }
}
DataDiagnosisCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('dataDiagnosisCtrl', DataDiagnosisCtrl);
}