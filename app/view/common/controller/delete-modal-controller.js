class DeleteModalCtrl {
    constructor($scope, items, $uibModalInstance) {
        this.uibModalInstance = $uibModalInstance;
        this.items = items;
        this.scope = $scope;
    };
    //取消
    cancle() {
        this.uibModalInstance.dismiss('cancle');
    };
    //确认
    delete() {
        this.uibModalInstance.close();
    };
}
DeleteModalCtrl.$inject = ['$scope', 'items', '$uibModalInstance'];
module.exports = (ngMold) => {
    ngMold.controller('deleteModalCtrl', DeleteModalCtrl);
};