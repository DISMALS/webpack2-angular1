require('../../../../images/default-logo.png');
class LockCtrl {
    constructor($rootScope,$scope, $state, $cookies,loginService,toastr) {
        $scope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
        if(!$scope.user){
            $state.go('authorize.login');
            return false;
        }
        $scope.unlockPassWord = '';
        $scope.name = $scope.user.username || '';
        $scope.imgsrc = $scope.user.employeeHeadPicUrl || '/images/default-logo.png';
        //解锁
        $scope.unlock = () => {
            let user = JSON.parse($cookies.get('user'));
            if(user.password == $scope.unlockPassWord){
                $state.go($cookies.get('lockroute'));
            }else{
                toastr.error('输入的密码有误，请重新输入！',null,1500);
                $scope.unlockPassWord = '';
            }
        };

        //enter
        $scope.enter = (evt) => {
            if(evt.keyCode == 13){
                $scope.unlock();
            }
        };
    };
    
}
LockCtrl.$inject = ['$rootScope','$scope', '$state', '$cookies','loginService','toastr'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('lockCtrl', LockCtrl);
};