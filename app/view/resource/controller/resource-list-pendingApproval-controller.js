/**
 * Created by wangmu on 17/11/7.
 */
class ResourceListPendingApprovalCtrl {
    constructor($scope, $state, ResourceService, _, $uibModal) {
        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        }
        $scope.screenList = [];
        $scope.relsearchkey = '';

        $scope.changeResource = () => { //选择拉下搜索
        		$scope.relsearchkey = $scope.searchList.queryKeyword ? $scope.searchList.queryKeyword : '';
        		$scope.pagination.currentPage = 1;
            $scope.init(1,10);
        }
        $scope.init = (pageNo, listSize) => {
            let obj = {
                pageNo: pageNo,
                resourceType: 0,
                listSize: listSize,
                keyword: $scope.relsearchkey,
                resourceClassify:$scope.searchList.resourceClassify ? $scope.searchList.resourceClassify : 0,
                resourceProperty: $scope.searchList.resourceProperty ? $scope.searchList.resourceProperty : 0,
            };
            ResourceService.getResourceListApproval(obj).then((data) => {
                if (data.status==200) {
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    _.each(data.data, (item,i) => {
                    		item.index = ((pageNo - 1) * 10) + i + 1;
                    })
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:data.data? data.data : []});
                }else{
                    toastr.error(data.errorMessage,null,1500);
                    return;
                }
            })
        }
        $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
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
                $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
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
        $scope.goPreview = (value, type) => { //预览资源 - 审核资源
        		$('.hidetip').hide();
            if (value.resourceType == '视频') {
                return $scope.goVideoPreview(value.resourceId, type);
            }
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/resource-previewText.html'),
                controller: 'resourcePreviewTextCtrl',
                controllerAs: 'resourcePreviewTextVm',
                size: 'publish-lg',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            type: type,
                            resourceId: value.resourceId
                        };
                    },
                    resourcePreviewTextCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./resource-previewText-controller'], (require) => {
                            const ctrl = require('./resource-previewText-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './resource/resource-previewText-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                $scope.init( 1, 10 );
            });
        }
        $scope.goEdit = (value) => { //编辑资源
        		$('.hidetip').hide();
            let activeTab = value.resourceType == '视频' ? 2 : 1;
            $state.go('dryad.resource.publish', {activeTab: activeTab, operation: 'edit', resourceId: value.resourceId});
        }
        $scope.goVideoPreview = (resourceId, type) => { //视频预览
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/resource-previewVideo.html'),
                controller: 'resourcePreviewVideoCtrl',
                controllerAs: 'resourcePreviewVideoVm',
                size: 'publish-lg',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            type: type,
                            resourceId: resourceId
                        };
                    },
                    resourcePreviewVideoCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./resource-previewVideo-controller'], (require) => {
                            const ctrl = require('./resource-previewVideo-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './resource-previewVideo-controller');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                $scope.init( 1, 10 );
            });
        }
        $scope.tableOptions = {
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[
                { field: "index", title: '#', type: "text", width: '6%', align: 'center' },
                { field: "title", title: '资源标题', type: "text", width: '', align: 'center' },
                { field: "resourceClassify", title: '分类', type: "text", width: '11%', align: 'center' },
                { field: "resourceType", title: '类型', type: "text",  width: '11%', align: 'center' },
                { field: "resourceProperty", title: '性质', type: "text", width: '11%',  align: 'center' },
                { field: "author", title: '作者', type: "text", width: '9%', align: 'center' },
                { field: "uploadDate", title: '提交日期', type: "text", width: '12%', align: 'center' },
                { field: "operation", title: '操作', width: '13%', align: 'center',
                    toolbar:`<div>
                                    <a class="layui-btn layui-btn-mini resourceOperation grid-preview look" lay-event="goPreview" data-title="预览" ></a>
<!--
                                    <a class="layui-btn layui-btn-mini resourceOperation grid-edit look" lay-event="goEdit" data-title="编辑" ></a>
-->
                                    <a class="layui-btn layui-btn-mini resourceOperation grid-approval look" lay-event="approval" data-title="审核" ></a>
                             </div>`,
                }
            ]]
        };

        layui.table.on('tool(layuiTable)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'goPreview'){
                $scope.goPreview(data, 'preview');
            }
            if(layEvent === 'goEdit'){
                $scope.goEdit(data);
            }
            if(layEvent === 'approval'){
                $scope.goPreview(data, 'approval');
            }
        });
    }
}
ResourceListPendingApprovalCtrl.$inject = ['$scope', '$state', 'ResourceService', '_', '$uibModal'];

module.exports = (ngMold) => {
    ngMold.controller('resourceListPendingApprovalCtrl', ResourceListPendingApprovalCtrl);
}