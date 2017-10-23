class SystemEmployeeCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemEmployeeCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemEmployeeCtrl', SystemEmployeeCtrl);
}