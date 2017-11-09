class ResourceListUncommittedCtrl {
    constructor($scope, $state, $uibModal) {
        this.uibModal = $uibModal;

        $scope.searchResourceList = [{
            id: 1,
            name: '全部资源'
        }, {
            id: 2,
            name: '资源1'
        }, {
            id: 3,
            name: '资源2'
        }];
        $scope.searchClassifyList = [{
            id: 1,
            name: '全部分类'
        }, {
            id: 2,
            name: '分类1'
        }, {
            id: 3,
            name: '分类2'
        }];
        $scope.searchStatusList = [{
            id: 1,
            name: '全部状态'
        }, {
            id: 2,
            name: '状态1'
        }, {
            id: 3,
            name: '状态2'
        }];
        $scope.searchCustomerList = [{
            id: 1,
            name: '测试1'
        }, {
            id: 2,
            name: '测试2'
        }, {
            id: 3,
            name: '测试3'
        }];

        $scope.searchList = {
           resource: $scope.searchResourceList[0],
           classify: $scope.searchClassifyList[0],
           status: $scope.searchStatusList[0],
           customer: '',
        };
        $scope.data = [{
            resourceTitle: '资源标题',
            resourceClassify: '资源分类',
            resourceType: '资源类型',
            resourceNature: '资源性质',
            author: '作者',
            operationDate: '操作日期',
            status: '状态',
            operation: '操作',
            no: '1'
        },{
            resourceTitle: '最多最多最多最多我是文字 超过最多最多最多最多我是文字 超过就换行就换行',
            resourceClassify: '用药装置指导',
            resourceType: '视频',
            resourceNature: '公共性质',
            author: '胡贝贝',
            operationDate: '2010/09/07',
            status: '<i class="green">草稿</i>',
            operation: '<a>预览</a><a>编辑</a><a>删除</a>',
            no: '1'
        },{
            resourceTitle: '最多最多最多最多我是文字 超过就换行',
            resourceClassify: '用药装置指导',
            resourceType: '视频',
            resourceNature: '公共性质',
            author: '胡贝贝',
            operationDate: '2010/09/07',
            status: '<i class="yellow">退回</i> <b class="new-warning" data-toggle="tooltip" data-placement="top"  title="此患教内容因为（此处应该有原因）被退回，请重新编辑后再提交审核" ></b>',
            operation: '<a>预览</a><a>编辑</a><a>删除</a>',
            no: '1'
        },{
            resourceTitle: '最多最多最多最多我是文字 超过就换行',
            resourceClassify: '用药装置指导',
            resourceType: '视频',
            resourceNature: '公共性质',
            author: '胡贝贝',
            operationDate: '2010/09/07',
            status: '<i class="gray">下线</i>',
            operation: '<a>预览</a><a>编辑</a><a>删除</a>',
            no: '1'
        },
        ];
        $scope.gridOptions = {
            width: "100%",
            height: "100%",
            filtering: false, //启动查找
            editing: false, //启动编辑
            sorting: false, //启动排序
            paging: false, //启动分页
            pageIndex: 1,
            pageSize: 10,
            inserting: false, //启动添加
            data: $scope.data,
            noDataContent: '暂无数据...',
            loadMessage: '正在加载数据，请稍等...',
            loadIndication: true, //是否在加载数据时显示提示语
/*            rowClick: (row) => {
                $scope.openDetails(row);
            },*/
            fields: [
                { name: "no", title: '序号',type: "text", align: 'center', width: '5%', align: 'center' },
                { name: "resourceTitle", title: '资源标题', type: "text", width: '', align: 'center' },
                { name: "resourceClassify", title: '资源分类', type: "text", width: '10%', align: 'center' },
                { name: "resourceType", title: '资源类型', type: "text",  width: '11%', align: 'center' },
                { name: "resourceNature", title: '资源性质', type: "text", width: '10%',  align: 'center' },
                { name: "author", title: '作者', type: "text", width: '8%', align: 'center' },
                { name: "operationDate", title: '操作日期', type: "text", width: '11%', align: 'center' },
                { name: "status", title: '状态', type: "text", width: '10%', align: 'center' },
                { name: "operation", title: '操作',  type: "control",
                    itemTemplate: function(value, item) {
                                          let createA = document.createElement('a');
                                          createA.textContent = '预览';
                                          createA.className = 'grid-preview';
                                          createA.onclick = () => {
                                              $scope.preview();
                                          };
                                          let createB = document.createElement('a');
                                          createB.textContent = '编辑';
                                          createB.className = 'grid-view';
                                          createB.onclick = () => {
                                              $scope.editeAdd(item, 'edit');
                                          };
                                          let createC = document.createElement('a');
                                          createC.textContent = '删除';
                                          createC.className = 'grid-delete';
                                          createC.onclick = () => {
                                              $scope.deleteModal(item);
                                          };
                                          let spanEle = document.createElement('span');
                                          spanEle.appendChild(createA);
                                          spanEle.appendChild(createB);
                                          spanEle.appendChild(createC);
                                          return spanEle;
                                      }, width: '15%', align: 'center' }
            ]
        };
        $scope.preview = function(item, preview) {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/resource-publish-previewText.html'),
                controller: 'resourcePublishPreviewTextCtrl',
                controllerAs: 'resourcePublishPreviewTextVm',
                size: 'publish-lg',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                        };
                    },
                    resourcePublishPreviewTextCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./resource-publish-previewText-controller'], (require) => {
                            const ctrl = require('./resource-publish-previewText-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './resource-publish-controller');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });        }

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 500
        }

    };
     medicalRecords() {
        this.uibModal.open({
            animation: true,
            backdrop: 'static',
            template: require('../html/resource-publish.html'),
            controller: 'resourcePublishCtrl',
            controllerAs: 'resourcePublishVm',
            size: 'publish-lg',
            resolve: {
                items: function() {
                    return {
                        action: 'ADD',
                    };
                },
                resourcePublishCtrl: ($q, $ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./resource-publish-controller'], (require) => {
                        const ctrl = require('./resource-publish-controller')(require('../../../common/module'));
                        $ocLazyLoad.inject({
                            name: 'dryadApp',
                            files: [ctrl]
                        });
                        deferred.resolve(ctrl);
                    }, './resource-publish-controller');
                    return deferred.promise;
                }
            }
        }).result.then(function(result) {
        });
    };
}
ResourceListUncommittedCtrl.$inject = ['$scope', '$state', '$uibModal'];

module.exports = (ngMold) => {
    ngMold.controller('resourceListUncommittedCtrl', ResourceListUncommittedCtrl);
}