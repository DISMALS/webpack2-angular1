require('../../../../../images/default-logo.png');
class SystemAccountViewDetailsCtrl {
    constructor($scope, $stateParams,$state,operationService) {
        $scope.id = $stateParams.id;
        //初始化数据
        $scope.initData = () => {
            //获取账号详情
            if(!$scope.id){return false};
            operationService.getOperationAccountDeails($scope.id).then(rps => {
                if(rps.status == 200){
                    $scope.accountObj = rps.data;
                    if(!$scope.accountObj.headPicUrl){
                        $scope.accountObj.headPicUrl=`/images/default-logo.png`;
                    }

                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.initData();

        //edit
        $scope.edit = () => {
            $state.go('dryad.system.operating-account.details', { id: $scope.id,pageindex: $stateParams.pageindex,searchkey:$stateParams.searchkey});
        };

        //close
        $scope.close = () => {
            $state.go('dryad.system.operating-account.list',{pageindex: $stateParams.pageindex,searchkey:$stateParams.searchkey});
        };


    }
}
SystemAccountViewDetailsCtrl.$inject = ['$scope', '$stateParams','$state','operationService'];
module.exports = (ngMold) => {
    require.ensure(['../../service/operation-services'],(require) => {
        require('../../service/operation-services')(ngMold);
    },'./system/operation-services');
    ngMold.controller('systemAccountViewDetailsCtrl', SystemAccountViewDetailsCtrl);
}