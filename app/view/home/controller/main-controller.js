module.exports = angular.module('lkApp.home').controller('homeMainCtrl', ['$scope', '$state', ($scope, $state) => {
    $scope.name = 'xiaohao';
    $scope.gostate = () => {
        $state.go('authorize.login');
    }
}]).name;