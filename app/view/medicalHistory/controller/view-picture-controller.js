class ViewPictureCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, $uibModalInstance, items,_) {
        $scope.item = items;
        $scope.picture = items.picture || {};
        $scope.action = items.action;
        console.log('查看图片')
        //确认
        $scope.sure = () => {
            $uibModalInstance.close();
        };

        // 关闭弹窗
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };

    };
}

ViewPictureCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', '$uibModalInstance', 'items','_'];

module.exports = (ngMold) => {
    // require.ensure(['../service/main-service'], (require) => {
    //     const service = require('../service/main-service')(ngMold);
    // }, './common/main-serve');
    ngMold.controller('viewPictureCtrl', ViewPictureCtrl);
}