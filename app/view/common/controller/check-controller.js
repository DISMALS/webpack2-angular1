// require('../service/common-service.js');
class CheckCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService, $uibModalInstance, $uibModal, items, toastr) {
        $scope.birthday = null;
        this.toastr = toastr;
        this.uibModalInstance = $uibModalInstance;
        //选中患者
        $scope.medicalRecords = () => {}


    };
    //新建患者
    createMedical() {
        this.toastr.warning('这是成功时的提示语！这是成功时的提示语！');
    };

    //关闭
    // 关闭弹窗
    closedModal() {
        this.uibModalInstance.dismiss('cancel');
    };
}

CheckCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService', '$uibModalInstance', '$uibModal', 'items', 'toastr'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, 'main-serve');
    ngMold.controller('checkCtrl', CheckCtrl);
}