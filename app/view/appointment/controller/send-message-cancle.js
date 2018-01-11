class SendMessageCancleCtrl {
    constructor($scope, items, $uibModalInstance) {
        $scope.items = items;
        $scope.type=items.type;
        // console.log(items)
        //取消
        $scope.cancle = () => {
            $uibModalInstance.close('cancle');
        };
        //不保存
        $scope.noSure = () => {
            $uibModalInstance.close('noSave');
        };
        //保存
        $scope.sure = () => {
            $uibModalInstance.close('save');
        };
        $scope.delete = () => {
            $uibModalInstance.close('delete');
        };
    };
}

SendMessageCancleCtrl.$inject = ['$scope', 'items', '$uibModalInstance'];

module.exports = (ngMold) => {
    // require.ensure(['../service/main-service'], (require) => {
    //     const service = require('../service/main-service')(ngMold);
    // }, './common/main-serve');
    ngMold.controller('sendMessageCancleCtrl', SendMessageCancleCtrl);
}