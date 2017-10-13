class EditPasswordCtrl {
    constructor($scope, items, $uibModalInstance) {
        this.scope = $scope;
        this.items = items;
        this.uibModalInstance = $uibModalInstance;
    };
    //保存
    save() {
        this.uibModalInstance.close('cancle');
    };
    //关闭
    close() {
        this.uibModalInstance.dismiss('cancle');
    };
}
EditPasswordCtrl.$inject = ['$scope', 'items', '$uibModalInstance']
module.exports = (ngMold) => {
    ngMold.controller('editPasswordCtrl', EditPasswordCtrl);
}