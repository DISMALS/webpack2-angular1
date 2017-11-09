class SystemBasicConfigurationCtrl {
    constructor($scope, $state, $stateParams, $uibModal) {
        $scope.searchkey = '';
        $scope.title = '配置类目';

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

        //class list 
        $scope.classList = [{id:1,name:'职业类型'},{id:2,name:'职称类型'},{id:3,name:'制造商'}].map((item,i) => {
            if(i == 0){
                item.active = true;
            }else{
                item.active = false;
            }
            return item;
        });

        //chooise class
        $scope.chooiseClass = (index) => {
            $scope.classList.forEach(function(element) {
                element.active = false;
            }, this);
            $scope.classList[index].active = true;
        };

        //list data
        $scope.data = [{
                Name: 'wangyong',
                Sex: '男',
                Age: 33,
                Address: '呼吸内科',
                Role: '医生',
                Work: '主治医生',
                Status: '在职'
            }, {
                Name: 'wangyong',
                Sex: '男',
                Age: 33,
                Address: '呼吸内科',
                Role: '医生',
                Work: '主治医生',
                Status: '在职'
            }, {
                Name: 'wangyong',
                Sex: '男',
                Age: 33,
                Address: '呼吸内科',
                Role: '医生',
                Work: '主治医生',
                Status: '在职'
            }, {
                Name: 'wangyong',
                Sex: '男',
                Age: 33,
                Address: '呼吸内科',
                Role: '医生',
                Work: '主治医生',
                Status: '在职'
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
            fields: [
                { name: "Sex", title: '', type: "text", width: 30, align: 'center' },
                {
                    title: '#',
                    type: "text",
                    align: 'center',
                    width: 20
                },
                { name: "Name", title: '名称', type: "text", width: 130, align: 'center' },
                {
                    title: '操作',
                    type: "control",
                    align: 'center',
                    headerTemplate: function() {
                        return '操作';
                    },
                    itemTemplate: function(value, item) {
                        let createB = document.createElement('a');
                        createB.textContent = '修改';
                        createB.className = 'grid-edit';
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
                        spanEle.appendChild(createB);
                        spanEle.appendChild(createC);
                        return spanEle;
                    }
                }
            ]
        };

        //exports
        $scope.exportsBtn = () => {
            console.log('导出');
        };
        
        //imports
        $scope.importsBtn = () => {
            console.log('导入');
        };

        

        //删除确认弹窗
        $scope.deleteModal = (item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../../common/html/delete-modal.html'),
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
                        require.ensure(['../../../common/controller/delete-modal-controller'], (require) => {
                            const ctrl = require('../../../common/controller/delete-modal-controller')(require('../../../../common/module'));
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
                console.log(result);
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
SystemBasicConfigurationCtrl.$inject = ['$scope', '$state', '$stateParams', '$uibModal'];

module.exports = (ngMold) => {
    ngMold.controller('systemBasicConfigurationCtrl', SystemBasicConfigurationCtrl);
}