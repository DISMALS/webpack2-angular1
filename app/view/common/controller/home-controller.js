module.exports = angular.module('lkApp.home').controller('homeCtrl',['$scope','$state','APP_CONFIG',($scope,$state,APP_CONFIG) => {
    $scope.text = '这是主页的内容！';
    $state.go('home.main');
    console.log(APP_CONFIG);
}]).name;