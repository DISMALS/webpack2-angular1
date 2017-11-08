class ViewProgramCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        $scope.programObj =  { //$scope.items.item ||
            orgName:'机构名称',
            orgAdmin:'机构管理员',
            phon:'联系电话',
            email:'邮编',
            address:'联系地址',
            logoSrc:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1080522544,3285787255&fm=27&gp=0.jpg',
            adminAccount:'管理员账号',
            password:'登录密码'
        };

        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.edit = () => {
            $uibModalInstance.dismiss('cancel');
            items.parentScope.editeAdd($scope.programObj);
        }
    };
}

ViewProgramCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('viewProgramCtrl', ViewProgramCtrl);
}