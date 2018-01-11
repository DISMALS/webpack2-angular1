class EditPasswordCtrl {
    constructor($scope, items, $uibModalInstance,$cookies,mainService,toastr) {
        $scope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
        $scope.title = "修改密码";
        if(!$scope.user){
            $state.go('authorize.login');
            return false;
        }
        $scope.editPasswordObj = {
            userCode:$scope.user.username
        };
        //保存
        $scope.save = () => {
            let errNum = 0;
            let checkFormat = 0;
            let checkErr = ['oldPassword','newPassword','confirmPassword'];
            checkErr.forEach(ele => {
                if(!$scope.editPasswordObj[ele]){
                    errNum += 1;
                    return false;
                }else if(ele == 'oldPassword'){
                    let reg = /^[A-Za-z0-9]{6,16}$/i;
                    if(!reg.test($scope.editPasswordObj['oldPassword'])){
                        checkFormat = 1;
                    }
                    return false;
                }else if(ele == 'newPassword'){
                    let reg = /^[A-Za-z0-9]{6,16}$/i;
                    if(!reg.test($scope.editPasswordObj['oldPassword'])){
                        checkFormat = 2;
                    }
                    return false;
                }else if(ele == 'confirmPassword'){
                    if($scope.editPasswordObj['newPassword'] != $scope.editPasswordObj['confirmPassword']){
                        checkFormat = 3;
                    }
                    return false;
                }
            });
            if(errNum > 0){
                toastr.warning('请完善必填项目！',null,3000);
                return false;
            }
            if(checkFormat == 1 || checkFormat == 2){
                toastr.warning('当前密码格式不正确，请输入6到16位大小写字母、数字！',null,3000);
                return false;
            }else if(checkFormat == 2){
                toastr.warning('新密码格式不正确，请输入6到16位大小写字母、数字！',null,3000);
                return false;
            }else if(checkFormat == 3){
                toastr.warning('确认密码与新密码不一致！',null,3000);
                return false;
            }
            mainService.editUserPassword($scope.editPasswordObj).then(rps => {
                    if(rps.status == 200){
                        toastr.success('密码修改成功！',null,3000);
                        $uibModalInstance.dismiss('cancle');
                    }else{
                        toastr.error(rps.errorMessage,null,3000);
                    }
                });
//          $uibModalInstance.close($scope.editPasswordObj);
        };
        //关闭
        $scope.close = () => {
            $uibModalInstance.dismiss('cancle');
        };
    };
}
EditPasswordCtrl.$inject = ['$scope', 'items', '$uibModalInstance','$cookies','mainService','toastr']
module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        require('../service/main-service')(ngMold);
    }, './common/main-serve');
    ngMold.controller('editPasswordCtrl', EditPasswordCtrl);
}