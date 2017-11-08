class ResourcePublishCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, $uibModalInstance, $uibModal, items, toastr) {

        this.uibModalInstance = $uibModalInstance;
        $scope.activeTab = 1;
        $scope.searchResourceList = [{
            id: 1,
            name: '全部资源'
        }, {
            id: 2,
            name: '资源1'
        }, {
            id: 3,
            name: '资源2'
        }];
        $scope.searchClassifyList = [{
            id: 1,
            name: '全部分类'
        }, {
            id: 2,
            name: '分类1'
        }, {
            id: 3,
            name: '分类2'
        }];

        $scope.uploadData = {
            resource: $scope.searchResourceList[0],
            classify: '',
            doctorAccount: '',
            author: '',
            authorDesc: '',
        };
    };
    closedModal() {
        this.uibModalInstance.dismiss('cancel');
    };
}
ResourcePublishCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', '$uibModalInstance', '$uibModal', 'items', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('resourcePublishCtrl', ResourcePublishCtrl);
}