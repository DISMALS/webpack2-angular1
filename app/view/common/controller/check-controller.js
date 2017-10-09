// require('../service/common-service.js');
class CheckCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService, $uibModalInstance, $uibModal, items) {

        //选中患者
        $scope.medicalRecords = () => {}

        // 关闭弹窗
        $scope.closedModal = () => {
            $uibModalInstance.dismiss();
        }
    }
}

CheckCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService', '$uibModalInstance', '$uibModal', 'items'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, 'main-serve');
    ngMold.controller('checkCtrl', CheckCtrl);
}