class SystemOperatingAccountCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemOperatingAccountCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemOperatingAccountCtrl', SystemOperatingAccountCtrl);
}