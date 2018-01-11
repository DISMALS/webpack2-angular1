class SystemExpertAccountDetailsCtrl {
    constructor($scope, $stateParams,$state,conmmonService,expertService,toastr) {
        $scope.id = $stateParams.id;
        $scope.pageindex = $stateParams.pageindex;
        $scope.searchkey = $stateParams.searchkey;
        $scope.title = $scope.id ? '修改专家账号' : '新增专家账号';
        $scope.serviceFunc = (files) => {
            console.log(files);
        }
        $scope.expertEmployeeObj = {};
        //选择性别
        $scope.isBoy = true;
        $scope.chooiseSex = () => {
            $scope.isBoy = !$scope.isBoy;
        };

        //获取科室列表
        $scope.getRegionalCenterList = (pageNo,listSize,keyword) => {
            expertService.getRegionalCenter(pageNo,listSize,keyword).then(data => {
                if(data.status == 200){
                    $scope.regionalCenterList = data.data;
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };

        //获取角色列表
        $scope.getRoleList = (pageNo,listSize,keyword) => {
            expertService.getExpertRoleList(pageNo,listSize,keyword).then(data => {
                if(data.status == 200){
                    $scope.roleList = data.data;
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };

        //初始化数据
        $scope.initData = () => {
            $scope.getRegionalCenterList(1,1000);
            $scope.getRoleList(1,1000);
            
            if(!$scope.id){return false;}
            expertService.viewExpertEmployeeDetails($scope.id).then(rps => {
                if(rps.status == 200){
                    $scope.expertEmployeeObj = rps.data;
                    $scope.expertEmployeeObj.roleId = $scope.expertEmployeeObj.roleId[0];
                    $scope.isBoy = $scope.expertEmployeeObj.sex == 'M' ? true : false;
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.initData();


        //save
        $scope.save = () => {
            let newObj = angular.copy($scope.expertEmployeeObj);
            newObj.sex = $scope.isBoy ? 'M' : 'F';
            newObj.birthday = moment(newObj.birthday).format('YYYY-MM-DD');
            
            expertService.saveAddOrEditExpertEmployee(newObj).then(rps => {
                if(rps.status == 200){
                    if($scope.id){
                        toastr.success('账号修改成功！',null,3000);
                    }else{
                        toastr.success('新建账号成功！',null,3000);
                    }
                    $state.go('dryad.system.experts-account.list',{pageindex:$scope.pageindex,searchkey:$scope.searchkey});
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };

        //cancel
        $scope.cancel = () => {
            $state.go('dryad.system.experts-account.list',{pageindex:$scope.pageindex,searchkey:$scope.searchkey});
        };


    }
}
SystemExpertAccountDetailsCtrl.$inject = ['$scope', '$stateParams','$state','conmmonService','expertService','toastr'];
module.exports = (ngMold) => {
    require.ensure(['../../service/expert-services'],(require) => {
        require('../../service/expert-services')(ngMold);
    },'./system/expert-services');
    ngMold.controller('systemExpertAccountDetailsCtrl', SystemExpertAccountDetailsCtrl);
}