class RetreatModalCtrl {
    constructor($scope, items, $uibModalInstance, toastr) {
        $scope.title = items.title;
        $scope.info = items.info;
        $scope.UpSure = (e) => {
            let  keycode = window.event?e.keyCode:e.which;
            if ( keycode == 13 ) {
                $scope.sure();
            }
        }
        $scope.sure = () => {
            if ( !$scope.info ) {
                toastr.error($scope.title, null, 3000);
                return
            }
            $uibModalInstance.close($scope.info);
        }
        this.uibModalInstance = $uibModalInstance;
    };
    //取消
    cancle() {
        this.uibModalInstance.dismiss('cancle');
    };
    //删除
    delete() {
        this.uibModalInstance.close(this.items);
    };
    //关闭
    closedModal() {
        this.uibModalInstance.dismiss();
    };
}
RetreatModalCtrl.$inject = ['$scope', 'items', '$uibModalInstance', 'toastr'];
module.exports = (ngMold) => {
    ngMold.controller('retreatModalCtrl', RetreatModalCtrl);
};