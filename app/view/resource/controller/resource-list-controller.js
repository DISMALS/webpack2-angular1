/**
 * Created by wangmu on 17/11/7.
 */
class ResourceListCtrl {
    constructor($scope,  $state) {
        $scope.tabData = [{ //列表切换
            heading: '待提交',
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
                index: 2
            }
        }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}
ResourceListCtrl.$inject = ['$scope', '$state'];


module.exports = (ngMold) => {
    require.ensure(['../service/resource-service'], (require) => {
        require('../service/resource-service')(ngMold);
    }, './resource/resource-service');
    ngMold.controller('resourceListCtrl', ResourceListCtrl);
}