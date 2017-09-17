module.exports = angular.module('lkApp.login').controller('loginCtrl',['$scope','$state',($scope,$state) => {
    $scope.name = 'wangyong';
    $scope.gostate = () => {
        $state.go('sys.common.home');
    }
}]).name;