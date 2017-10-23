class DataApplicationCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG) {
        this.scope = $scope;
        $scope.tablist = [];

        //获取cookies中的tab
        $scope.tabs = $cookies.get('dataApplicationstabs') ? JSON.parse($cookies.get('dataApplicationstabs')) : [];
        $scope.tabfixed = [{
            icon: 'search',
            close: false,
            title: '病历查询',
            route: 'dryad.data-applications.search'
        }];
        $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
        $scope.active = 0;

        //添加tab
        $scope.$on('addTab', function(evt, obj) {
            let num = 0;
            $scope.tabs = $cookies.get('dataApplicationstabs') ? JSON.parse($cookies.get('dataApplicationstabs')) : [];
            $scope.tablist.map((item, index) => {
                if (item.params && (obj.params.id == item.params.id)) {
                    num++;
                    $scope.active = index;
                    return;
                }
            });
            if (num == 0) {
                $scope.tabs.push(obj);
                $cookies.putObject('dataApplicationstabs', $scope.tabs);
                $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
                $scope.active = $scope.tablist.length - 1;
            }
            $scope.$apply();
        });

        // 删除tab
        $scope.$on('closeTab', function(evt, obj) {
            let closeObj = obj.item;
            $scope.tabs = $cookies.get('dataApplicationstabs') ? JSON.parse($cookies.get('dataApplicationstabs')) : [];
            $scope.tablist.splice(obj.index, 1);
            if ($scope.tabs.length > 0) {
                angular.forEach($scope.tabs, (i, k) => {
                    if (i.params.id == closeObj.params.id) {
                        $scope.tabs.splice(k, 1);
                    }
                });
                $cookies.putObject('dataApplicationstabs', ($scope.tabs || []));
            }
            $scope.active = 0;
        });

        //选中tab
        $scope.$on('active', function(evt, obj) {
            $scope.active = obj.index;
        });
    }
}


DataApplicationCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$timeout', '$cookies', 'APP_CONFIG'];




module.exports = (ngMold) => {
    ngMold.controller('dataApplicationCtrl', DataApplicationCtrl);
};