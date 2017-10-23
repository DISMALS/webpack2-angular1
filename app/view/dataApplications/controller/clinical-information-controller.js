class DataClinicalInformationCtrl {
    constructor($scope, $stateParams) {
        console.log('this is clinical information for medical history!');
    }
}
DataClinicalInformationCtrl.$inject = ['$scope', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('dataClinicalInformationCtrl', DataClinicalInformationCtrl);
}