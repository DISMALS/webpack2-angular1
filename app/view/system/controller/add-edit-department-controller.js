class AddEditDepartmentCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        $scope.action = $scope.items.action == 'add' ? '新增科室' : '修改科室';

        $scope.departmentObj = $scope.items.item || {};

        $scope.natureSelect = [{
            id: 1,
            name: '私营'
        }, {
            id: 2,
            name: '公立'
        }, {
            id: 3,
            name: '合资'
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
        console.log(this.scope.departmentObj);
        this.uibModalInstance.close(this.scope.departmentObj);
    }
}

AddEditDepartmentCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditDepartmentCtrl', AddEditDepartmentCtrl);
}