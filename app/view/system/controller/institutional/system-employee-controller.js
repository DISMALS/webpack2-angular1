class SystemEmployeeCtrl {
    constructor($scope, $state, $stateParams, $uibModal,systemService,_,toastr) {
        $scope.searchkey = $stateParams.searchkey?$stateParams.searchkey:'';
        $scope.relsearchkey = $stateParams.searchkey?$stateParams.searchkey:'';
        //pageConfig
        $scope.initindex = $stateParams.pageindex?$stateParams.pageindex:1;
        $scope.initsearchkey = $stateParams.searchkey?$stateParams.searchkey:'';
        $scope.pageConfig = {
            pageIndex: $scope.initindex,
            pageSize: 10
        }

        // 获取员工列表数据
        $scope.getEmployeeListFn = (pageNo,listSize,keyword) => {
            systemService.getEmployeeList(pageNo,listSize,keyword).then(data => {
                if(data.status == 200){
                    _.each(data.data, (item, i) => {
                        item.index = ((pageNo - 1) * 10) + i + 1;
                        let isEnableClassName = item.status == 1?'yes':'no';
                        let isEnableText = item.status == 1?'YES':'NO';
                        let btnClassName = item.status == 1?'moveLeft':'moveRight';
                        item.toolbar = `<div><a class="layui-btn layui-btn-mini grid-preview resourceOperation fl-l look" lay-event="detail"  data-title="查看"></a>
                                    <a class="layui-btn layui-btn-mini grid-edit resourceOperation mg-l-10 fl-l mg-l10 look" lay-event="edit"  data-title="修改" ></a>
                                     <div class="isEnable fl-l mg-l10 wid-60 look"    data-title="启用/禁用">
				                <div class="isEnableMain wid-75" >
				                    <div class="fl-l isEnableBtn `+isEnableClassName+`" lay-event="enable">
				                        <i class="text notext">`+isEnableText+`</i>
				                        <i class="roundBtn `+btnClassName+`"></i>
				                    </div>
				                </div></div>`;
                    });
                    $scope.employeeList = data.data;
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:$scope.employeeList});
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };
        
        $scope.getEmployeeListFn($scope.initindex,10,$scope.initsearchkey);

        //搜索
        $scope.searchKeyword = () => {
            // $scope.getEmployeeListFn(1,10,$scope.searchkey);
            $scope.relsearchkey = $scope.searchkey;
            $scope.pagination.goto(1);
        };
        $scope.enterFn = (evt) => {
            if(evt.keyCode == 13){
                $scope.searchKeyword();
            }
        };

        //layui table <a class="layui-btn layui-btn-mini" lay-event="detail">查看</a>
        $scope.tableOptions ={
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[
                { field:'index',title: '#',width: '6%',align: 'center',unresize:true},
                { field: "name", title: '姓名',width: '15%',  align: 'center',unresize:true},
                { field: "sex", title: '性别', width: '8%', align: 'center',unresize:true},
                { field: "age", title: '年龄', width: '10%', align: 'center',unresize:true},
                { field: "deptName", title: '科室', width: '15%', align: 'center',unresize:true},
                { field: "titlesDesc", title: '职称', width: '15%', align: 'center',unresize:true},
                { field: "statusDesc", title: '在职状态', width: '13%', align: 'center',unresize:true},
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
            		$('.hidetip').hide();
                $scope.editeAdd(data,'EDIT');
            }else if(layEvent === 'detail'){
            		$('.hidetip').hide();
                $scope.view(data);
            }else if(layEvent === 'enable'){
                $scope.isDisableFn(data);
            }
        });
        
        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.departmentList[parseInt(obj.index)];
            $scope.openDetails(row);
        });
 		//员工是否禁用
        $scope.isDisableFn = (item) => {
        	let enableBtn = item.status == 1?false:true;
        	let enableTip = item .status == 1?'该员工已禁用！':'该员工已启用！';
            systemService.enableEmployee(enableBtn,item.employeeId).then(data => {
                if(data.status == 200){
                    toastr.success(enableTip,null,1500);
                    $scope.getEmployeeListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
                }else{
                    toastr.error(data.errorMessage,null,1500);
                }
            });
        };
        //添加或者修改
        $scope.editeAdd = (item, type) => {
        		$('.hidetip').hide();
            if(type == 'EDIT'){
                $state.go('dryad.system.institutional-management.details', { id: item.employeeId,pageindex: $scope.pageConfig.pageIndex,searchkey: $scope.relsearchkey});
            }else{
                $state.go('dryad.system.institutional-management.details');
            }
           
        };

        //查看
        $scope.view = (item) => {
        		$('.hidetip').hide();
            $state.go('dryad.system.institutional-management.view', { id: item.employeeId,pageindex: $scope.pageConfig.pageIndex,searchkey: $scope.relsearchkey });
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
                systemService.deleteDoctor(item.employeeId).then(rps => {
                    if(rps.status == 200){

                        toastr.success('成功删除员工！',null,1500);
                        $scope.getEmployeeListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                    }else{
                        toastr.error(rps.errorMessage,null,1500)
                    }
                });
                fn();
            });
        };

        // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:10,
            currentPage: $scope.initindex,
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
                $scope.getEmployeeListFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
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
SystemEmployeeCtrl.$inject = ['$scope', '$state', '$stateParams', '$uibModal','systemService','_','toastr'];

module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'], (require) => {
        require('../../service/system-service')(ngMold);
    }, './system/system-service');
    ngMold.controller('systemEmployeeCtrl', SystemEmployeeCtrl);
}