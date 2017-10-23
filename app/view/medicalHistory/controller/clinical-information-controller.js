class ClinicalInformationCtrl {
    constructor($scope, $stateParams) {
        console.log('this is clinical information for medical history!');
    }
}
ClinicalInformationCtrl.$inject = ['$scope', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('clinicalInformationCtrl', ClinicalInformationCtrl);
}