let JqGridUi = ($timeout, $cookies, $state) => {
    return {
        restrict: 'ECMA',
        scope: {
            gridOptions: '=',
            gridData: '='
        },
        transclude: true,
        replace: true,
        template: '<table class="dryad-grid-main"></table>',
        link: (scope, ele, attr) => {
            let gridMain = $(ele);
            gridMain.jqGrid(scope.gridOptions);
            for (var i = 0; i <= scope.gridData.length; i++) {
                gridMain.jqGrid('addRowData', i + 1, scope.gridData[i]);
            }
            gridMain.jqGrid('navGrid', '#s3pager', {
                edit: true,
                add: true,
                del: true,
                search: false,
                refresh: false
            });
            gridMain.jqGrid('navButtonAdd', "#s3pager", {
                caption: "Toggle",
                title: "Toggle Search Toolbar",
                buttonicon: 'ui-icon-pin-s',
                　　　　
                onClickButton: function() {　　　　　　
                    mygrid[0].toggleToolbar()　　
                }
            });


        }
    };
}
JqGridUi.$inject = ['$timeout', '$cookies', '$state']

module.exports = (ngMold) => {
    ngMold.directive('dryadUiJqGrid', JqGridUi);
}