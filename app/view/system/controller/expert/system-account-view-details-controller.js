class SystemExpertAccountViewDetailsCtrl {
    constructor($scope, $stateParams,$state,expertService) {
        $scope.id = $stateParams.id;
        //初始化数据
        $scope.initData = () => {
            expertService.viewExpertEmployeeDetails($scope.id).then(rps => {
                if(rps.status == 200){
                    $scope.info = rps.data;
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.initData();

        //edit
        $scope.edit = () => {
            $state.go('dryad.system.experts-account.details', { id: $scope.id,pageindex: $stateParams.pageindex,searchkey: $stateParams.searchkey });
        };

        //close
        $scope.close = () => {
            $state.go('dryad.system.experts-account.list',{pageindex: $stateParams.pageindex,searchkey: $stateParams.searchkey});
        };


    }
}
SystemExpertAccountViewDetailsCtrl.$inject = ['$scope', '$stateParams','$state','expertService'];
module.exports = (ngMold) => {
    require.ensure(['../../service/expert-services'],(require) => {
        require('../../service/expert-services')(ngMold);
    },'./system/expert-services');
    ngMold.controller('systemExpertAccountViewDetailsCtrl', SystemExpertAccountViewDetailsCtrl);
}