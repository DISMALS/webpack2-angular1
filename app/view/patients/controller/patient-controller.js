class PatientCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG,$stateParams) {
        this.scope = $scope;
        $scope.tablist = [];
        //获取cookies中的tab
        $scope.tabs = $cookies.get('patientstabs') ? JSON.parse($cookies.get('patientstabs')) : [];
        $scope.tabfixed = [{
            icon: 'search',
            close: false,
            title: '患者查询',
            route: 'dryad.patients.search'
        }];
        $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
        $scope.active = 0;

        //添加tab
        $scope.$on('addTab', function(evt, obj) {
            let num = 0;
            $scope.tabs = $cookies.get('patientstabs') ? JSON.parse($cookies.get('patientstabs')) : [];
            $scope.tablist.forEach((item, index) => {
                if (item.params && (obj.params.pid == item.params.pid)) {
                    num++;
                    if($scope.active == index){
                        $scope.$broadcast('activeTab',{active:$scope.active});
                    }else{
                        $scope.active = index;
                    }
                }
            });
            if (num == 0) {
                $scope.tabs.push(obj);
                $cookies.putObject('patientstabs', $scope.tabs);
                $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
                $scope.active = $scope.tablist.length - 1;
            }
            if(!obj.from){
                $scope.$apply();
            }
        });

        // 删除tab
        $scope.$on('closeTab', function(evt, obj) {
            let closeObj = obj.item;
            $scope.tabs = $cookies.get('patientstabs') ? JSON.parse($cookies.get('patientstabs')) : [];
            $scope.tablist.splice(obj.index, 1);
            if ($scope.tabs.length > 0) {
                angular.forEach($scope.tabs, (i, k) => {
                    if (i.params.pid == closeObj.params.pid) {
                        $scope.tabs.splice(k, 1);
                    }
                });
                $cookies.putObject('patientstabs', ($scope.tabs || []));
            }
            $scope.active = 0;
        });

        //选中tab
        $scope.$on('active', function(evt, obj) {
            $scope.active = obj.index;
        });

        //路由相关变化
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
            if(toState.name == 'dryad.patients.search'){
                $scope.active = 0;
            }
        });
    }
}
PatientCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$timeout', '$cookies', 'APP_CONFIG','$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('patientCtrl', PatientCtrl);
}