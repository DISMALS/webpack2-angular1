module.exports = function(ngModule){
    ngModule.controller(['$scope',
        function($scope){
            console.log('首页模块加载了s！');
        }
    ]);
}