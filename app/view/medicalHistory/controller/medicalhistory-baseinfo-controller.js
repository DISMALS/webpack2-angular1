class MedicalhistoryBaseinfoCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medicalhistory base info!');
    }
}
MedicalhistoryBaseinfoCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('medicalhistoryBaseinfoCtrl', MedicalhistoryBaseinfoCtrl);
}