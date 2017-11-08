class AddEditProgramCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        console.log($scope.items);

        $scope.roleObj = $scope.items.item || {
            orgName:'机构名称',
            orgAdmin:'机构管理员',
            phon:'联系电话',
            email:'邮编',
            address:'联系地址',
            logoSrc:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1080522544,3285787255&fm=27&gp=0.jpg',
            adminAccount:'管理员账号',
            password:'登录密码'
        };

        //上传图片
        $scope.serviceFunc = (file) => {
            console.log(file);
        }

        //
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
        console.log(this.scope.roleObj);
        this.uibModalInstance.close(this.scope.roleObj);
    }
}

AddEditProgramCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditProgramCtrl', AddEditProgramCtrl);
}