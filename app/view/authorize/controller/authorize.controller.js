module.exports = angular.module('lkApp.authorize').controller('authorizeCtrl', ['$rootScope','$scope', '$state', 'loginAuthorize',
    ($rootScope,$scope, $state, loginAuthorize) => {
        console.log($rootScope);
        loginAuthorize.test().then((data) => {
            console.log(data);
        });
        $scope.name = '领健信息科技有限公司！'
    }
]);