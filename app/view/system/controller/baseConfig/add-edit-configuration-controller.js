class AddEditConfigurationCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        $scope.items = items;
        $scope.parentBase = items.chooiseBase;
        
        $scope.configurationObj = $scope.items.item || {};

        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.sure = () => {
            let obj = {
                baseId:$scope.parentBase.baseId,
                name:$scope.configurationObj.name
            }
            if($scope.items.item){
                obj.itemId = $scope.configurationObj.itemId;
            }
            $uibModalInstance.close(obj);
        }
    };
}

AddEditConfigurationCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('addEditConfigurationCtrl', AddEditConfigurationCtrl);
}