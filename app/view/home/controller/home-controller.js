class homeMainCtrl{
    constructor($scope, $state){
        $scope.name = 'xiaohao';
        $scope.gostate = () => {
            $state.go('login');
        };
        $scope.goPatients = () => {
            $state.go('sys.common.patients');
        }
    }
}



module.exports = (ngModule) => {
    ngModule.controller('homeMainCtrl',homeMainCtrl).name;
}