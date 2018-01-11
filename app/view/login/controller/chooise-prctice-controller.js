class ChooiseprcticeCtrl {
    constructor($scope, $state, moment) {
        $scope.name = 'wangyong';
        $scope.gostate = () => {
            $state.go('dryad.home.main');
        }
        console.log(moment(353243243423).format('HH:mm'));
    }
}
ChooiseprcticeCtrl.$inject = ['$scope', '$state', 'moment'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('chooiseprcticeCtrl', ChooiseprcticeCtrl);
};