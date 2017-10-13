class MedicalHistorySearchCtrl {
    constructor($rootScope, $scope, $uibModal) {
        console.log('这是病历查询视图！');
    }
}
MedicalHistorySearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistorySearchCtrl', MedicalHistorySearchCtrl);
}