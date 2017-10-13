class homeMainCtrl {
    constructor($scope, $state) {
        $scope.name = 'xiaohao';
        $scope.gostate = () => {
            $state.go('login');
        };
        $scope.goPatients = () => {
            $state.go('dryad.patients');
        }

        $scope.itemArray = [
            { id: 1, name: 'first' },
            { id: 2, name: 'second' },
            { id: 3, name: 'third' },
            { id: 4, name: 'fourth' },
            { id: 5, name: 'fifth' },
        ];

        $scope.selected = { value: $scope.itemArray[0] };
    }
}

homeMainCtrl.$inject = ['$scope', '$state'];

module.exports = (ngModule) => {
    ngModule.controller('homeMainCtrl', homeMainCtrl);
}