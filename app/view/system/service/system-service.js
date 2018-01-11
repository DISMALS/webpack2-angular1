module.exports = (ngMod) => {
    ngMod.factory('systemService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let systemServices = {
                //新增科室
                addDepartment: (obj) => {
                    return http.post('organization/addDept',obj,{isMask:true});
                },
                //删除科室
                deleteDepartment:(deptId) => {
                    return http.put(`organization/deleteDept/${deptId}`,{isMask:true});
                },

                //医生角色列表
                getDoctorList:(pageNo,listSize) => {
                    return http.get(`doctorRole/queryDoctorRoleList/${pageNo}/${listSize}`,{isMask:true});
                },
                //保存添加角色/修改角色
                saveAddEditDoctorRole:(obj) => {
                    return http.post('doctorRole/saveRole',obj,{isMask:true});
                },
                //删除医生角色
                deleteDoctorRole:(roleId) => {
                    return http.put(`doctorRole/delete/${roleId}`,{isMask:true});
                },
                //根据角色获取权限信息
                getPermissionByDoctorRole: (roleId) => {
                    return http.get(`doctorRole/queryPossessRoleFunctionList/${roleId}`,{isMask:true});
                },
                //保存修改后的医生角色权限
                saveDoctorRolePermission:(obj) => {
                    return http.post('doctorRole/saveRoleFunction',obj,{isMask:true});
                },
                //保存角色禁用状态
                saveIsDisabled : (isdisabled,roleId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`role/forbiddenRole/${roleId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`role/startUsingRole/${roleId}`,{isMask:true});
                    }
                    
                },


                //医生端获取员工列表数据
                getEmployeeList: (pageNo,listSize,keyword='') => {
                    return http.get(`doctorEmployee/queryList/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //新增或者修改医生信息
                saveOrEditInformation: (obj) => {
                    return http.post(`doctorEmployee/save`,obj,{isMask:true});
                },
                //查询医生信息
                queryDoctorInformation: (employeeId) => {
                    return http.get(`doctorEmployee/queryDetail/${employeeId}`,{isMask:true});
                },
                //删除医生
                deleteDoctor: (employeeId) => {
                    return http.put(`doctorEmployee/delete/${employeeId}`,{isMask:true});
                },

                //获取权限数据
                getPermissionData:() => {
                    let permissionData = require('../../../config/data/roleTree.json');
                    return permissionData;
                },
                
                //科室禁用状态
                enableDepartment : (isdisabled,deptId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`organization/turnOffDept/${deptId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`organization/turnOnDept/${deptId}`,{isMask:true});
                    }
                },
                //科室员工状态
                enableEmployee : (isdisabled,employeeId) => {
                    if(!isdisabled){ //禁用
                        return http.put(`employee/turnOff/${employeeId}`,{isMask:true});
                    }else{ //启用
                        return http.put(`employee/turnOn/${employeeId}`,{isMask:true});
                    }
                },
            };
            return systemServices;
        }
    ]);
};