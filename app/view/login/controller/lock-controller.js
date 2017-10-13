class LockCtrl {
    constructor($scope, $state, moment, APP_CONFIG, $cookies) {
        this.state = $state;
        this.cookies = $cookies;
        $scope.name = 'wangyong';
        $scope.imgsrc = APP_CONFIG.API_HOST + '/images/loginbg.jpg';
        $scope.gostate = () => {
                this.state.go('dryad.home');
            }
            // console.log(moment(353243243423).format('HH:mm'));
            // console.log(this.stateParams);
    };
    //解锁
    unlock() {
        this.state.go(this.cookies.get('lockroute'));
    };
}
LockCtrl.$inject = ['$scope', '$state', 'moment', 'APP_CONFIG', '$cookies'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('lockCtrl', LockCtrl);
};