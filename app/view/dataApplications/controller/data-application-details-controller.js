class DataApplicationDeailsCtrl {
    constructor($scope, $stateParams, $state) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.tabData = [{
                heading: '基本信息',
                route: 'dryad.data-applications.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    id: $stateParams.id
                }
            },
            {
                heading: '临床信息',
                route: 'dryad.data-applications.details.clinical-information',
                disable: false,
                params: {
                    index: 1,
                    id: $stateParams.id
                }
            }, {
                heading: '实验室检查',
                route: 'dryad.data-applications.details.laboratory-inspection',
                disable: false,
                params: {
                    index: 2,
                    id: $stateParams.id
                }
            },
            {
                heading: '诊断',
                route: 'dryad.data-applications.details.diagnosis',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            },
            {
                heading: '治疗方案',
                route: 'dryad.data-applications.details.treatment-regimen',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            },
            {
                heading: '特殊哮喘记录',
                route: 'dryad.data-applications.details.special-asthma',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}

DataApplicationDeailsCtrl.$inject = ['$scope', '$stateParams', '$state'];

module.exports = (ngMold) => {
    ngMold.controller('dataApplicationDeailsCtrl', DataApplicationDeailsCtrl);
}