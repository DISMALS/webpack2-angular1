class SystemInstitutionalListCtrl {
    constructor($scope, $state, $stateParams) {
        $scope.tabData = [{
                heading: '科室管理',
                route: 'dryad.system.institutional-management.list.department',
                disable: false,
                params: {
                    index: 0
                }
            },
            {
                heading: '角色管理',
                route: 'dryad.system.institutional-management.list.role',
                disable: false,
                params: {
                    index: 1
                }
            }, {
                heading: '员工管理',
                route: 'dryad.system.institutional-management.list.employee',
                disable: false,
                params: {
                    index: 2
                }
            }
        ];
        // $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}
SystemInstitutionalListCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemInstitutionalListCtrl', SystemInstitutionalListCtrl);
}