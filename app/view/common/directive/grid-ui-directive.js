let GridUi = ($timeout, $cookies, $state) => {
    return {
        restrict: 'ECMA',
        scope: {
            gridOptions: '='
        },
        transclude: true,
        replace: true,
        template: '<div class="dryad-grid-main"></div>',
        link: (scope, ele, attr) => {
            let gridMain = $(ele);
            gridMain.jsGrid(scope.gridOptions);
        }
    };
}
GridUi.$inject = ['$timeout', '$cookies', '$state']

module.exports = (ngMold) => {
    ngMold.directive('dryadUiGrid', GridUi);
}