class LoginCtrl {
    constructor($scope, $state) {
        $scope.name = 'wangyong';
        $scope.gostate = () => {
            $state.go('sys.common.home');
        }
    }
}
LoginCtrl.$inject = ['$scope', '$state'];

module.exports = (ngMold) => {
    ngMold.controller('loginCtrl', LoginCtrl);
};