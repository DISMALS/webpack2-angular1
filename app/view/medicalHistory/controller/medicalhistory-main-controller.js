class MedicalHistoryCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG) {
        this.scope = $scope;
        $scope.tablist = [];

        //获取cookies中的tab
        $scope.tabs = $cookies.get('tabs') ? JSON.parse($cookies.get('tabs')) : [];
        $scope.tabfixed = [{
            icon: 'search',
            close: false,
            title: '病历查询',
            route: 'dryad.medicalhistory.search'
        }];
        $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
        $scope.active = 0;

        //添加tab
        $scope.$on('addTab', function(evt, obj) {
            $scope.tablist = [];
            $scope.tabs = $cookies.get('tabs') ? JSON.parse($cookies.get('tabs')) : [];
            $scope.tabs.push(obj);
            $cookies.putObject('tabs', $scope.tabs);

            $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
            setTimeout(function() {
                $scope.active = $scope.tablist.length - 1;
            });
        });

        // 删除tab
        $scope.$on('closeTab', function(evt, obj) {

        });

        //选中tab
        $scope.$on('active', function(evt, obj) {

        });
    }
}


MedicalHistoryCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$timeout', '$cookies', 'APP_CONFIG'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryCtrl', MedicalHistoryCtrl);
};