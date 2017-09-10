module.exports = angular.module('lkApp.home').controller('homeCtrl',['$scope','$state','APP_CONFIG','commonService',
    ($scope,$state,APP_CONFIG,commonService) => {
        $scope.text = '这是主页的内容！';
        $state.go('home.main');
        console.log(APP_CONFIG);
        console.log(commonService);
        commonService.test().then(data => {
            console.log(data);
        });
    }
]).name;