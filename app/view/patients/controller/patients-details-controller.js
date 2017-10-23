require('../../../../images/user-icon.png');
class PatientsDeailsCtrl {
    constructor($scope, $stateParams, APP_CONFIG, $state) {
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
        $scope.tabData = [{
                heading: '基本信息',
                route: 'dryad.patients.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    id: $stateParams.id
                }
            },
            {
                heading: '诊断',
                route: 'dryad.patients.details.diagnosis',
                disable: false,
                params: {
                    index: 1,
                    id: $stateParams.id
                }
            }, {
                heading: 'PEF/ACT/用药记录',
                route: 'dryad.patients.details.usemedical',
                disable: false,
                params: {
                    index: 2,
                    id: $stateParams.id
                }
            },
            {
                heading: '健康档案',
                route: 'dryad.patients.details.health-records',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
        // $scope.go = function(state) {
        //     $state.go(state);
        // };
    }
}

PatientsDeailsCtrl.$inject = ['$scope', '$stateParams', 'APP_CONFIG', '$state'];

module.exports = (ngMold) => {
    ngMold.controller('patientsDeailsCtrl', PatientsDeailsCtrl);
}