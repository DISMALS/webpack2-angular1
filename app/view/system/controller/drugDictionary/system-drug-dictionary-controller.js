class SystemDrugDictionaryCtrl {
    constructor($scope, $state, $stateParams, $uibModal) {
        $scope.searchkey = '';
        $scope.title = '药品分类';

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
        $scope.classList = [{id:1,name:'控制类药物'},{id:2,name:'编辑类药物'},{id:3,name:'未分类药物'}].map((item,i) => {
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
            fields: [{
                    name: "Age",
                    title: '#',
                    type: "text",
                    align: 'center',
                    width: 20
                },
                { name: "Name", title: '名称', type: "text", width: 80, align: 'center' },
                { name: "Sex", title: '剂型', type: "text", width: 30, align: 'center' },
                { name: "Age", title: '医嘱单位', type: "text", width: 30, align: 'center' },
                { name: "Address", title: '制造商', type: "text", width: 80, align: 'center' },
                { name: "Status", title: '国药准字', type: "text", width: 40, align: 'center' },
                {
                    title: '操作',
                    type: "control",
                    align: 'center',
                    headerTemplate: function() {
                        return '操作';
                    },
                    itemTemplate: function(value, item) {
                        let createA = document.createElement('a');
                        createA.textContent = '查看';
                        createA.className = 'grid-view';
                        createA.onclick = () => {
                            $scope.view(item);
                        };
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
                        spanEle.appendChild(createA);
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

        //添加或者修改
        $scope.editeAdd = (item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/drugDictionary/add-edit-drugdictionary.html'),
                controller: 'addEditDrugdictionaryCtrl',
                controllerAs: 'addEditDrugdictionaryCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: item ? '修改药品' : '新增药品',
                            item: item || {}
                        };
                    },
                    addEditDrugdictionaryCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./add-edit-drugdictionary-controller'], (require) => {
                            const ctrl = require('./add-edit-drugdictionary-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-drugdictionary-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                console.log(result);
                // initData();
            });
           
        };

        //查看
        $scope.view = (item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/drugDictionary/view-drugdictionary.html'),
                controller: 'viewDrugdictionaryCtrl',
                controllerAs: 'viewDrugdictionaryCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: item ? '修改区域中心' : '新增区域中心',
                            item: item || {},
                            parentScope:$scope
                        };
                    },
                    viewDrugdictionaryCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./view-drugdictionary-controller'], (require) => {
                            const ctrl = require('./view-drugdictionary-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/view-drugdictionary-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                console.log(result);
                // initData();
            });
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
SystemDrugDictionaryCtrl.$inject = ['$scope', '$state', '$stateParams', '$uibModal'];

module.exports = (ngMold) => {
    ngMold.controller('systemDrugDictionaryCtrl', SystemDrugDictionaryCtrl);
}