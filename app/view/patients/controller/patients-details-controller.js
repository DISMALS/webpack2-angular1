require('../../../../images/user-icon.png');
class PatientsDeailsCtrl {
    constructor($scope, $stateParams, APP_CONFIG) {
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
                heading: 'PEF/用药/ACT',
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
        // $scope.go = function(state) {
        //     $state.go(state);
        // };
    }
}

PatientsDeailsCtrl.$inject = ['$scope', '$stateParams', 'APP_CONFIG'];

module.exports = (ngMold) => {
    ngMold.controller('patientsDeailsCtrl', PatientsDeailsCtrl);
}