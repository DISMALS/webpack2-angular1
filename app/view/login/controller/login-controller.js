class LoginCtrl {
    constructor($rootScope,$cookies,$scope, $state,loginService,toastr,APP_CONFIG,$timeout) {
        $scope.login = {
            remmeberPassWord:false,
            userCode:$cookies.get('remmeberUsername') ? $cookies.get('remmeberUsername') : '',
            password:''
        };
    		$timeout(function(){
    			$scope.login.userCode = $cookies.get('remmeberUsername') ? $cookies.get('remmeberUsername') : '';
    		})
        //登录系统
        $scope.logins = () => {
        		if(!$scope.login.userCode){
        			toastr.warning('用户名不能为空',null,1500)
        			return
        		}
        		if(!$scope.login.password){
        			toastr.warning('密码不能为空',null,1500)
        			return
        		}
            let obj = {
                userCode:$scope.login.userCode,
                password:$scope.login.password
            }
            loginService.logIn(obj).then((data) => {
                if(data.status == 200){
                    $scope.removeCookie();
                    $rootScope.user = {
                        username: $scope.login.userCode,
                        password: $scope.login.password,
                        functionList:data.data.functionList || [],
                        remmeberUsername:$scope.login.remmeberUsername,
                        token:data.data.token || '',
                        employeeId:data.data.employeeId || '',
                        employeeHeadPicUrl:data.data.employeeHeadPicUrl || '',
                        orgIconUrl:data.data.orgIconUrl || '',
                        imAccount:data.data.imAccount || '',
                        imPassword:data.data.imPassword || '',
                        name:data.data.name,
                        userType:data.data.userType || ''
                    };
                    $cookies.put(APP_CONFIG['CH_AU_T_NAME'],data.data.token);
                    if($scope.login.remmeberUsername){
                        $cookies.put('remmeberUsername',$scope.login.userCode);
                    }
                    $cookies.putObject('user',$rootScope.user);
                    $state.go('dryad.home.main');
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };

        //登陆时清空cookies数据
        $scope.removeCookie = () => {
            let cookies = $cookies.getAll();
            window.sessionStorage.clear();
            for (let item in cookies) {
                if(item != 'remmeberUsername'){
                    $cookies.remove(item);
                }
            }
        };

        //enter
        $scope.enter = (evt) => {
            if(evt.keyCode == 13){
                $scope.logins();
            }
        };

        //重置密码
        $scope.reset = () => {
            $state.go('authorize.resetpassword');
        }
    }
}
LoginCtrl.$inject = ['$rootScope','$cookies','$scope', '$state','loginService','toastr','APP_CONFIG','$timeout'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('loginCtrl', LoginCtrl);
};