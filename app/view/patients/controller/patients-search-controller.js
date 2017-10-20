class PatientsSearchCtrl {
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
                { name: "Age", title: '姓名', type: "text", width: 150, align: 'center' },
                { name: "Address", title: '性别', type: "text", width: 50, align: 'center' },
                { name: "Country", title: '年龄', type: "text", align: 'center' },
                { name: "Married", title: '地区', type: "text", align: 'center' },
                { name: "Age", title: '职业', type: "text", width: 150, align: 'center' },
                { name: "Address", title: '就诊日期', type: "text", width: 100, align: 'center' }
                // {
                //     name: "操作",
                //     title: '操作',
                //     type: "control",
                //     editButton: false,
                //     deleteButton: false,
                //     itemTemplate: (value, item) => {
                //         console.log(value);
                //         console.log(item);
                //         return '<a data-ng-click="openDetails(item)">查看详情</a>';
                //     },
                //     align: 'center'
                // }
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

        //open page the details
        $scope.openDetails = (row) => {
            console.log(row);
            this.scope.$emit('addTab', {
                title: '患者3',
                close: true,
                route: 'dryad.patients.details',
                params: {
                    id: 23543534
                }
            });
            this.state.go('dryad.patients.details', {
                id: 23543534
            });
        };
    };
    //open page the details
    openDetails(row) {
        console.log(row);
        this.scope.$emit('addTab', {
            title: '患者3',
            close: true,
            route: 'dryad.patients.details',
            params: {
                id: 23543534
            }
        });
        this.state.go('dryad.patients.details', {
            id: 23543534
        });
    };
    //search
    searchFn(obj) {
        // this.scope.screenData = [];
        // this.scope.screenData = angular.copy(obj);
        console.log(obj);
    };

    //delete filter item
    deleteFilter(index) {
        this.scope.screenData.splice(index, 1);
    };

    //clear filter
    clearFilter() {
        this.scope.screenData = [];
    };

    //edite filter
    editFilter() {
        this.scope.$broadcast('edite', this.scope.screenData);
    };
}
PatientsSearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$state'];


module.exports = (ngMold) => {
    ngMold.controller('patientsSearchCtrl', PatientsSearchCtrl);
}