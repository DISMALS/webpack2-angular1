class LaboratoryInspectionCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history laboratory inspection!');
    }
}
LaboratoryInspectionCtrl.$inject = ['$scope', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('laboratoryInspectionCtrl', LaboratoryInspectionCtrl);
}