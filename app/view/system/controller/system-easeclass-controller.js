class SystemEaseclassCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemEaseclassCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemEaseclassCtrl', SystemEaseclassCtrl);
}