class homeMainCtrl {
    constructor($scope, $state) {
        $scope.name = 'xiaohao';
        $scope.gostate = () => {
            $state.go('login');
        };
        $scope.goPatients = () => {
            $state.go('sys.common.patients');
        }
    }
}

homeMainCtrl.$inject = ['$scope', '$state'];

module.exports = (ngModule) => {
    ngModule.controller('homeMainCtrl', homeMainCtrl);
}