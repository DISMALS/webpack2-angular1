class SystemProgramsCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemProgramsCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemProgramsCtrl', SystemProgramsCtrl);
}