class ResourceListPendingApprovalCtrl {
    constructor($scope, $state) {

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
            customer: '',
        };
        $scope.data = [{
            resourceTitle: '资源标题',
            resourceClassify: '资源分类',
            resourceType: '资源类型',
            resourceNature: '资源性质',
            author: '作者',
            submitDate: '提交日期',
            operation: '操作',
            no: '1'
        },{
            resourceTitle: '最多最多最多最多我是文字 超过最多最多最多最多我是文字 超过就换行就换行',
            resourceClassify: '用药装置指导',
            resourceType: '视频',
            resourceNature: '公共性质',
            author: '胡贝贝',
            submitDate: '2010/09/07',
            operation: '<a>预览</a><a>编辑</a><a>删除</a>',
            no: '1'
        },{
            resourceTitle: '最多最多最多最多我是文字 超过就换行',
            resourceClassify: '用药装置指导',
            resourceType: '视频',
            resourceNature: '公共性质',
            author: '胡贝贝',
            submitDate: '2010/09/07',
            operation: '<a>预览</a><a>编辑</a><a>删除</a>',
            no: '1'
        },{
            resourceTitle: '最多最多最多最多我是文字 超过就换行',
            resourceClassify: '用药装置指导',
            resourceType: '视频',
            resourceNature: '公共性质',
            author: '胡贝贝',
            submitDate: '2010/09/07',
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
            rowClick: (row) => {
                $scope.openDetails(row);
            },
            fields: [
                { name: "no", title: '序号', type: "text", width: '6%', align: 'center' },
                { name: "resourceTitle", title: '资源标题', type: "text", width: '', align: 'center' },
                { name: "resourceClassify", title: '资源分类', type: "text", width: '11%', align: 'center' },
                { name: "resourceType", title: '资源类型', type: "text",  width: '11%', align: 'center' },
                { name: "resourceNature", title: '资源性质', type: "text", width: '11%',  align: 'center' },
                { name: "author", title: '作者', type: "text", width: '9%', align: 'center' },
                { name: "submitDate", title: '提交日期', type: "text", width: '12%', align: 'center' },
                { name: "operation", title: '操作', type: "text", width: '15%', align: 'center' }
            ]
        };

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 500
        }
    }
}
ResourceListPendingApprovalCtrl.$inject = ['$scope', '$state'];

module.exports = (ngMold) => {
    ngMold.controller('resourceListPendingApprovalCtrl', ResourceListPendingApprovalCtrl);
}