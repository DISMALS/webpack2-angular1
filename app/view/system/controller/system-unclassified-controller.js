class SystemUnclassifiedCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
SystemUnclassifiedCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('systemUnclassifiedCtrl', SystemUnclassifiedCtrl);
}