// import '../../../../node_modules/layui-src/dist/layui.all.js'; //layui
import '../../../common/src/layui-lite.min.js';
let LayuiTableUi = ($timeout, $cookies, $state,_) => {
    return {
        restrict: 'ECMA',
        scope: {
            gridOptions: '=',
            gridData: '=',
            chooiseRow:'=',
            lastClickRowIndex:'='
        },
        transclude: true,
        replace: true,
        template: '<table id="layuiTable" lay-filter="layuiTable"></table>',
        link: (scope, ele, attr) => {
            scope.num = 0;
            let table = layui.table;
            let tableInstance;
            scope.$on('dataList',(evt,obj) => {
                let pages = obj.page;
                scope.gridOptions.id = 'layuiTable';
                scope.gridOptions.data = obj.data;
                if(scope.num == 1){
                    tableInstance.reload(scope.gridOptions);
                }else{
                    tableInstance = table.render(scope.gridOptions);
                    scope.num += 1;
                }
                
                //行双击事件
                $('.layui-table-body tr').dblclick((evt) => {
                    let currentTarget = evt.currentTarget;
                    let index = $(currentTarget).attr('data-index');
                    scope.$emit('dblclickRow',{index});
                });
                if(scope.lastClickRowIndex){
                    _.each(scope.gridOptions.data,(item,index)=>{
                        if(item.itemId==scope.lastClickRowIndex.itemId){
                            $('.layui-table-body tr:eq('+index+')').addClass('chooise-row')
                        }
                    })
                }
                //行单击选中事件
                $('.layui-table-body tr').click((evt) => {
                    if(scope.chooiseRow){
                        let currentTarget = evt.currentTarget;
                        // console.log(currentTarget)
                        $(currentTarget).siblings('tr').removeClass('chooise-row');
                        let index = $(currentTarget).attr('data-index');
                        if($(currentTarget).hasClass('chooise-row')){
                            $(currentTarget).removeClass('chooise-row');
                            scope.$emit('cancleChooise',{index});
                        }else{
                            $(currentTarget).addClass('chooise-row');
                            scope.$emit('clickRow',{index});
                        }
                    }
                });
            });

            // window.onresize = (event) => {
            //     console.log(table);
            //     console.log(tableInstance);
            //     if(table && _.isFunction(table.reload)){
            //         table.reload('layuiTable',scope.gridOptions);
            //     }
            // }
        }
    };
}
LayuiTableUi.$inject = ['$timeout', '$cookies', '$state','_']

module.exports = (ngMold) => {
    ngMold.directive('layuiTableUi', LayuiTableUi);
}