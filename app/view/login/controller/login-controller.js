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
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, 'login-serve');
    ngMold.controller('loginCtrl', LoginCtrl);
};