class ViewDrugdictionaryCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr,baseconfigDrugdictionaryService) {
        $scope.items = items;

        let initData = () => {
            baseconfigDrugdictionaryService.getDrugDetails($scope.items.item.detailId).then(rps => {
                if(rps.status == 200){
                    $scope.drugdictionary = rps.data;
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        initData();

        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //edit
        $scope.edit = () => {
            $uibModalInstance.dismiss('cancel');
            $scope.items.parentScope.editeAdd($scope.items.item);
        }
    };
}

ViewDrugdictionaryCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr','baseconfigDrugdictionaryService'];

module.exports = (ngMold) => {
    require.ensure(['../../service/baseconfig-drugdictionary-services'],(require) => {
        require('../../service/baseconfig-drugdictionary-services')(ngMold);
    },'./system/baseconfig-drugdictionary-services');
    ngMold.controller('viewDrugdictionaryCtrl', ViewDrugdictionaryCtrl);
}