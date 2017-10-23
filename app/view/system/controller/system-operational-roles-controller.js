class SystemOperationalRolesCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemOperationalRolesCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemOperationalRolesCtrl', SystemOperationalRolesCtrl);
}