class AddEditDrugdictionaryCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        console.log($scope.items);

        $scope.drugdictionary = $scope.items.item || {};

        $scope.selectList = [{
            id: 1,
            name: '测试1'
        }, {
            id: 2,
            name: '测试2'
        }, {
            id: 3,
            name: '测试3'
        }];
    };
    //
    createMedical() {
        this.toastr.warning('这是warning的提示语！这是warning的提示语！');
    };

    // close modal
    closedModal() {
        this.uibModalInstance.dismiss('cancel');
    };
    //sure
    sure() {
        console.log(this.scope.drugdictionary);
        this.uibModalInstance.close(this.scope.drugdictionary);
    }
}

AddEditDrugdictionaryCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditDrugdictionaryCtrl', AddEditDrugdictionaryCtrl);
}