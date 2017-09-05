module.exports = angular.module('lkApp.authorize').controller('loginCtrl',['$scope','$state',($scope,$state) => {
    $scope.name = 'wangyong';
    $scope.gostate = () => {
        $state.go('home');
    }
}]).name;