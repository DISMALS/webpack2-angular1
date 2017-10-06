class LockCtrl {
    constructor($scope, $state, moment,APP_CONFIG) {
        $scope.name = 'wangyong';
        $scope.imgsrc = APP_CONFIG.API_HOST + '/images/loginbg.jpg';
        console.log($scope.imgsrc);
        $scope.gostate = () => {
            $state.go('dryad.home');
        }
        console.log(moment(353243243423).format('HH:mm'));
    }
}
LockCtrl.$inject = ['$scope', '$state', 'moment','APP_CONFIG'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('lockCtrl', LockCtrl);
};