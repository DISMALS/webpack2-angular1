class SystemExpertRoleCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemExpertRoleCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemExpertRoleCtrl', SystemExpertRoleCtrl);
}