class SystemInstitutionalCtrl {
    constructor($scope, $state, $stateParams) {
        $scope.tabData = [{
                heading: '科室管理',
                route: 'dryad.system.institutional-management.department',
                disable: false,
                params: {
                    index: 0
                }
            },
            {
                heading: '角色管理',
                route: 'dryad.system.institutional-management.role',
                disable: false,
                params: {
                    index: 1
                }
            }, {
                heading: '员工管理',
                route: 'dryad.system.institutional-management.employee',
                disable: false,
                params: {
                    index: 2
                }
            }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}
SystemInstitutionalCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemInstitutionalCtrl', SystemInstitutionalCtrl);
}