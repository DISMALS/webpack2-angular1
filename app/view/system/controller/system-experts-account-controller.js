class SystemExpertsAccountCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemExpertsAccountCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemExpertsAccountCtrl', SystemExpertsAccountCtrl);
}