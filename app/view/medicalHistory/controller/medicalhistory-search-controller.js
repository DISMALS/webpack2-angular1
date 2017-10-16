class MedicalHistorySearchCtrl {
    constructor($rootScope, $scope, $uibModal, $state) {
        this.scope = $scope;
        this.state = $state;
        console.log('这是病历查询视图！');
    };
    //打开详情页面dryad.medicalhistory.details
    openDetails(row) {
        this.scope.$emit('addTab', {
            title: '患者1',
            close: true,
            route: 'dryad.medicalhistory.details',
            params: {
                id: 77865
            }
        });
        this.state.go('dryad.medicalhistory.details', {
            id: 77865
        });
    }
}
MedicalHistorySearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$state'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistorySearchCtrl', MedicalHistorySearchCtrl);
}