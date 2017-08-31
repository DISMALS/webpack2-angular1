module.exports = function(ngModule){
    ngModule.controller('loginCtrl',['$rootScope','$scope',function($rootScope,$scope){
        $scope.name = 'dd';
        console.log($rootScope);
    }]);
}