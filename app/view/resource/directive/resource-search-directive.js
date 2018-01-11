
let ResourceSearch = ($timeout, ResourceService, $state, _, toastr) => { //列表页面, 头部搜索指令
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            searchList: '=searchlist',
            isUncommitted: '=isuncommitted',
            changeResource: '&changeresource',
        },
        template: require('../html/resource-search.html'),
        link: function($scope, elem, attrs) {
            $scope.UpchangeResource = (e) => {
                let  keycode = window.event?e.keyCode:e.which;
                if ( keycode == 13 ) {
                    $scope.changeResource();
                }
            }
            $scope.getSearchInfo = () => { //获取下拉选项
                ResourceService.getResourceSearchProperty().then((data) => {  //资源性质
                    if(data.status==200){
                        $scope.searchResourceList = data.data;
                    }else{
                        toastr.error(data.errorMessage,null,3000);
                        return;
                    }
                });
                ResourceService.getResourceSearchClassify().then((data) => { //资源分类
                    if(data.status==200){
                        $scope.searchClassifyList = data.data;
                    }else{
                        toastr.error(data.errorMessage,null,3000);
                        return;
                    }
                });
                if ($scope.isUncommitted) {
                    ResourceService.getResourceSearchState().then((data) => { //资源分类
                        if(data.status==200){
                            $scope.resourceTypeList = data.data;
                            $scope.resourceTypeList.splice(2, 2);
                        }else{
                            toastr.error(data.errorMessage,null,3000);
                            return;
                        }
                    });
                }
            }
            $scope.getSearchInfo();
            $scope.searchList = {
                resourceType: 0,
                queryKeyword: '',
                resourceProperty: 0,
                resourceClassify: 0,
            };
            $scope.goPublish = () => { //新增资源
                $state.go('dryad.resource.publish', {operation: 'newAdd'});
            }
        }
    }
}
ResourceSearch.$inject = ['$timeout', 'ResourceService', '$state', '_', 'toastr'];

module.exports = (ngMold) => {
    ngMold.directive('resourceSearch', ResourceSearch);
}