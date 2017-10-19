class MedicalHistorySearchCtrl {
    constructor($rootScope, $scope, $uibModal, $state) {
        this.scope = $scope;
        this.state = $state;
        this.searchkey = '';

        this.searchSelect = [{
            id: 1,
            name: '测试1'
        }, {
            id: 2,
            name: '测试2'
        }, {
            id: 3,
            name: '测试3'
        }];

        //screen data
        this.scope.screenData = [{
            logic: null,
            theme: 1,
            conditions: 1,
            domainValues: 1
        }, {
            logic: 2,
            theme: 2,
            conditions: 2,
            domainValues: 2
        }];

        //list data
        this.scope.data = [{
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
        this.scope.gridOptions = {
            width: "100%",
            height: "100%",
            filtering: false, //启动查找
            editing: false, //启动编辑
            sorting: false, //启动排序
            paging: false, //启动分页
            pageIndex: 1,
            pageSize: 10,
            inserting: false, //启动添加
            data: this.scope.data,
            noDataContent: '暂无数据...',
            loadMessage: '正在加载数据，请稍等...',
            loadIndication: true, //是否在加载数据时显示提示语
            rowClick: (row) => {
                this.openDetails(row);
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
        this.scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 500
        }

        //to watch the pageindex,to load data
        this.scope.$watch('pageConfig', (newValue, oldValue) => {
            if (newValue != oldValue) {
                console.log(this.scope.pageConfig);
            }
        }, true);
    };
    //open page the details
    openDetails(row) {
        this.scope.$emit('addTab', {
            title: '患者2',
            close: true,
            route: 'dryad.medicalhistory.details',
            params: {
                id: 34534
            }
        });
        this.state.go('dryad.medicalhistory.details', {
            id: 34534
        });
    };
    //search
    searchFn(obj) {
        console.log(obj);
    }
}
MedicalHistorySearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$state'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistorySearchCtrl', MedicalHistorySearchCtrl);
}