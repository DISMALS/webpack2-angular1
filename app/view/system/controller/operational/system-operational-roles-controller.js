class SystemOperationalRolesCtrl {
    constructor($scope, $state, $stateParams,systemService,$uibModal,operationService,toastr) {
        //tootip
        $("[data-toggle='tooltip']").tooltip();

        //获取角色列表
        $scope.init = (pageNo,listSize,obj) => {
            operationService.getOperationList(pageNo,listSize).then(rps => {
                if(rps.status == 200){
                    $scope.roleDataList = angular.copy(rps.data).map((item,index) => {
                        item.index = index;
                        if(obj){
                        		var initIndex =  obj.index;
                        }else{
                        		var initIndex = 0;
                        }
                        if(index == initIndex){
                            item.active = true;
                            $scope.chooiseRole = angular.copy(item);
                            $scope.prevRoleActive = angular.copy(item);
                            $scope.isEnable = angular.copy(item.status);
                            $scope.chooiseRoles(item);
                        }else{
                            item.active = false;
                        }
                        return item;
                    });
                }else{
                    toastr.error(rps.errorMessage,null,1500);
                }
                
                // $scope.$emit('renderRoleList',{option:$scope.roleOptions});
            });
        };
        $scope.init(1,1000);

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
                operationService.deleteOperationRole(item.roleId).then(data => {
                    if(data.status == 200){
                        toastr.success('成功删除运营角色！',null,1500);
                        $scope.init(1,1000);
                    }else{
                        toastr.error(data.errorMessage,null,1500);
                    }
                });
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
                let obj = angular.copy(result);
                if(item){ //修改角色
                    obj.roleId = item.roleId;
                }
                operationService.saveAddEditOperationRole(obj).then(data => {
                    if(data.status == 200){
                        if(item){ //修改角色
                            toastr.success('角色修改成功！',null,1500);
                        }else{ // 添加角色
                            toastr.success('角色添加成功！',null,1500);
                        }
                        $scope.init(1,1000);
                    }else{
                        toastr.error(data.errorMessage,null,1500);
                    }
                });
            });
        };

        //循环删除权限多余数据
        let deletePermissionKey = (arr) => {
            arr.forEach(element => {
                delete element.index;
                delete element.selected;
                delete element.$$hashKey;
                if(element.subFunctionList && element.subFunctionList.length > 0){
                    deletePermissionKey(element.subFunctionList);
                }
                
            });
        };

        //过滤角色权限中选中的项
        $scope.loopPermissionList = (subArr) => {
            let arr = [];
            subArr.forEach(subEle => {
                if(subEle.posessFunction == 1 || subEle.posessFunction == 2){
                    arr.push(subEle.functionCode);
                    if(subEle.subFunctionList && subEle.subFunctionList.length > 0){
                       arr =  arr.concat($scope.loopPermissionList(subEle.subFunctionList));
                    }
                }
            });
            return arr;
        };

        //权限修改保存
        $scope.save = (role,permission) => {
            let permissionStrArr = [];
            permission.forEach(ele => {
                if(ele.posessFunction == 1 || ele.posessFunction == 2){
                    permissionStrArr.push(ele.functionCode);
                    if(ele.subFunctionList && ele.subFunctionList.length > 0){
                        permissionStrArr = permissionStrArr.concat($scope.loopPermissionList(ele.subFunctionList));
                    }
                }
            });
            let obj = {
                functionCodeList:permissionStrArr,
                roleId:role.roleId
            };
            operationService.saveOperationRolePermission(obj).then(data => {
                if(data.status == 200){
                    toastr.success('保存成功！',null,1500);
                    $scope.chooiseRoles(role);
                }else{
                    toastr.error(data.errorMessage,null,1500);
                }
            });
        };

        //选中角色重新载入权限数据
        $scope.chooiseRoles = (role) => {
            let permissionArr = [];
            operationService.getPermissionByOperationRole(role.roleId).then(data => {
                if(data.status == 200){
                    if(data.data.length == 0){
                        return [];
                    }
                    $scope.permissionList = data.data;
                    $scope.permissionList.forEach((itemchild,i) => {
                        itemchild.index = i;
                        if(itemchild.posessFunction == 1){
                            itemchild.selected = true;
                        }else{
                            itemchild.selected = false;
                        }
                        if(itemchild.subFunctionList){
                            loopPermission(itemchild.subFunctionList);
                        }
                        
                    });
                    //循环权限子项
                    function loopPermission(arrData){
                        arrData.forEach((item,i) => {
                            item.index = i;
                            if(item.posessFunction == 1){
                                item.selected = true;
                            }else{
                                item.selected = false;
                            }
                            if(item.subFunctionList){
                                loopPermission(item.subFunctionList);
                            }
                        });
                    }
                }else{
                    toastr.error(data.errorMessage,null,1500);
                }
            });
        };

        //保存角色是否禁用
        $scope.isDisableFn = (isdisable,role) => {
            systemService.saveIsDisabled(isdisable,role.roleId).then(rps => {
                if(rps.status == 200){
                    toastr.success('角色状态保存成功！',null,1500);
                    $scope.init(1,1000,role); 
                }else{
                    toastr.error(rps.errorMessage,null,1500);
                }
            });
        };

        // 角色配置项
        $scope.roleOptions = {
            // roleData:$scope.soleDataList, //角色列表数据
            deleteRole:$scope.deleteRole, //删除角色
            editRole:$scope.addOrEditRole, //修改角色
            addRole:$scope.addOrEditRole, //新增角色
            //data:systemService.getPermissionData(), // 权限数据
            saveFn:$scope.save, //权限保存事件
            chooiseRole: $scope.chooiseRoles,//选中角色重新载入权限数据
            isDisabledFn:$scope.isDisableFn
        };
    }
}
SystemOperationalRolesCtrl.$inject = ['$scope', '$state', '$stateParams','systemService','$uibModal','operationService','toastr'];

module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'],(require) => {
        require('../../service/system-service')(ngMold);
    },'./system/system-service');
    require.ensure(['../../service/operation-services'],(require) => {
        require('../../service/operation-services')(ngMold);
    },'./system/operation-services');
    ngMold.controller('systemOperationalRolesCtrl', SystemOperationalRolesCtrl);
}