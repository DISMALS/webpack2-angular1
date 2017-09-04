module.exports = angular.module('lkApp.home').controller('homeCtrl',['$scope','$state',($scope,$state) => {
    $scope.text = '这是主页的内容！';
    $state.go('home.main');
}]).name;