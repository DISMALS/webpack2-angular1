class AddEditRoleCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        $scope.items = items;

        $scope.roleObj = $scope.items.item || {};

        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.sure = () => {
        	console.log($scope.roleObj)
        	//校验角色名称
        if(!$scope.roleObj.roleName || $scope.roleObj.roleName.length < 1){
	       toastr.warning('角色名称不能为空！',null,3000);
	             return false;
         }
            $uibModalInstance.close($scope.roleObj);
        }
    };
}

AddEditRoleCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditRoleCtrl', AddEditRoleCtrl);
}