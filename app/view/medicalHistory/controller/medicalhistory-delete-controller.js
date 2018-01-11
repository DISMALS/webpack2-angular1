class delectMedicalhistoryCtrl {
    constructor($scope, items, $uibModalInstance) {
        this.items = items;
        this.scope = $scope;
        this.patinet = items.patinet;
        this.uibModalInstance = $uibModalInstance;
        $scope.type=items.type;
        // console.log(items)
    };
    //取消
    cancle() {
        this.uibModalInstance.close('cancle');
    };
    //不保存
    noSure() {
        this.uibModalInstance.close('noSave');
    };
    //保存
    sure() {
        this.uibModalInstance.close('save');
    };
    delete() {
        this.uibModalInstance.close('delete');
    };
}

delectMedicalhistoryCtrl.$inject = ['$scope', 'items', '$uibModalInstance'];

module.exports = (ngMold) => {
    // require.ensure(['../service/main-service'], (require) => {
    //     const service = require('../service/main-service')(ngMold);
    // }, './common/main-serve');
    ngMold.controller('delectMedicalhistoryCtrl', delectMedicalhistoryCtrl);
}