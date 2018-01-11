/**
 * Created by wangmu on 17/11/7.
 */
class ResourceListPublishedCtrl {
    constructor( $scope, $state, ResourceService, toastr, _, $uibModal ) {
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
            $scope.homePageShowNumber = 0;
            ResourceService.getResourceListPublished(obj).then((data) => {
                if (data.status==200) {
                    _.each(data.data, ( item, index ) => {
                    		item.index = ((pageNo - 1) * 10) + index + 1;
                        let moveUpHtml = item.homePageShow && index > 0 ?
                             '<a class="layui-btn layui-btn-mini resourceOperation grid-moveUp grid-move look" data-up-resource-id="' + item.resourceId +'" data-down-resource-id="' + data.data[index - 1].resourceId+ '" data-title="上移"></a>' : '';
                        let moveDownHtml = item.homePageShow && index < data.data.length - 1 && $scope.homePageShowNumber < 5 ?
                             '<a class="layui-btn layui-btn-mini resourceOperation grid-moveDown grid-move look" data-up-resource-id="' + data.data[index + 1].resourceId+ '" data-down-resource-id="' + item.resourceId +'"  data-title="下移"></a>' : '';

                        item.operation =
                            '<div>' +
                                '<a class="layui-btn layui-btn-mini resourceOperation grid-preview look" data-resource-id="' + item.resourceId +'" data-resource-type="' + item.resourceType +'" data-title="预览"></a>' +
                                '<a class="layui-btn layui-btn-mini resourceOperation grid-Offline look" data-resource-id="' + item.resourceId +'"  data-title="下线"></a>' +
                                moveUpHtml + moveDownHtml +
                            '</div>';
                        if ( item.homePageShow ) {
                            $scope.homePageShowNumber ++;
                        }
                        let className = item.homePageShow ? 'grid-indexShow' : 'grid-view';
                        item.homePageShow = '<em class="' + className +  '" data-resource-id="' + item.resourceId +'" data-home-page-show="' + item.homePageShow + '"  "></em>';

                    })
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:data.data? data.data : []});
                }else{
                    toastr.error(data.errorMessage,null,1500);
                    return;
                }
            })
        }
        $scope.init($scope.pageConfig.pageIndex, $scope.pageConfig.pageSize);


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
        //分页调用函数

        $scope.goPreview = (resourceId, type) => { //预览资源 - 审核资源
        		$('.hidetip').hide();
            if ( type == '视频') {
                return $scope.goVideoPreview(resourceId, 'preview');
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
                            type: 'preview',
                            resourceId: resourceId
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
        $scope.tableOptions = {
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[
                { field: "index", title: '#', type: "text", width: '4%', align: 'center' },
                { field: "title", title: '资源标题', type: "text", width: '', align: 'center' },
                { field: "viewNumber", title: '查阅次数', type: "text", width: '9%', align: 'center' },
                { field: "resourceClassify", title: '分类', type: "text", width: '7%', align: 'center' },
                { field: "resourceType", title: '类型', type: "text",  width: '6%', align: 'center' },
                { field: "resourceProperty", title: '性质', type: "text", width: '6.5%',  align: 'center' },
                { field: "author", title: '作者', type: "text", width: '7%', align: 'center' },
                { field: "publishEmployeeName", title: '发布人', type: "text", width: '7%', align: 'center' },
                { field: "uploadDate", title: '发布日期', type: "text", width: '8.5%', align: 'center' },
                { field: "homePageShow", title: '首页展示<i class="yiwen look1" data-title="选中的资源展示在banner上，按上下的顺序依次展示，可上移和下移"></i>',
                    width: '10%', align: 'center' },
                { field: "operation", title: '操作', type: "control",width: '17%',
                }
            ]]
        };
        //hidetip样式调整
		$('body').on('mouseenter','.look1',function(){
			        $('.hidetip').css({
			        	'top':$(this).offset().top-45+'px',
			        	'left':$(this).offset().left-13+'px',
			        	'max-width':'200px',
			        	'display':'block'
			        });
		        		$('.hidetip .hidecontent').text($(this).data('title'));
		        });
		        $('body').on('mouseleave','.look1',function(){
		        		$('.hidetip').hide();
		        });
        $('.dryad-grid').on('click', 'em', function () { //设置首页是否显示
            let resourceId = $(this).data('resourceId');
            let homePageShow = $(this).data('homePageShow');
            $scope.onToggleIndex(resourceId, homePageShow);
        })

        $('.dryad-grid').on('click', '.grid-preview', function () { //预览
            let resourceId = $(this).data('resourceId');
            let resourceType = $(this).data('resourceType');
            $('.hidetip').hide();
            $scope.goPreview(resourceId, resourceType);
        })
        $('.dryad-grid').on('click', '.grid-Offline', function () { //下线
            let resourceId = $(this).data('resourceId');
            $scope.onResourceOffline(resourceId);
        })
        $('.dryad-grid').on('click', '.grid-move', function () { //上下移动
            let upResourceId = $(this).data('upResourceId');
            let downResourceId = $(this).data('downResourceId');
            $scope.getSettingOlder(upResourceId, downResourceId);
        })

        $scope.onToggleIndex = (resourceId, homePageShow) => {
            if ( homePageShow ) {
                ResourceService.getCancelSettingUpHomePageShow( resourceId ).then( ( data )=> {
                    if ( data.status == 200) {
                     toastr.success('取消成功');
                     $scope.init( 1, 10 );
                     return
                    }
                    toastr.error( data.errorMessage );
                });
                return ;
            }
            if ( $scope.homePageShowNumber >=6) {
              return  toastr.warning('首页显示只能设置6个!');
            }

            ResourceService.getSettingUpHomePageShow( resourceId ).then( ( data )=> {
                if ( data.status == 200) {
                    toastr.success('设置成功');
                    $scope.init( 1, 10 );
                    return
                }
                toastr.error( data.errorMessage );
            });
        }
        $scope.onResourceOffline = (resourceId) => { //下线资源
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
                            patinet: true,
                            content: '确定下线此资源么？'
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
                ResourceService.getResourceOffline(resourceId).then((data) => {
                    if (data.status == 200) {
                        toastr.success('下线成功', null, 1500);
                        return $scope.init(1, 10);
                    }
                    toastr.error(data.errorMessage);
                });
            })
         }
        $scope.getSettingOlder = (upResourceId, downResourceId) => { // 顺序调整
            ResourceService.getSettingOlder( upResourceId, downResourceId ).then( ( data )=> {
                if ( data.status == 200) {
                    toastr.success('顺序调整成功', null, 1500);
                    $scope.init( 1, 10 );
                    return
                }
                toastr.error( data.errorMessage );
            });
         }
    }
}
ResourceListPublishedCtrl.$inject = [ '$scope', '$state', 'ResourceService', 'toastr', '_', '$uibModal' ];

module.exports = (ngMold) => {
    ngMold.controller('resourceListPublishedCtrl', ResourceListPublishedCtrl);
}