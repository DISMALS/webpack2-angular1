class ViewProgramCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr,operationService) {
        $scope.items = items;
        $scope.orgId = items.item.orgId;
        //获取机构详情
        $scope.initData = (orgId) => {
            operationService.viewOrgDetails(orgId).then(rps => {
                if(rps.status == 200){
                    $scope.orgDetails = rps.data;
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
            
        };
        $scope.initData($scope.orgId);

        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.edit = () => {
            $uibModalInstance.dismiss('cancel');
            items.parentScope.editeAdd($scope.items.item);
        }
    };
}

ViewProgramCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr','operationService'];

module.exports = (ngMold) => {
    require.ensure(['../../service/operation-services'],(require) => {
        require('../../service/operation-services')(ngMold);
    },'./system/operation-services');
    ngMold.controller('viewProgramCtrl', ViewProgramCtrl);
}