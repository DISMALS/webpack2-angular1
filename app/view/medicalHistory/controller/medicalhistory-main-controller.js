class MedicalHistoryCtrl {
    constructor($rootScope, $scope, $uibModal) {
        console.log('病历管理主视图!');
        this.tablist = [{
            id: 1,
            icon: 'search',
            title: '病历查询',
        }, {
            id: 2,
            title: '患者一',
            close: true,
            time: '2017-10-14',
            imgsrc: ''
        }, {
            id: 3,
            icon: 'medicen',
            title: '患者二',
            close: true,
            time: '2017-10-15',
            imgsrc: ''
        }];
    }
}


MedicalHistoryCtrl.$inject = ['$rootScope', '$scope', '$uibModal'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryCtrl', MedicalHistoryCtrl);
};