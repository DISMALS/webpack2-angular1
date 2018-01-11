module.exports = (ngMod) => {
    ngMod.factory('operationService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let operationServices = {
                //获取医疗单位列表数据
                getOrgList: (pageNo,listSize,keyword='') => {
                    return http.get(`organization/queryOrgList/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //添加或者修改机构
                addOrEditOrg: (obj) => {
                    return http.post('organization/saveOrganization',obj,{isMask:true});
                },
                //删除机构
                deleteOrg:(orgId) => {
                    return http.put(`organization/deleteOrganization/${orgId}`,{isMask:true});
                },
                
                //机构启用/禁用
                enableOrg : (isdisabled,orgId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`organization/turnOffOrg/${orgId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`organization/turnOnOrg/${orgId}`,{isMask:true});
                    }
                },
                
                //运营账号启用/禁用
                enableEmployee : (isdisabled,employeeId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`employee/turnOff/${employeeId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`employee/turnOn/${employeeId}`,{isMask:true});
                    }
                },
                
                //查看机构详情
                viewOrgDetails: (orgId) => {
                    return http.get(`organization/getOrganizationDetail/${orgId}`,{isMask:true});
                },


                //运营角色列表
                getOperationList:(pageNo,listSize) => {
                    return http.get(`operationRole/queryOperationRoleList/${pageNo}/${listSize}`,{isMask:true});
                },
                //保存添加角色/修改角色
                saveAddEditOperationRole:(obj) => {
                    return http.post('operationRole/saveRole',obj,{isMask:true});
                },
                //删除运营角色
                deleteOperationRole:(roleId) => {
                    return http.put(`operationRole/delete/${roleId}`,{isMask:true});
                },
                //根据角色获取权限信息
                getPermissionByOperationRole: (roleId) => {
                    return http.get(`operationRole/queryPossessRoleFunctionList/${roleId}`,{isMask:true});
                },
                //保存修改后的运营角色权限
                saveOperationRolePermission:(obj) => {
                    return http.post('operationRole/saveRoleFunction',obj,{isMask:true});
                },


                //获取运营账号列表
                getOperationAccountList: (pageNo,listSize,keyword='') => {
                    return http.get(`operationEmployee/queryList/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //保存修改或者新建运营账号
                addOrEditOperation:(obj) => {
                    return http.post('operationEmployee/save',obj,{isMask:true});
                },
                //删除运营账号
                deleteOperationAccount:(employeeId) => {
                    return http.put(`operationEmployee/delete/${employeeId}`,{isMask:true});
                },
                //获取运营账号详情信息
                getOperationAccountDeails:(employeeId) => {
                    return http.get(`operationEmployee/queryDetail/${employeeId}`,{isMask:true});
                },
                 //根据省查医院
                 queryOrgList:(provinceCode) => {
                    return http.get(`organization/queryOrgList/1/2000?provinceCode=`+provinceCode,{isMask:true});
                },
                //查看角色是否
                checkRoleHasConsultAuthority:(roleId) => {
                    return http.get(`role/checkRoleHasConsultAuthority/`+roleId,{isMask:true});
                }
            };
            return operationServices;
        }
    ]);
};