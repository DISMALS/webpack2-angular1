class ResourcePublishPreviewTextCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, $uibModalInstance, $uibModal, items, toastr) {
        this.uibModalInstance = $uibModalInstance;
    };
    closedModal() {
        this.uibModalInstance.dismiss();
    };
}
ResourcePublishPreviewTextCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', '$uibModalInstance', '$uibModal', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('resourcePublishPreviewTextCtrl', ResourcePublishPreviewTextCtrl);
}