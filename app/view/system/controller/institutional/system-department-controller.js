class SystemDepartmentCtrl {
    constructor($scope, $state, $stateParams, $uibModal,systemService,toastr,APP_CONFIG,$cookies,conmmonService,$q,_) {
        $scope.searchkey = '';
        $scope.relsearchkey = '';
        $scope.departmentList = [];
        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        }
        $scope.searchSelect = [{
            id: 1,
            name: '测试1'
        }, {
            id: 2,
            name: '测试2'
        }, {
            id: 3,
            name: '测试3'
        }];


        let promiseAll = [];
        let dptProperty = conmmonService.getDictPropertyList().then(data => {
            if(data.status == 200){
                $scope.natureSelect = data.data;
            }
        });
        promiseAll.push(dptProperty);


        // 获取科室列表数据
        $scope.getDepartmentListFn = (pageNo,listSize,keyword) => {
            $q.all(promiseAll).then( (rps) => {
                conmmonService.getDepartmentList(pageNo,listSize,keyword).then(data => {
                    if(data.status == 200){
                        _.each(data.data, (item, i) => {
                            item.index = ((pageNo - 1) * 10) + i + 1;
                            let deptPreperty = _.find($scope.natureSelect,(ele) => {return ele.dictItemValue == item.deptProperty;});
                            item.deptPropertyName = (deptPreperty && deptPreperty.dictItemName) || '';
                            let isEnableClassName = item.status == 1?'yes':'no';
                            let isEnableText = item.status == 1 ?'YES':'NO';
                            let btnClassName = item.status == 1?'moveLeft':'moveRight';
                            item.toolbar = `<div>
                                <a class="layui-btn layui-btn-mini grid-edit resourceOperation look" lay-event="edit"  data-title="编辑"></a>
                               
                                <div class="isEnable fl-r look"  data-title="启用/禁用">
				                <div class="isEnableMain">
				                    
				                    <div class="fl-l isEnableBtn `+isEnableClassName+`" lay-event="enable">
				                        <i class="text notext">`+isEnableText+`</i>
				                        <i class="roundBtn `+btnClassName+`"></i>
				                    </div>
				                </div>
				            </div>`
                        })
                        $scope.departmentList = data.data;
                        $scope.pageConfig.pageCount = data.pager.totalCount;
                        $scope.initPageBar($scope.pageConfig.pageCount, true);
                        $scope.$broadcast('dataList',{data:$scope.departmentList});
                    }else{
                        toastr.error(data.errorMessage,null,3000);
                    }
                });
            });
            
        }
        $scope.getDepartmentListFn(1,10);

        //搜索
        $scope.searchKeyword = () => {
        		$scope.relsearchkey = $scope.searchkey;
            $scope.getDepartmentListFn(1,10,$scope.relsearchkey);
            $scope.pagination.goto(1);
//          $scope.searchkey = '';
        };
        $scope.enterFn = (evt) => {
            if(evt.keyCode == 13){
                $scope.searchKeyword();
            }
        };

        //layui table <a class="layui-btn layui-btn-mini" lay-event="detail">查看</a>
        $scope.tableOptions ={
            elem:'#layuiTable',
            // page:{
            //     limit:10,
            //     limits:[10,15,20,25,30]
            // },
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[
                { field:'index',title: '#',width: '9%',align: 'center',unresize:true},
                { field: "deptName", title: '科室名称',width: '20%',  align: 'center',unresize:true},
                { field: "memo", title: '科室描述', width: '38%', align: 'center',unresize:true},
                { field: "deptPropertyName", title: '科室性质', width: '15%', align: 'center',unresize:true},
                { field: "toolbar", title: '操作', align: 'center',unresize:true}
            ]]
        };

        //监听table事件
        layui.table.on('tool(layuiTable)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'del'){ //删除
                $scope.deleteModal(data,obj.del);
            } else if(layEvent === 'edit'){ //编辑
                $scope.editeAdd(data,'EDIT');
            } else if(layEvent === 'enable'){
            		$scope.isDisableFn(data);
            }
        });

        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.departmentList[parseInt(obj.index)];
            $scope.openDetails(row);
        });
        
        //科室是否禁用
        $scope.isDisableFn = (item) => {
            let enableBtn = item .status == 1?false:true;
            let enableTip = item .status == 1?'该科室已禁用！':'该科室已启用！';
            systemService.enableDepartment(enableBtn,item.deptId).then(data => {
                if(data.status == 200){
                    toastr.success(enableTip,null,1500);
                    console.log(item)
                    $scope.getDepartmentListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
                }else{
                    toastr.error(data.errorMessage,null,1500);
                }
            });
        };
        
        //添加或者修改
        $scope.editeAdd = (item, type) => {
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/institutional/add-edit-department.html'),
                controller: 'addEditDepartmentCtrl',
                controllerAs: 'addEditDepartmentCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            action: type,
                            item: item || {}
                        };
                    },
                    addEditDepartmentCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./add-edit-department-controller'], (require) => {
                            const ctrl = require('./add-edit-department-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-department-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                $scope.getDepartmentListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
            });
        };

        
        //删除确认弹窗
        $scope.deleteModal = (item,fn) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../../common/html/delete-modal.html'),
                controller: 'deleteModalCtrl',
                controllerAs: 'deleteModalCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            item: item,
                            content: '删除后不可恢复，确定要删除该选项么？'
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../../common/controller/delete-modal-controller'], (require) => {
                            const ctrl = require('../../../common/controller/delete-modal-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/delete-modal-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                systemService.deleteDepartment(item.deptId).then(data => {
                    if(data.status == 200){
                        fn();
                        $scope.getDepartmentListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                        toastr.success('删除成功！',null,3000);
                    }else{
                        toastr.error(data.errorMessage,null,3000);
                    }
                });
            });
        };

        // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:10,
            currentPage: 1,
            goToPage: '',
            items:[],
            goto: function(pageNum) {
                if ($scope.pageConfig.pageCount > $scope.pageConfig.pageSize) {
                    if (parseInt(pageNum) > $scope.pagination.pageCount) {
                        toastr.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数');
                        $scope.pagination.goToPage = '';
                        return;
                    };
                    $scope.pagination.currentPage = parseInt(pageNum);
                }
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            previousPage: function() {
                $scope.pagination.currentPage--;
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            nextPage: function() {
                $scope.pagination.currentPage++;
                $scope.initPageBar($scope.pageConfig.pageCount);
            }
        };
        $scope.initPageBar = (pageCount, first) => {
            var maxPages = 5;
            var pageNum = $scope.pagination.currentPage;
            var totalPages = $scope.pagination.pageCount = Math.ceil(pageCount / $scope.pageConfig.pageSize);
            if (totalPages > maxPages) {
                var start, end, arr = [];
                if (parseInt(pageNum) <= Math.floor(maxPages / 2 + 1)) {
                    start = 1;
                    end = maxPages;
                } else if (parseInt(pageNum) > totalPages - Math.floor(maxPages / 2)) {
                    start = totalPages - maxPages + 1;
                    end = totalPages;
                } else {
                    start = parseInt(pageNum) - Math.floor(maxPages / 2);
                    end = parseInt(pageNum) + Math.ceil(maxPages / 2 - 1);
                }
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            } else {
                var arr = [];
                for (var i = 1; i <= totalPages; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            };
            if (!first) {
                $scope.pageConfig.pageIndex = parseInt(pageNum);
                // $scope.pageDataFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                $scope.getDepartmentListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
                // $scope.$emit('changePage', { pageIndex: $scope.pageConfig.pageIndex });
            }

        }
        $scope.jumpTo = (evt) => {
            let value = $scope.pagination.goToPage;
            let reg = /\d/g;
            if (evt.keyCode == 13) {
                if (reg.test(value)) {
                    if (value == 0) {
                        toastr.error('请输入大于' + 0 + '的正整数');
                        $scope.pagination.goToPage = '';
                    } else if (value > 0) {
                        $scope.pagination.goto($scope.pagination.goToPage);
                        $scope.pagination.goToPage = '';
                    }
                } else if (value == '') {
                    $scope.pagination.goto(1);
                } else {
                    toastr.error('输入的页数格式不正确，请重新输入！', null, 2000);
                    $scope.pagination.goToPage = '';
                }
            }
        }
        // 分页函数-----------------------------------------------
    }

}
SystemDepartmentCtrl.$inject = ['$scope', '$state', '$stateParams', '$uibModal','systemService','toastr','APP_CONFIG','$cookies','conmmonService','$q','_'];

module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'], (require) => {
        require('../../service/system-service')(ngMold);
    }, './system/system-service');
    ngMold.controller('systemDepartmentCtrl', SystemDepartmentCtrl);
}