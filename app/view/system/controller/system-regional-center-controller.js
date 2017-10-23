class SystemRegionalCenterCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemRegionalCenterCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemRegionalCenterCtrl', SystemRegionalCenterCtrl);
}