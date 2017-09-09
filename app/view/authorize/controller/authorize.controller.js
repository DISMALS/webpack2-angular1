module.exports = angular.module('lkApp.authorize').controller('authorizeCtrl', ['$scope', '$state', 'loginAuthorize',
    ($scope, $state, loginAuthorize) => {
        loginAuthorize.test().then((data) => {
            console.log(data);
        });
        $scope.name = '领健信息科技有限公司！'
    }
]);