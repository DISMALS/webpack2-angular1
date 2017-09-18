// require('../service/common-service.js');
class CommonCtrl {
    constructor($rootScope,$scope,$state,APP_CONFIG,commonService){
        $scope.text = '这是主页的内容！';
        console.log(APP_CONFIG);
        console.log($rootScope);
        commonService.test().then(function(data){
            console.log(data);
        })
    }
}

module.exports = (ngMod) => {
    ngMod.controller('commonCtrl', CommonCtrl).name;
         //.factory('commonService',require('../service/common-service.js')).name;
}
    
