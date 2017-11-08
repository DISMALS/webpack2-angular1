class ResourceListCtrl {
    constructor($scope,  $state) {
        $scope.tabData = [{
            heading: '未提交',
            route: 'dryad.resource.list.uncommitted',
            disable: false,
            params: {
                index: 0
            }
        }, {
            heading: '待审核',
            route: 'dryad.resource.list.pendingApproval',
            disable: false,
            params: {
                index: 1
            }
        }, {
            heading: '已发布',
            route: 'dryad.resource.list.published',
            disable: false,
            params: {
                index: 1
            }
        }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}
ResourceListCtrl.$inject = ['$scope', '$state'];


module.exports = (ngMold) => {
    ngMold.controller('resourceListCtrl', ResourceListCtrl);
}