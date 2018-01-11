class ResetpasswordCtrl {
    constructor($scope, $state, moment,loginService,toastr,$timeout,$interval) {
        $scope.login = () => {
            $state.go('authorize.login');
        }

        $scope.num = 3;
        $scope.resetPasswordObj = {};
        $scope.disabled = false;
        $scope.showhide = false;
        $scope.sendCheckCodeText = '获取验证码';
        $scope.countDown = 60;
        var timer;
        //发送验证码
        $scope.sendCheckCode = () => {
        		console.log('点击')
        		if($scope.disabled){
        			return
        		}
        		console.log('发送')
            let phonReg = /^1[0-9]{10}$/i;
            if(!$scope.resetPasswordObj.phoneNo){
                toastr.warning('手机号不能为空！',null,3000);
                return false;
            }
            if(!phonReg.test($scope.resetPasswordObj.phoneNo)){
                toastr.warning('输入的手机号为11位的数字！',null,3000);
                return false;
            }
            $scope.disabled = true;
            loginService.sendCheckCode($scope.resetPasswordObj.phoneNo).then(rps => {
                if(rps.status == 200){
                    toastr.success('短信发送成功！',null,3000);
                    timer = $interval(function(){
		                    		$scope.countDown--;
		                    		if($scope.countDown == 0){
		                    			$interval.cancel(timer);
		                    			$scope.sendCheckCodeText = '获取验证码';
		                    			$scope.countDown = 60;
		                    			$scope.disabled = false;
		                    		}else{
		                    			$scope.sendCheckCodeText = $scope.countDown+'s后可重发';
		                    		}
		                    		
		                    },1000)
					
                    
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                    $scope.disabled = false;
                }
            });
        };

        //输入框校验
        $scope.checkFn = () => {
            $scope.errNum = 0;
            $scope.checkFormat = 0;
            let checkCode = ['userCode','phoneNo','verifyCode','newPassword','confirmPassword'];
            checkCode.forEach(ele => {
                if(!$scope.resetPasswordObj[ele]){  //空值校验
                    if(ele == 'userCode'){
                        $scope.errNum += 1;
                        return false;
                    }else if(ele == 'phoneNo'){
                        $scope.errNum += 1;
                        return false;
                    }else if(ele == 'verifyCode'){
                        $scope.errNum += 1;
                        return false;
                    }else if(ele == 'newPassword'){
                        $scope.errNum += 1;
                        return false;
                    }else if(ele == 'confirmPassword'){
                        $scope.errNum += 1;
                        return false;
                    }
                }else{ //输入值合法校验
                    if(ele == 'userCode'){
                        let userCheck = /^[A-Za-z0-9]{6,16}$/i;
                        if(!userCheck.test($scope.resetPasswordObj.userCode)){
                            $scope.checkFormat = 1;
                        }
                        return false;
                    }else if(ele == 'phoneNo'){
                        let phonCheck = /^1[0-9]{10}$/i;
                        if(!phonCheck.test($scope.resetPasswordObj.phoneNo)){
                            $scope.checkFormat = 2;
                        }
                        return false;
                    }else if(ele == 'verifyCode'){
                        let verifyCheck = /^[0-9]{6}$/i;
                        if(!verifyCheck.test($scope.resetPasswordObj.verifyCode)){
                            $scope.checkFormat = 3;
                        }
                        return false;
                    }else if(ele == 'newPassword'){
                        let newwordCheck = /^[A-Za-z0-9]{6,16}$/i;
                        if(!newwordCheck.test($scope.resetPasswordObj.newPassword)){
                            $scope.checkFormat = 4;
                        }
                        return false;
                    }else if(ele == 'confirmPassword'){
                        if($scope.resetPasswordObj.confirmPassword != $scope.resetPasswordObj.newPassword){
                            $scope.checkFormat = 5;
                        }
                        return false;
                    }
                }
            });
        }

        //保存
        $scope.save = () => {
            $scope.checkFn();
            if($scope.errNum > 0){
                toastr.warning('请完善所有输入框内容！',null,3500);
                return false;
            }
            if($scope.checkFormat == 1){
                toastr.warning('账号为6到16位的大小写字母、数字',null,3500);
                return false;
            }else if($scope.checkFormat == 2){
                toastr.warning('格式错误！手机号码为11位的数字',null,3500);
                return false;
            }else if($scope.checkFormat == 3){
                toastr.warning('验证码为6为的数字',null,3500);
                return false;
            }else if($scope.checkFormat == 4){
                toastr.warning('输入的新密码为6到16位的大小写字母、数字',null,3500);
                return false;
            }else if($scope.checkFormat == 5){
                toastr.warning('确认密码与新密码不一致！',null,3500);
                return false;
            }
            loginService.resetPassword($scope.resetPasswordObj).then(rps => {
                if(rps.status == 200){
                    // let numTime = setInterval(() => {
                    //     if($scope.num == 0){
                            
                        //     clearInterval(numTime);
                        //     return false;
                        // }
                        // $scope.num -= 1;
                    // },1000);
                    $scope.showhide = true;
                    $scope.changeSuccess = true;
                    $scope.changeFail = false;
                    toastr.success('密码重置成功！',null,3000);
                    $timeout(() => {
                        $state.go('authorize.login');
                    },3000);
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                    $scope.showhide = true;
                    $scope.changeFail = true;
                    $scope.failText = rps.errorMessage;
                }
            });
        };
    }
}
ResetpasswordCtrl.$inject = ['$scope', '$state', 'moment','loginService','toastr','$timeout','$interval'];

module.exports = (ngMold) => {
    require.ensure(['../service/login-service'], (require) => {
        let serv = require('../service/login-service')(ngMold);
    }, './login/login-serve');
    ngMold.controller('resetpasswordCtrl', ResetpasswordCtrl);
};