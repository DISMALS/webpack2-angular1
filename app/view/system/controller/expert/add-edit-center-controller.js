class AddEditCenterCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        console.log($scope.items);

        $scope.orginalCenter = $scope.items.item || {
            name:'机构名称',
            provinces:[],
            description:'联系电话'
        };
        
        $scope.selectList = [
            {
                id:1,
                name:'测试地址1'
            },{
                id:2,
                name:'测试地址2'
            },{
                id:3,
                name:'测试地址4'
            }
        ];
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
        console.log(this.scope.orginalCenter);
        this.uibModalInstance.close(this.scope.orginalCenter);
    }
}

AddEditCenterCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditCenterCtrl', AddEditCenterCtrl);
}