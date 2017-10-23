class TreatmentRegimenCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history treatment regimen!');
    }
}
TreatmentRegimenCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('treatmentRegimenCtrl', TreatmentRegimenCtrl);
}