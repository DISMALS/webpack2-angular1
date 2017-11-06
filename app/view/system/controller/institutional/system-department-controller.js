class SystemDepartmentCtrl {
    constructor($scope, $state, $stateParams, $uibModal) {
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
            // rowClick: (row) => {
            //     $scope.openDetails(row);
            // },
            fields: [{
                    name: "Age",
                    title: '#',
                    type: "text",
                    align: 'center',
                    width: 50
                },
                { name: "Age", title: '科室名称', type: "text", width: 150, align: 'center' },
                { name: "Address", title: '科室描述', type: "text", width: 200, align: 'center' },
                { name: "Country", title: '科室性质', type: "text", align: 'center' },
                {
                    name: "Married",
                    title: '操作',
                    type: "control",
                    align: 'center',
                    headerTemplate: function() {
                        return '操作';
                    },
                    itemTemplate: function(value, item) {
                        let createA = document.createElement('a');
                        createA.textContent = '编辑';
                        createA.className = 'grid-edit';
                        createA.onclick = () => {
                            $scope.editeAdd(item, 'edit');
                        };
                        let createB = document.createElement('a');
                        createB.textContent = '删除';
                        createA.className = 'grid-delete';
                        createB.onclick = () => {
                            $scope.deleteModal(item);
                        };
                        let spanEle = document.createElement('span');
                        spanEle.appendChild(createA);
                        spanEle.appendChild(createB);
                        return spanEle;
                    }
                }
            ]
        };

        //添加或者修改
        $scope.editeAdd = (item, type) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/institutional/add-edit-department.html'),
                controller: 'addEditDepartmentCtrl',
                controllerAs: 'addEditDepartmentCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            action: type,
                            item: item || {}
                        };
                    },
                    addEditDepartmentCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./add-edit-department-controller'], (require) => {
                            const ctrl = require('./add-edit-department-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-department-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                // initData();
            });
        };

        //删除确认弹窗
        $scope.deleteModal = (item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/institutional/delete-modal.html'),
                controller: 'deleteModalCtrl',
                controllerAs: 'deleteModalCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            item: item,
                            content: '删除后不可恢复，确定要删除该选项么？'
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./delete-modal-controller'], (require) => {
                            const ctrl = require('./delete-modal-controller')(require('../../../../common/module'));
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
                // initData();
            });
        };

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 500
        }

        //to watch the pageindex,to load data
        $scope.$watch('pageConfig', (newValue, oldValue) => {
            if (newValue != oldValue) {
                console.log($scope.pageConfig);
            }
        }, true);
    }

}
SystemDepartmentCtrl.$inject = ['$scope', '$state', '$stateParams', '$uibModal'];

module.exports = (ngMold) => {
    ngMold.controller('systemDepartmentCtrl', SystemDepartmentCtrl);
}