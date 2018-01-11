class SystemDrugDictionaryCtrl {
    constructor($scope,$uibModal,baseconfigDrugdictionaryService,toastr,$q,_) {
        $scope.searchkey = '';
        $scope.relsearchkey = '';
        $scope.title = '药品分类';

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        };

        let permissionArr = [];
        //获取药品分类
        let drugType = baseconfigDrugdictionaryService.getDrugTypeList().then(data => {
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
                $scope.drugClass = data.data || [];
                $scope.chooiseType = $scope.drugClass[0];
            }else{
                toastr.error(data.errorMessage,null,3000);
            }
        });
        permissionArr.push(drugType);

        //根据药品类型获取药品列表
        $scope.drugListByType = (pageNo,listSize,keyword) => {
            let categoryId = $scope.chooiseType.categoryId;
            baseconfigDrugdictionaryService.getDrugListByDrugType(categoryId,pageNo,listSize,keyword).then(data => {
                if(data.status == 200){
                    _.each(data.data, (item, i) => {
                        item.index = ((pageNo - 1) * 10) + i + 1;
                    });
                    $scope.drugList = data.data;
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:$scope.drugList});
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };

        //初始化列表数据
        $scope.getDrugDictionaryList = (pageNo,listSize,keyword) => {
            $q.all(permissionArr).then(rps => {
                $scope.drugListByType(pageNo,listSize,keyword);
            });
        };
        $scope.getDrugDictionaryList(1,10);

        //搜索
        $scope.searchKeyword = () => {
        		$scope.relsearchkey = $scope.searchkey;
            $scope.drugListByType(1,10,$scope.searchkey);
            $scope.pagination.goto(1);
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
            cols:[[
                { field:'index',title: '#',width: '6%',align: 'center',unresize:true},
                { field: "drugName", title: '名称',width: '45%',  align: 'center',unresize:true},
                { field: "dosageDesc", title: '剂型', width: '15%', align: 'center',unresize:true},
                { field: "unit", title: '规格', width: '10%', align: 'center',unresize:true},
                {
                    title: '操作', 
                    align: 'center',
                    unresize:true,
                    toolbar:`<div><a class="layui-btn layui-btn-mini grid-preview resourceOperation look" lay-event="detail"  data-title="查看"></a>
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
            }else if(layEvent === 'detail'){
                $scope.view(data);
            }
        });
        
/*        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.accountList[parseInt(obj.index)];
            // $scope.openDetails(row);
            $scope.view(row);
        });*/

        //chooise class
        $scope.chooiseBaseConfig = (index) => {
            $scope.drugClass.forEach(function(element) {
                element.active = false;
            }, this);
            $scope.drugClass[index].active = true;
            $scope.chooiseType = $scope.drugClass[index];
            $scope.pageConfig.pageIndex = 1;
            $scope.pageConfig.pageSize = 10;
            $scope.searchkey = '';
            $scope.relsearchkey = '';
            $scope.pagination.goto(1);
        };

        //exports
        $scope.exportsBtn = () => {
            console.log('导出');
        };
        
        //imports
        $scope.importsBtn = () => {
            console.log('导入');
        };

        //添加或者修改
        $scope.editeAdd = (item) => {
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/drugDictionary/add-edit-drugdictionary.html'),
                controller: 'addEditDrugdictionaryCtrl',
                controllerAs: 'addEditDrugdictionaryCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: item ? '修改药品' : '新增药品',
                            drugClass:$scope.drugClass,
                            item: item || {}
                        };
                    },
                    addEditDrugdictionaryCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./add-edit-drugdictionary-controller'], (require) => {
                            const ctrl = require('./add-edit-drugdictionary-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-drugdictionary-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                baseconfigDrugdictionaryService.saveAddOrEditDrug(result).then(rps => {
                     if(rps.status == 200){
                        if(item){
                            toastr.success('药品修改成功！',null,3000);
                        }else{
                            toastr.success('新增药品成功！',null,3000);
                        }
                        $scope.drugListByType($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
                    }else{
                        toastr.error(rps.errorMessage,null,3000);
                    }
                });
            });
           
        };

        //查看
        $scope.view = (item) => {
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/drugDictionary/view-drugdictionary.html'),
                controller: 'viewDrugdictionaryCtrl',
                controllerAs: 'viewDrugdictionaryCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: item ? '修改区域中心' : '新增区域中心',
                            item: item || {},
                            parentScope:$scope
                        };
                    },
                    viewDrugdictionaryCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./view-drugdictionary-controller'], (require) => {
                            const ctrl = require('./view-drugdictionary-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/view-drugdictionary-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
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
                baseconfigDrugdictionaryService.deleteDrug(item.detailId).then(rps => {
                    if(rps.status == 200){
                        toastr.success('药品删除成功！',null,3000);
                        $scope.searchkey = '';
                        $scope.drugListByType($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
                    }else{
                        toastr.error(rps.errorMessage,null,3000);
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
                $scope.drugListByType($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.relsearchkey);
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
SystemDrugDictionaryCtrl.$inject = ['$scope', '$uibModal','baseconfigDrugdictionaryService','toastr','$q','_'];

module.exports = (ngMold) => {
    require.ensure(['../../service/baseconfig-drugdictionary-services'],(require) => {
        require('../../service/baseconfig-drugdictionary-services')(ngMold);
    },'./system/baseconfig-drugdictionary-services');
    ngMold.controller('systemDrugDictionaryCtrl', SystemDrugDictionaryCtrl);
}