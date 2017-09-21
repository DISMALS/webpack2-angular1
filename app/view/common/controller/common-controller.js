// require('../service/common-service.js');
class CommonCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, commonService) {
        $scope.text = '这是主页的内容！';
        console.log('这是common');
        console.log($rootScope);
        commonService.test().then(function(data) {
            console.log(data);
        })
    }
}

CommonCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'commonService'];

module.exports = (ngMold) => {
    require.ensure(['../service/common-service'], (require) => {
        const service = require('../service/common-service')(ngMold);
    }, 'common-serve');
    ngMold.controller('commonCtrl', CommonCtrl);
}