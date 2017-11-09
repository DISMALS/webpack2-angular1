class ViewDrugdictionaryCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        $scope.items = items;
        console.log($scope.items);
        $scope.drugdictionary = {
            drugclass:'控制类',
            nor:'234424',
            name:'这是控制类药物',
            unit:'毫升/瓶',
            dosageForm:'液体',
            manufacturer:'中国药品公司',
            approved:'国药准字',
            remark:'这是静态数据'
        }
        $scope.roleObj = $scope.items.item || {};

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
    // //
    // createMedical() {
    //     this.toastr.warning('这是warning的提示语！这是warning的提示语！');
    // };
}

ViewDrugdictionaryCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('viewDrugdictionaryCtrl', ViewDrugdictionaryCtrl);
}