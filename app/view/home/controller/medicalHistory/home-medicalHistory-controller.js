class DataApplicationCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG) {
        this.scope = $scope;
        $scope.tablist = [];

        //获取cookies中的tab
        $scope.tabs = [];
        $scope.tabfixed = [{
            close: false,
            title: '病历列表',
            route: 'dryad.home.module.medicalhistory.list'
        }];
        $scope.tablist = $scope.tabfixed.concat(($scope.tabs));
        $scope.active = 0;
          //添加tab
          $scope.$on('addTabHomeMedicalHistorytabs', function(evt, obj) {
            let num = 0;
            $scope.tablist.map((item, index) => {
                if(item.params){
                    if((obj.params.pid == item.params.pid) && (obj.params.rid == item.params.rid)){
                        num++;
                        if($scope.active == index){
                            $scope.$broadcast('activeTab',{active:$scope.active});
                        }else{
                            $scope.active = index;
                        }
                    }else if((obj.params.pid != item.params.pid) && (obj.params.rid == item.params.rid)){
                        num = -1;
                    }
                } 
            });
            if(num == -1){toastr.warning('你有未操作完的病历！',null,3000);return false;}
            if (num == 0) {
                $scope.tabs.push(obj);
                $scope.tablist = $scope.tabfixed.concat($scope.tabs);
                $scope.active = $scope.tablist.length - 1;
                // $state.go(obj.route,obj.params);
            }
            if(!obj.from){
                $scope.$apply();
            }
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