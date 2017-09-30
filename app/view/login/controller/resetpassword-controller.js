class ResetpasswordCtrl {
    constructor($scope, $state, moment) {
        $scope.name = 'wangyong';
        $scope.login = () => {
            $state.go('authorize.login');
        }
        console.log(moment(353243243423).format('HH:mm'));
    }
}
ResetpasswordCtrl.$inject = ['$scope', '$state', 'moment'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('resetpasswordCtrl', ResetpasswordCtrl);
};