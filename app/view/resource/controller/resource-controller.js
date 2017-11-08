class ResourceCtrl {
    constructor($scope,  $state) {
    }
}
ResourceCtrl.$inject = ['$scope', '$state'];


module.exports = (ngMold) => {
    ngMold.controller('resourceCtrl', ResourceCtrl);
}