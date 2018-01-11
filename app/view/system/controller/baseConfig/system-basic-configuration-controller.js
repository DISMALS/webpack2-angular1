class SystemBasicConfigurationCtrl {
    constructor($scope,$uibModal,baseconfigDrugdictionaryService,toastr,$q,_) {
        $scope.searchkey = '';
        $scope.title = '配置类目';
        $scope.chooiseRowEvt = true;
        $scope.moveDownDisable=false;
        $scope.moveUpDisable=false;
        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 1000
        };

        let permissionArr = [];
        //获取基础配置
        let baseConfig = baseconfigDrugdictionaryService.getBaseConfigList().then(data => {
            if(data.status == 200){
                if(data.data.length > 0){
                    angular.forEach(data.data,(ele,i) => {
                        if(i == 0){
                            ele.active = true;
                        }else{
                            ele.active = false;
                        }
                    });
                }
                $scope.BaseConfigList = data.data || [];
                $scope.chooiseType = $scope.BaseConfigList[0];
            }else{
                toastr.error(data.errorMessage,null,3000);
            }
        });
        permissionArr.push(baseConfig);

        //根据基础配置获取基础配置项列表
        $scope.baseConfigItemBybaseConfig = (pageNo,listSize,keyword) => {
            // $scope.moveDownDisable=false;
            // $scope.moveUpDisable=false;
            let baseId = $scope.chooiseType.baseId;
            baseconfigDrugdictionaryService.getBaseConfigItemList(baseId,pageNo,listSize,keyword).then(data => {
                if(data.status == 200){
                    _.each(data.data, (item, i) => {
                        item.index = i + 1;
                    });
                    $scope.baseConfigItemList = data.data;
                    // console.log($scope.baseConfigItemList)
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:$scope.baseConfigItemList});
                    if($scope.selectedCopy){
                        _.each($scope.baseConfigItemList,(item,index)=>{
                            if(item.itemId==$scope.selectedCopy.itemId){
                                $scope.selected= $scope.baseConfigItemList[index];
                                $scope.selected.num = parseInt(index);
                                $scope.checkMove();
                                $('.dryad-grid').scrollTop($scope.scrollTop);
                            }
                        })
                    }
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };

        //初始化列表数据
        $scope.getbaseConfigItemList = (pageNo,listSize,keyword) => {
            $q.all(permissionArr).then(rps => {
                $scope.baseConfigItemBybaseConfig(pageNo,listSize,keyword);
            });
        };
        $scope.getbaseConfigItemList(1,1000);

        //搜索
        $scope.searchKeyword = () => {
            $scope.baseConfigItemBybaseConfig(1,1000,$scope.searchkey);
            // $scope.searchkey = '';
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
            limit:1000,
            cols:[[
                { field:'index',title: '#',width: '6%',align: 'center',unresize:true},
                { field: "name", title: '名称',width: '75%',  align: 'center',unresize:true},
                {
                    title: '操作', 
                    align: 'center',
                    unresize:true,
                    toolbar:`<div>
                                    <a class="layui-btn layui-btn-mini grid-edit resourceOperation look" lay-event="edit"  data-title="修改"></a>
                                    <a class="layui-btn layui-btn-danger layui-btn-mini grid-delete resourceOperation look" lay-event="del"  data-title="删除"></a></div>`
                }
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
            }
        });
/*

        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.accountList[parseInt(obj.index)];
            // $scope.openDetails(row);
            $scope.view(row);
        });
*/

        //单击选中事件
        $scope.$on('clickRow',(evt,obj) => {
            $scope.scrollTop=$('.dryad-grid').scrollTop();
            // $('.dryad-grid').scrollTop(700);
            let dataList = evt.targetScope.gridOptions.data;
            let index = obj.index;
            $scope.selected = dataList[index];
            $scope.selectedCopy= dataList[index];
            $scope.selected.num = parseInt(index);
            $scope.checkMove();
            $scope.$apply();
        });
        //取消选中的行
        $scope.$on('cancleChooise',(evt,obj) => {
            $scope.selected = null;
            $scope.$apply();
        });

        //校验上移下移
        $scope.checkMove = (flag) => {
            if($scope.selected){
                if($scope.selected.index == $scope.baseConfigItemList.length){
                    $scope.moveDownDisable = false;
                }else{
                    $scope.moveDownDisable = true;
                }
                if($scope.selected.index == 1){
                    $scope.moveUpDisable = false;
                }else{
                    $scope.moveUpDisable = true;
                }
                if($scope.selected.index > 1 && $scope.selected.index < $scope.baseConfigItemList.length){
                    $scope.moveUpDisable = true;
                    $scope.moveDownDisable = true;
                }
            }
        };

        //chooise class
        $scope.chooiseBaseConfig = (index) => {
            $scope.BaseConfigList.forEach(function(element) {
                element.active = false;
            }, this);
            $scope.BaseConfigList[index].active = true;
            $scope.chooiseType = $scope.BaseConfigList[index];
            $scope.pageConfig.pageIndex = 1;
            $scope.pageConfig.pageSize = 1000;
            $scope.searchkey = '';
            $scope.baseConfigItemBybaseConfig(1,1000);
        };

        //move-up
        $scope.moveUpBtn = () => {
            $scope.scrollTop=$('.dryad-grid').scrollTop();
            let upItemId = $scope.selected.itemId;
            let downItemId = $scope.baseConfigItemList[$scope.selected.num - 1].itemId;
            baseconfigDrugdictionaryService.upOrDownConfiguration(upItemId,downItemId).then(rps => {
                if(rps.status == 200){
                    $scope.baseConfigItemBybaseConfig($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.searchkey);
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        
        //move-down
        $scope.moveDownBtn = () => {
            $scope.scrollTop=$('.dryad-grid').scrollTop();
            let upItemId = $scope.baseConfigItemList[$scope.selected.num + 1].itemId;
            let downItemId = $scope.selected.itemId;
            baseconfigDrugdictionaryService.upOrDownConfiguration(upItemId,downItemId).then(rps => {
                if(rps.status == 200){
                    $scope.baseConfigItemBybaseConfig($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.searchkey);
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };

        //添加或者修改
        $scope.editeAdd = (item) => {
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/baseConfig/add-edit-configuration.html'),
                controller: 'addEditConfigurationCtrl',
                controllerAs: 'addEditConfigurationCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: item ? `修改${$scope.chooiseType.name}` : `新增${$scope.chooiseType.name}`,
                            chooiseBase:$scope.chooiseType,
                            item: item || null
                        };
                    },
                    addEditConfigurationCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./add-edit-configuration-controller'], (require) => {
                            const ctrl = require('./add-edit-configuration-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-configuration-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                baseconfigDrugdictionaryService.saveAddOrEditConfigItem(result).then(rps => {
                    if(rps.status == 200){
                        if(item){ //修改
                            toastr.success('基础项目修改成功！',null,3000);
                        }else{ //新建
                            toastr.success('基础项目新建成功！',null,3000);
                        }
                        $scope.baseConfigItemBybaseConfig($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.searchkey);
                    }else{
                        toastr.error(rps.errorMessage,null,3000);
                    }
                });
            });
           
        };
        

        //删除确认弹窗
        $scope.deleteModal = (item) => {
            $('.hidetip').hide();
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
                baseconfigDrugdictionaryService.deleteBaseConfigItem(item.itemId).then(rps => {
                    if(rps.status == 200){
                        if(item){ //删除成功
                            toastr.success('基础项目修改成功！',null,3000);
                        }
                        $scope.baseConfigItemBybaseConfig($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.searchkey);
                    }else{
                        toastr.error(rps.errorMessage,null,3000);
                    }
                });
            });
        };

        // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:1000,
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
                $scope.baseConfigItemBybaseConfig($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.searchkey);
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
SystemBasicConfigurationCtrl.$inject = ['$scope','$uibModal','baseconfigDrugdictionaryService','toastr','$q','_'];

module.exports = (ngMold) => {
    require.ensure(['../../service/baseconfig-drugdictionary-services'],(require) => {
        require('../../service/baseconfig-drugdictionary-services')(ngMold);
    },'./system/baseconfig-drugdictionary-services');
    ngMold.controller('systemBasicConfigurationCtrl', SystemBasicConfigurationCtrl);
}