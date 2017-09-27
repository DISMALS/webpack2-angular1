// require('../service/common-service.js');
class MainCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService) {
        $scope.text = '这是主页的内容！';
        console.log('这是common');
        console.log($rootScope);
        mainService.test().then(function(data) {
            console.log(data);
        })
    }
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, 'main-serve');
    ngMold.controller('mainCtrl', MainCtrl);
}