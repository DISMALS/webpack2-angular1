class PatientsSearchCtrl {
    constructor($rootScope, $scope, $uibModal, $state) {
        $scope.searchkey = '';

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

        //list data
        $scope.data = [{
                Name: 'wangyong',
                Age: 33,
                Address: '男',
                Country: 3,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '男',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '女',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '男',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '男',
                Country: 1,
                Married: true
            }
        ];

        //girdOptions
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
            fields: [{
                    name: "Age",
                    title: '#',
                    type: "text",
                    align: 'center',
                    width: 50
                },
                { name: "Age", title: '姓名', type: "text", width: 150, align: 'center' },
                { name: "Address", title: '性别', type: "text", width: 50, align: 'center' },
                { name: "Country", title: '年龄', type: "text", align: 'center' },
                { name: "Married", title: '地区', type: "text", align: 'center' },
                { name: "Age", title: '职业', type: "text", width: 150, align: 'center' },
                { name: "Address", title: '就诊日期', type: "text", width: 100, align: 'center' }
            ]
        };

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 500
        }

        //open page the details
        $scope.openDetails = (row) => {
            console.log(row);
            $scope.$emit('addTab', {
                title: '患者3',
                close: true,
                route: 'dryad.patients.details',
                params: {
                    id: 34255
                }
            });
            // $state.go('dryad.patients.details', {
            //     //index: 0, //第一次显示第一个tab,所以这个值不用修改
            //     id: 23543534
            // });
        };
        //search
        $scope.searchFn = (obj) => {
            $scope.filterObj = obj;
            $scope.screenList = angular.copy(obj.screenData);
        };

        //delete filter item
        $scope.deleteFilter = (index) => {
            $scope.screenList.splice(index, 1);
        };

        //clear filter
        $scope.clearFilter = () => {
            $scope.screenList = [];
        };

        //edite filter
        $scope.editFilter = () => {
            let obj = {
                screenData: $scope.screenList,
                remeber: $scope.filterObj.remeber,
                templateName: $scope.filterObj.templateName
            }
            $scope.$broadcast('edite', obj);
        };

        //to watch the pageindex,to load data
        $scope.$watch('pageConfig', (newValue, oldValue) => {
            if (newValue != oldValue) {
                console.log($scope.pageConfig);
            }
        }, true);
    };

}
PatientsSearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$state'];


module.exports = (ngMold) => {
    ngMold.controller('patientsSearchCtrl', PatientsSearchCtrl);
}