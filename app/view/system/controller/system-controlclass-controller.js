class SystemControlclassCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemControlclassCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemControlclassCtrl', SystemControlclassCtrl);
}