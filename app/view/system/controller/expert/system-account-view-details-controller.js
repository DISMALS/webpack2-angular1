class SystemExpertAccountViewDetailsCtrl {
    constructor($scope, $stateParams,$state) {
        $scope.id = $stateParams.id;
        console.log($stateParams);
        $scope.info = {
            name:'xiaohao',
            sex:'男',
            birth:'1993-12-07',
            phon:'15138991341',
            email:'1139730841@qq.com',
            work:'院长',
            information:'就是俩字吊炸天！',
            like:'你会的我也会，你不会的我也会！',
            department:'全科',
            role:'专家',
            accountNumber:'wangminghao',
            password:'123456',
            status:'在职'
        };
        $scope.logoSrc = `https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2531256174,2615853699&fm=11&gp=0.jpg`;

        $scope.ewm = `https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3368751424,3239877494&fm=27&gp=0.jpg`;
        
        //print
        $scope.print = () => {
            window.print('ddd');
        };

        //download
        $scope.download = () => {
            window.open($scope.ewm);
        };

        //edit
        $scope.edit = () => {
            $state.go('dryad.system.experts-account.details', { id: $scope.id });
        };

        //close
        $scope.close = () => {
            $state.go('dryad.system.experts-account.list');
        };


    }
}
SystemExpertAccountViewDetailsCtrl.$inject = ['$scope', '$stateParams','$state'];
module.exports = (ngMold) => {
    ngMold.controller('systemExpertAccountViewDetailsCtrl', SystemExpertAccountViewDetailsCtrl);
}