/**
 * Created by wangmu on 17/11/7.
 */
class ResourceListUncommittedCtrl {
    constructor($scope, ResourceService, $uibModal, $state, _, toastr,$timeout) {
        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        }
        $scope.relsearchkey = '';

        $scope.changeResource = () => { //选择拉下搜索
        		$scope.relsearchkey = $scope.searchList.queryKeyword ? $scope.searchList.queryKeyword : '';
        		$scope.pagination.currentPage = 1;
            $scope.init(1,10);
        }
        $scope.init = (pageNo, listSize) => {
            let obj = {
                pageNo: pageNo,
                listSize: listSize,
                keyword: $scope.relsearchkey,
                resourceType: $scope.searchList.resourceType ? $scope.searchList.resourceType : 0,
                resourceClassify:$scope.searchList.resourceClassify ? $scope.searchList.resourceClassify : 0,
                resourceProperty: $scope.searchList.resourceProperty ? $scope.searchList.resourceProperty : 0,
            };
            ResourceService.getResourceListUncommitted(obj).then((data) => {
                if (data.status==200) {
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    _.each(data.data, (item,i) => {
                    		item.index = ((pageNo - 1) * 10) + i + 1;
                        if ( item.statusDesc === '已退回' ) {
                            item.approveMemo = item.approveMemo ?item.approveMemo : '资源审核不通过';
//                          item.statusDesc = '<i class="yellow">' + item.statusDesc + ' <b class="new-warning" data-toggle="tooltip" data-placement="top" title="'+ item.approveMemo + '"></b></i>'
                            item.statusDesc = '<i class="yellow">' + item.statusDesc + ' <b class="new-warning look3" data-title="'+ item.approveMemo + '"></b></i>'
                        }
                        if (item.statusDesc === '已下线') {
                            item.statusDesc = '<i class="gray">' + item.statusDesc + '</i>'
                        }
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
        
        $('body').on('mouseenter','.look3',function(){
	        $('.hidetip2').css({
	        	'top':$(this).offset().top+$(this).height()+5+'px',
	        	'left':$(this).offset().left-8+'px',
	        	'max-width':'200px',
	        	'display':'block'
	        });
        		$('.hidetip2 .hidecontent').text($(this).data('title'));
        });
        $('body').on('mouseleave','.look3',function(){
        		$timeout(function(){
        			$('.hidetip2').stop().hide();
        		})
        });

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

        $scope.tableOptions = {
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[
                { field: "index",title: '#',type: "text", align: 'center', width: '5%', align: 'center' },
                { field: "title", title: '资源标题', type: "text", width: '', align: 'center',unresize:true },
                { field: "resourceClassify", title: '分类', type: "text", width: '10%', align: 'center' ,unresize:true},
                { field: "resourceType", title: '类型', type: "text",  width: '11%', align: 'center',unresize:true },
                { field: "resourceProperty", title: '性质', type: "text", width: '10%',  align: 'center',unresize:true },
                { field: "author", title: '作者', type: "text", width: '8%', align: 'center',unresize:true },
                { field: "uploadDate", title: '操作日期', type: "text", width: '11%', align: 'center',unresize:true },
                { field: "statusDesc", title: '状态', type: "text", width: '9%', align: 'center',unresize:true },
                { field: "operation", title: '操作',
                    toolbar:`<div>
                                    <a class="layui-btn layui-btn-mini grid-preview resourceOperation look" data-title="预览" lay-event="goPreview"></a>
                                    <a class="layui-btn layui-btn-mini grid-edit resourceOperation look" data-title="编辑"  lay-event="goEdit"></a>
                                    <a class="layui-btn layui-btn-mini grid-delete resourceOperation look" data-title="删除"  lay-event="onDeleteResource"></a>
                             </div>`,
                    width: '15%', align: 'center' }
            ]]
        };

        $scope.goPreview = (value, type) => { //预览资源
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
                        }, './resource/resource-previewVideo-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        }
        $scope.onDeleteResource = ( item ) => { //删除资源
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../common/html/delete-modal.html'),
                controller: 'deleteModalCtrl',
                controllerAs: 'deleteModalCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示信息',
                            item: item.resourceId,
                            content: '删除后不可恢复，确定要删除该资源么？'
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../common/controller/delete-modal-controller'], (require) => {
                            const ctrl = require('../../common/controller/delete-modal-controller')(require('../../../common/module'));
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
                ResourceService.getResourceDelete( item.resourceId).then((data)=> {
                    if ( data.status == 200) {
                        toastr.success('资源删除成功!');
                        $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                        return ;
                    }
                    toastr.error( data.errorMessage );
                });
            });
        }
        layui.table.on('tool(layuiTable)', function(obj){
            // console.log(obj);
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'goPreview'){
                $scope.goPreview(data, 'preview');
            }
            if(layEvent === 'goEdit'){
            		$('.hidetip').hide();
                $scope.goEdit(data);
            }
            if(layEvent === 'onDeleteResource'){
                $scope.onDeleteResource(data);
            }

        });
    };
}
ResourceListUncommittedCtrl.$inject = ['$scope', 'ResourceService', '$uibModal', '$state', '_', 'toastr','$timeout'];

module.exports = (ngMold) => {
    ngMold.controller('resourceListUncommittedCtrl', ResourceListUncommittedCtrl);
}