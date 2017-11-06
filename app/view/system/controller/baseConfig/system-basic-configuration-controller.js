class SystemBasicConfigurationCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemBasicConfigurationCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemBasicConfigurationCtrl', SystemBasicConfigurationCtrl);
}