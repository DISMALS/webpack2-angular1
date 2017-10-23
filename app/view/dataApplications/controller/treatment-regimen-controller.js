class DataTreatmentRegimenCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history treatment regimen!');
    }
}
DataTreatmentRegimenCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('dataTreatmentRegimenCtrl', DataTreatmentRegimenCtrl);
}