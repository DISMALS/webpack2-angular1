class DataLaboratoryInspectionCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history laboratory inspection!');
    }
}
DataLaboratoryInspectionCtrl.$inject = ['$scope', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('dataLaboratoryInspectionCtrl', DataLaboratoryInspectionCtrl);
}