class SystemRoleCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemRoleCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemRoleCtrl', SystemRoleCtrl);
}