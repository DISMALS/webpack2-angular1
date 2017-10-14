let TabUi = ($timeout) => {
    return {
        restrict: 'ECMA',
        scope: {
            tabList: '='
        },
        transclude: true,
        replace: true,
        templateUrl: 'app/view/common/html/tab-ui.html',
        controller: ['$scope', ($scope) => {
            // this.tabList = $scope.tabList;
        }],
        controllerAs: 'tab',
        link: (scope, ele, attr) => {
            console.log(scope);
        }
    }
}
TabUi.$inject = ['$timeout'];

module.exports = (ngMold) => {
    ngMold.directive('tabUi', TabUi);
}