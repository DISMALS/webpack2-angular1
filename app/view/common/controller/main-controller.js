// require('../service/common-service.js');
class MainCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService,$uibModal) {
        $scope.text = '这是系统公共部分的内容！';
        $scope.practiceimg = APP_CONFIG.API_HOST + '/images/practice.png';
        $scope.userimg = APP_CONFIG.API_HOST + '/images/user-icon.png';
        $scope.search = {
            searchKey:null
        };
        $scope.searchList = [
            {
                name:'wangyong',
                sex:'man'
            },{
                name:'xiaohao',
                sex:'man'
            },{
                name:'dayong',
                sex:'man'
            },{
                name:'xiaoyong',
                sex:'man'
            }
        ];
        console.log('这是common');
        console.log($uibModal);
        mainService.test().then(function(data) {
            console.log(data);
        });

    }
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService','$uibModal'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, 'main-serve');
    ngMold.controller('mainCtrl', MainCtrl);
}