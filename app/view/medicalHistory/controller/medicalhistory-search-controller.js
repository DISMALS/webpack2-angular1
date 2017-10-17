class MedicalHistorySearchCtrl {
    constructor($rootScope, $scope, $uibModal, $state) {
        this.scope = $scope;
        this.state = $state;
        console.log('这是病历查询视图！');
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
        this.scope.countries = [{
                Id: 1,
                Name: '中国'
            },
            {
                Id: 2,
                Name: '美国'
            },
            {
                Id: 3,
                Name: '日本'
            },
            {
                Id: 4,
                Name: '韩国'
            }
        ];
        //girdOptions
        this.scope.gridOptions = {
            width: "100%",
            height: "100%",
            filtering: false, //启动查找
            editing: true, //启动编辑
            sorting: false, //启动排序
            paging: false, //启动分页
            pageIndex: 1,
            pageSize: 10,
            inserting: true, //启动添加
            data: this.scope.data,
            noDataContent: '暂无数据...',
            confirmDeleting: true,
            loadMessage: '正在加载数据，请稍等...',
            deleteConfirm: (item) => {
                console.log(item);
                console.log(confirm());
                return "确定删除此条数据么?";
            },
            loadIndication: true, //是否在加载数据时显示提示语
            controller: {
                loadData: (item) => { //查
                    console.log(item);
                },
                insertItem: (item) => { //增
                    console.log(item);
                },
                updateItem: (item) => { //改
                    console.log(item);
                },
                deleteItem: (item) => { //删
                    console.log(item);
                }
            },
            fields: [
                { name: "Name", type: "text", width: 150 },
                { name: "Age", type: "number", width: 50, align: 'center' },
                { name: "Address", type: "text", width: 200 },
                { name: "Country", type: "select", items: this.scope.countries, valueField: "Id", textField: "Name" },
                { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
                { type: "control", name: "操作" }
            ]
        };

        //pageConfig
        this.scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 50
        }
    };
    //打开详情页面dryad.medicalhistory.details
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
    }
}
MedicalHistorySearchCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$state'];




module.exports = (ngMold) => {
    ngMold.controller('medicalHistorySearchCtrl', MedicalHistorySearchCtrl);
}