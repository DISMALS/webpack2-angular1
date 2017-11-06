class SystemEmployeeDetailsCtrl {
    constructor($scope, $stateParams,$state) {
        $scope.id = $stateParams.id;
        console.log($stateParams);
        $scope.logoSrc = `https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2531256174,2615853699&fm=11&gp=0.jpg`;
        $scope.serviceFunc = (files) => {
            console.log(files);
        }
        $scope.departmentList = [
            {
                id:1,
                name:'全科'
            },{
                id:2,
                name:'眼科'
            }
        ];
        $scope.roleList = [
            {
                id:1,
                name:'主治医生'
            },{
                id:2,
                name:'药房主管'
            }
        ];

        $scope.ewm = `https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3368751424,3239877494&fm=27&gp=0.jpg`;
        
        //print
        $scope.print = () => {
            window.print('ddd');
        };

        //download
        $scope.download = () => {
            window.open($scope.ewm);
        };

        //save
        $scope.save = () => {
            $state.go('dryad.system.institutional-management.list.employee');
        };

        //cancel
        $scope.cancel = () => {
            $state.go('dryad.system.institutional-management.list.employee');
        };


    }
}
SystemEmployeeDetailsCtrl.$inject = ['$scope', '$stateParams','$state'];
module.exports = (ngMold) => {
    ngMold.controller('systemEmployeeDetailsCtrl', SystemEmployeeDetailsCtrl);
}