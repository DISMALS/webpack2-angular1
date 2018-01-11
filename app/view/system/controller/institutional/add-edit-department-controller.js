class AddEditDepartmentCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr,systemService,conmmonService) {
        this.scope = $scope;
        this.uibModalInstance = $uibModalInstance;
        this.toastr = toastr;
        $scope.items = items;
        $scope.action = $scope.items.action == 'add' ? '新增科室' : '修改科室';

        $scope.departmentObj = $scope.items.item || {};

        //获取科室性质
        conmmonService.getDictPropertyList().then(data => {
            if(data.status == 200){
                $scope.natureSelect = data.data;
            }else{
                toastr.error(data.errorMessage,null,1500);
            }
        });
        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.sure = () => {
            systemService.addDepartment($scope.departmentObj).then(data => {
                if(data.status == 200){
                    $uibModalInstance.close($scope.departmentObj);
                }else{
                    toastr.error(data.errorMessage,null,1500);
                }
            });
        }
    };
}

AddEditDepartmentCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr','systemService','conmmonService'];

module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'], (require) => {
        require('../../service/system-service')(ngMold);
    }, './system/system-service');
    ngMold.controller('addEditDepartmentCtrl', AddEditDepartmentCtrl);
}