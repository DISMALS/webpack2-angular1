module.exports = function(ngModule){
    // require('./login/login.controller')(ngModule);
    ngModule.controller(['$scope',
        function($scope){
            console.log('首页模块加载了s！');
        }
    ]);
}