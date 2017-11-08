class AddEditRoleCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        console.log($scope.items);

        $scope.roleObj = $scope.items.item || {};
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
        console.log(this.scope.roleObj);
        this.uibModalInstance.close(this.scope.roleObj);
    }
}

AddEditRoleCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditRoleCtrl', AddEditRoleCtrl);
}