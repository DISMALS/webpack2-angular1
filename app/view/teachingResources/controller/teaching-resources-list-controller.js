class TeachingResourcesListCtrl {
    constructor($scope, $state, $stateParams, $uibModal,ResourceService) {
        $scope.keyword = '';
        $scope.activeBut=true; //列表或图片
        $scope.activeButText=2; //图文或视频
        //按钮切换
		$scope.clickActiveBut=(type)=>{
            if(type==1){$scope.activeBut=false;} //列表
			if(type==2){$scope.activeBut=true;} //tab
			if(type==3){ 
				//图片
                $scope.activeButText=2;
                $scope.pagination.currentPage = 1;
				$scope.init(1,12,$scope.activeButText)
			}
			if(type==4){
				//视频
                $scope.activeButText=1;
                $scope.pagination.currentPage = 1;
				$scope.init(1,12,$scope.activeButText)
			}
		}
        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 12,
            pageCount: 0
        }
        $scope.init=(pageIndex,pageSize,type)=>{
        	let obj={
                resourceProperty:0, //资源属性
                resourceType:$scope.activeButText,		//资源类型 1，图文，2视频
                resourceClassify:0, //资源分类
                pageNo:pageIndex,
                listSize:pageSize,
                keyword:$scope.keyword
      	  	}
            $scope.initListShow = false;
            ResourceService.getResourceListPublished(obj).then((data)=>{
                if (data.status == 200) {
                    if (!data.data) {
                        $scope.initList = [];
                        $scope.initListShow = true;
                        $scope.$broadcast('dataList',{data:[]});
                        return
                    }
                    $scope.initList = data.data;
                    $scope.pageConfig.pageCount = data.pager.totalCount;
                    $scope.initPageBar($scope.pageConfig.pageCount, true);
                    $scope.$broadcast('dataList',{data:$scope.initList});
                    //遍历获取图片url
                    _.each($scope.initList,function(a){
                        ResourceService.getResourcePreview( a.resourceId ).then((data) => {
                            if ( data.status == 200) {
                                a.coverFileUrl = data.data.coverFileUrl;
                            } else {
                                toastr.error( data.errorMessage, null, 3000 );
                            }
                        })
                    })
                } else{
                    $scope.initListShow = true;
                    toastr.error(data.errorMessage,null,1500);
                    return;
                }



            })
        }
        $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.activeButText)
        
		 //监听table事件
        layui.table.on('tool(layuiTable)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'goPreview'){
                $scope.goPreview(data, 'preview');
            }
        });

        //搜索
        $scope.seach=(data)=>{
            $scope.init(1,12,$scope.activeButText);
        }
        $scope.UpchangeResource = (e) => {
            let  keycode = window.event?e.keyCode:e.which;
            if ( keycode == 13 ) {
                $scope.seach();
            }
        }
        //layui
        $scope.tableOptions ={
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
             cols:[[
                { title: '序号', type: "numbers", width: '4%', align: 'center',unresize:true },
                { field: "title", title: '标题', type: "text", align: 'center' ,unresize:true},
                { field: "resourceType", title: '资源类型', type: "text", align: 'center',unresize:true},
                { field: "publishEmployeeName", title: '上传作者', type: "text", width: '12%', align: 'center' ,unresize:true},
                { field: "uploadDate", title: '上传日期', type: "text", width: '12%', align: 'center',unresize:true },
               	{
                    title: '操作',  
                    fixed:'right',
                    align: 'center',
                    width: '12%',
                    unresize:true,
                    toolbar:`<div><a class="layui-btn layui-btn-mini" lay-event="goPreview">预览</a></div>`
                }
            ]]
        };
		
        $scope.goPreview = (value, type) => { //预览资源
            if (value.resourceType == '视频') {
                return $scope.goVideoPreview(value.resourceId, type);
            }
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/teaching-previewText.html'),
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
                    checkCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./../../resource/controller/resource-previewText-controller'], (require) => {
                            const ctrl = require('./../../resource/controller/resource-previewText-controller')(require('../../../common/module'));
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
            let activeTab = value.resourceType == '视频' ? 2 : 1;
            $state.go('dryad.resource.publish', {activeTab: activeTab, operation: 'edit', resourceId: value.resourceId});
        }
        $scope.goVideoPreview = (resourceId, type) => { //视频预览
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../resource/html/resource-previewVideo.html'),
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
                        require.ensure(['./../../resource/controller/resource-previewVideo-controller'], (require) => {
                            const ctrl = require('./../../resource/controller/resource-previewVideo-controller')(require('../../../common/module'));
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

		 // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:12,
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
        
        

      
    }
}

TeachingResourcesListCtrl.$inject = ['$scope', '$state', '$stateParams', '$uibModal','ResourceService'];

module.exports = (ngMold) => {
	 require.ensure(['../../resource/service/resource-service'], (require) => {
        require('../../resource/service/resource-service')(ngMold);
    }, './../../resource/resource-service');
    ngMold.controller('teachingResourcesListCtrl', TeachingResourcesListCtrl);
}