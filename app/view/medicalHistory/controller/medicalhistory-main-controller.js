class MedicalHistoryCtrl {
    constructor($rootScope, $scope, $uibModal) {
        console.log('病历管理主视图!');
    }
}


MedicalHistoryCtrl.$inject = ['$rootScope', '$scope', '$uibModal'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryCtrl', MedicalHistoryCtrl);
};