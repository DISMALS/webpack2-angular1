class AddEditDrugdictionaryCtrl {
    constructor($scope,$uibModalInstance, items, toastr,conmmonService,baseconfigDrugdictionaryService) {
        $scope.items = items;
        $scope.drugClasses = items.drugClass; //药品分类
        $scope.drugdictionary={};
        $scope.drugdictionary = $scope.items.item || {};
        if(items.clickEvent){
            $scope.drugdictionary.categoryId=items.clickEvent;
        }
        //获取药品剂型
        $scope.dosageList = () => {
            conmmonService.getDosageList().then(rps => {
                if(rps.status == 200){
                    $scope.allDosageList = rps.data;
                }
            })
        };

        let initData = () => {
            $scope.dosageList();
            if(!$scope.drugdictionary.detailId){return false;}
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
        //sure 
        $scope.sure = () => {
            if($scope.items.item){
                $scope.drugdictionary.drugId = $scope.items.item.drugId;
            }
            $scope.drugdictionary.name = $scope.drugdictionary.drugName;
            delete $scope.drugdictionary.drugName;
            $uibModalInstance.close($scope.drugdictionary);
        }
    };
}

AddEditDrugdictionaryCtrl.$inject = ['$scope','$uibModalInstance', 'items', 'toastr','conmmonService','baseconfigDrugdictionaryService'];

module.exports = (ngMold) => {
    require.ensure(['../../service/baseconfig-drugdictionary-services'],(require) => {
        require('../../service/baseconfig-drugdictionary-services')(ngMold);
    },'./system/baseconfig-drugdictionary-services');
    ngMold.controller('addEditDrugdictionaryCtrl', AddEditDrugdictionaryCtrl);
}