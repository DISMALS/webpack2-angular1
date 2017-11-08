class ResourceNewTextCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, $uibModalInstance, $uibModal, items, toastr) {
        $scope.birthday = null;
        this.toastr = toastr;
        this.uibModalInstance = $uibModalInstance;
        //选中患者
        $scope.medicalRecords = () => {}


    };
}
ResourceNewTextCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', '$uibModalInstance', '$uibModal', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('resourceNewTextCtrl', ResourceNewTextCtrl);
}