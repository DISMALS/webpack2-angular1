module.exports = (ngMod) => {
    ngMod.factory('expertService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let expertServices = {
                //获取区域中心列表
                getRegionalCenter: (pageNo,listSize,keyword='') => {
                    return http.get(`specailListArea/queryAreaList/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //添加或修改区域中心
                saveAddOrEditRegionalCenter: (obj) => {
                    return http.post('specailListArea/saveArea',obj,{isMask:true});
                },
                //删除区域
                deleteRegionalCenter: (areaId) => {
                    return http.put(`specailListArea/delArea/${areaId}`,{isMask:true});
                },
                //区域启用/禁用
                enableArea : (isdisabled,areaId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`specailListArea/turnOff/${areaId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`specailListArea/turnOn/${areaId}`,{isMask:true});
                    }
                },
                //查看区域中心详情
                viewRegionalCenterDetails: (areaId) => {
                    return http.get(`specailListArea/getAreaDetail/${areaId}`,{isMask:true});
                },



                //专家角色列表
                getExpertRoleList:(pageNo,listSize) => {
                    return http.get(`specialListRole/querySpeciallistRoleList/${pageNo}/${listSize}`,{isMask:true});
                },
                //保存添加角色/修改角色
                saveAddEditExpertRole:(obj) => {
                    return http.post('specialListRole/saveRole',obj,{isMask:true});
                },
                //删除专家角色
                deleteExpertRole:(roleId) => {
                    return http.put(`specialListRole/delete/${roleId}`,{isMask:true});
                },
                //专家账号启用/禁用
                enableEmployee : (isdisabled,employeeId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`employee/turnOff/${employeeId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`employee/turnOn/${employeeId}`,{isMask:true});
                    }
                },
                //根据角色获取权限信息
                getPermissionByExpertRole: (roleId) => {
                    return http.get(`specialListRole/queryPossessRoleFunctionList/${roleId}`,{isMask:true});
                },
                //保存修改后的专家角色权限
                saveExpertRolePermission:(obj) => {
                    return http.post('specialListRole/saveRoleFunction',obj,{isMask:true});
                },



                //获取专家账号列表数据
                getExpertEmployeeList: (pageNo,listSize,keyword='') => {
                    return http.get(`specailListEmployee/queryList/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //保存新增或者修改的专家账号信息
                saveAddOrEditExpertEmployee: (obj) => {
                    return http.post('specailListEmployee/save',obj,{isMask:true});
                },
                //删除专家账号
                deleteExpertEmployee: (employeeId) => {
                    return http.put(`specailListEmployee/delete/${employeeId}`,{isMask:true});
                },
                //查看专家账号详情
                viewExpertEmployeeDetails: (employeeId) => {
                    return http.get(`specailListEmployee/queryDetail/${employeeId}`,{isMask:true});
                }
            };
            return expertServices;
        }
    ]);
};