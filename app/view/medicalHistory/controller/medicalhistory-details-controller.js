class MedicalHistoryDeailsCtrl {
    constructor($rootScope, $scope, $stateParams, $state) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.tabData = [{
                heading: '基本信息',
                route: 'dryad.medicalhistory.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    id: $stateParams.id
                }
            },
            {
                heading: '临床信息',
                route: 'dryad.medicalhistory.details.clinical-information',
                disable: false,
                params: {
                    index: 1,
                    id: $stateParams.id
                }
            }, {
                heading: '实验室检查',
                route: 'dryad.medicalhistory.details.laboratory-inspection',
                disable: false,
                params: {
                    index: 2,
                    id: $stateParams.id
                }
            },
            {
                heading: '诊断',
                route: 'dryad.medicalhistory.details.diagnosis',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            },
            {
                heading: '治疗方案',
                route: 'dryad.medicalhistory.details.treatment-regimen',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            },
            {
                heading: '特殊哮喘记录',
                route: 'dryad.medicalhistory.details.special-asthma',
                disable: false,
                params: {
                    index: 3,
                    id: $stateParams.id
                }
            }
        ];
        // $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        // if (toState.name == 'dryad.medicalhistory.details') {
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
        //     }

        // });

    }
}

MedicalHistoryDeailsCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$state'];

module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryDeailsCtrl', MedicalHistoryDeailsCtrl);
}