class SystemDepartmentCtrl {
    constructor($scope, $state, $stateParams) {
        
    }
}
SystemDepartmentCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemDepartmentCtrl', SystemDepartmentCtrl);
}