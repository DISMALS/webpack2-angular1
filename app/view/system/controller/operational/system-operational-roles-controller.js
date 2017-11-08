class SystemOperationalRolesCtrl {
    constructor($scope, $state, $stateParams,systemService,$uibModal) {
        //tootip
        $("[data-toggle='tooltip']").tooltip();

        //删除角色
        $scope.deleteRole = (item) => {
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

        //修改角色/添加角色
        $scope.addOrEditRole = (item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/add-edit-role.html'),
                controller: 'addEditRoleCtrl',
                controllerAs: 'addEditRoleCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: item ? '修改角色' : '新增角色',
                            item: item || {}
                        };
                    },
                    addEditRoleCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../add-edit-role-controller'], (require) => {
                            const ctrl = require('../add-edit-role-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-role-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                console.log(result);
                // initData();
            });
        };

        //权限修改保存
        $scope.save = (role,permission) => {
            console.log(role);
            console.log(permission);
        };

        //选中角色重新载入权限数据
        $scope.chooiseRole = (role) => {
            // console.log(role);
            return systemService.getPermissionData();
        };
        // 角色配置项
        $scope.roleOptions = {
            roleData:[ //角色列表
                {
                    id:1,
                    name:'数据录入员',
                    isEnable:true,
                    description:'角色描述'
                },{
                    id:2,
                    name:'主治医生',
                    isEnable:true,
                    description:'角色描述'
                },{
                    id:3,
                    name:'药房主管',
                    isEnable:false,
                    description:'角色描述'
                },{
                    id:4,
                    name:'护士长',
                    isEnable:true,
                    description:'角色描述'
                }
            ],
            deleteRole:$scope.deleteRole, //删除角色
            editRole:$scope.addOrEditRole, //修改角色
            addRole:$scope.addOrEditRole, //新增角色
            //data:systemService.getPermissionData(), // 权限数据
            saveFn:$scope.save, //权限保存事件
            chooiseRole: $scope.chooiseRole//选中角色重新载入权限数据
        };
    }
}
SystemOperationalRolesCtrl.$inject = ['$scope', '$state', '$stateParams','systemService','$uibModal'];

module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'],(require) => {
        require('../../service/system-service')(ngMold);
    },'./system/system-service');
    ngMold.controller('systemOperationalRolesCtrl', SystemOperationalRolesCtrl);
}