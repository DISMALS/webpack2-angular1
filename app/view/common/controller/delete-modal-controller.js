class DeleteModalCtrl {
    constructor($scope, items, $uibModalInstance) {
        this.items = items;
        this.scope = $scope;
        this.patinet = items.patinet;
        this.uibModalInstance = $uibModalInstance;
    };
    //取消
    cancle() {
        this.uibModalInstance.dismiss('cancle');
    };
    //取消
    cancleClose() {
        this.uibModalInstance.close(false);
    };
    //删除
    delete() {
        this.uibModalInstance.close(this.items);
    };
    //确认
    sure() {
        this.uibModalInstance.close(this.items);
    };
}
DeleteModalCtrl.$inject = ['$scope', 'items', '$uibModalInstance'];
module.exports = (ngMold) => {
    ngMold.controller('deleteModalCtrl', DeleteModalCtrl);
};