class ResourceNewVideoCtrl {
    constructor($scope, $state, $stateParams) {

    }
}
ResourceNewVideoCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('resourceNewVideoCtrl', ResourceNewVideoCtrl);
}