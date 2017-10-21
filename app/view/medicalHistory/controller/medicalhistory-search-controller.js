class MedicalHistorySearchCtrl {
    constructor($rootScope, $scope, $uibModal, $state) {
        $scope.searchkey = '';
        $scope.screenList = [];

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
                Address: '上海市浦东新区',
                Country: 3,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 34,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 32,
                Address: '上海市浦东新区',
                Country: 1,
                Married: true
            },
            {
                Name: 'wangyong',
                Age: 31,
                Address: '上海市浦东新区',
                Country: 2,
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
                { name: "Age", title: '病历ID', type: "text", width: 150, align: 'center' },
                { name: "Address", title: '病历创建日期', type: "text", width: 200 },
                { name: "Country", title: '患者姓名', type: "text" },
                { name: "Married", title: '就诊类型', type: "text" }
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
            $scope.$emit('addTab', {
                title: '患者2',
                close: true,
                route: 'dryad.medicalhistory.details',
                params: {
                    id: 34534
                }
            });
            // $state.go('dryad.medicalhistory.details', {
            //     index: 0, //第一次显示第一个tab,所以这个值不用修改
            //     id: 34534
            // });
        };
        //search
        $scope.searchFn = (obj) => {
            $scope.filterObj = obj;
            $scope.screenList = angular.copy(obj.screenData);
            console.log(obj);
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
MedicalHistorySearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$state'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistorySearchCtrl', MedicalHistorySearchCtrl);
}