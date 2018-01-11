module.exports = (ngMod) => {
    ngMod.factory('mainService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let mainServices = {
                // 验证权限
                checkPermission: (permissions, userAuthorities, results) => {
                    var permissionResult = results || {};
                    var authorities = [];
                    if (userAuthorities) {
                        authorities = userAuthorities;
                    } 
                    // else {
                    //     authorities = conmmonService.getCurrentUserAuthorities();
                    // }
                    var isAuthorised = false;
                    var hasNecessaryAuthority = null;
                    var hasNotAuthority = null;

                    _.each(permissions, function(permission) {
                        if (typeof permission !== 'string') {
                            isAuthorised = false;
                            permissionResult[permission] = false;
                            return isAuthorised;
                        }

                        if (permission === 'permitAll') {
                            isAuthorised = true;
                            permissionResult[permission] = true;
                            return isAuthorised;
                        }

                        if (permission.match(/^\+/)) {
                            // debugger;
                            var bResult = 0 <= _.indexOf(authorities, permission.slice(1));
                            permissionResult[permission] = bResult;
                            hasNecessaryAuthority = hasNecessaryAuthority == null ? bResult : bResult && hasNecessaryAuthority;
                        } else if (permission.match(/^\!/)) {
                            var bResult = 0 <= _.indexOf(authorities, permission.slice(1));
                            permissionResult[permission] = bResult;
                            hasNotAuthority = hasNotAuthority == null ? bResult : bResult && hasNotAuthority;
                        } else if (0 <= _.indexOf(authorities, permission)) {
                            isAuthorised = true;
                            permissionResult[permission] = true;
                        } else {
                            permissionResult[permission] = false;
                            isAuthorised = isAuthorised || false;
                        }
                    });
                    if (hasNecessaryAuthority != null && hasNotAuthority != null) {
                        isAuthorised = isAuthorised || hasNecessaryAuthority && hasNotAuthority;
                    } else if (hasNotAuthority != null) {
                        isAuthorised = isAuthorised || hasNotAuthority;
                    } else if (hasNecessaryAuthority != null) {
                        isAuthorised = isAuthorised || hasNecessaryAuthority;
                    }

                    return isAuthorised;
                },
                // 获取权限
                getCurrentUserAuthorities: () => {
                    let permissions = [
                        "DOCTOR_MEDICAL_REOCRD", //医生-病历管理
                        "DOCTOR_MEDICAL_REOCRD_PATIENT_ADD", //医生-病历管理-新增患者
                        "DOCTOR_MEDICAL_REOCRD_EDIT", //医生-病历管理-病历编辑
                        "DOCTOR_MEDICAL_REOCRD_ADVANCED_QUERY", //医生-病历管理-高级查询
                        "DOCTOR_MEDICAL_REOCRD_SEND_MAIL", //医生-病历管理-发送邮件
                        "DOCTOR_PATIENT", //医生-患者管理
                        "DOCTOR_PATIENT_ADVANCED_QUERY", //医生-患者管理-高级查询
                        "DOCTOR_PATIENT_QUERY_DETAIL", //医生-患者管理-查看详情
                        "DOCTOR_FOLLOW", //医生-随访管理
                        "DOCTOR_FOLLOW_UP_ADD", //医生-随访管理-新增随访
                        "DOCTOR_FOLLOW_UP_EDIT", //医生-随访管理-编辑随访
                        "DOCTOR_FOLLOW_UP_EXEC", //医生-随访管理-执行随访
                        "DOCTOR_SYSTEM", //医生-系统管理
                        "DOCTOR_SYSTEM_ORG", //医生-系统管理-机构管理
                        "DOCTOR_SYSTEM_ORG_DEPT", //医生-系统管理-机构管理-科室管理
                        "DOCTOR_SYSTEM_ORG_ROLE", //医生-系统管理-机构管理-角色管理
                        "DOCTOR_SYSTEM_ORG_EMPLOYEE", //医生-系统管理-机构管理-员工管理
                        "DOCTOR_SYSTEM_DRUG_DICT", //医生-系统管理-药品字典
                        "DOCTOR_SYSTEM_BASE_CONFIG", //医生-系统管理-基础配置
                        "SPECIALLIST_DATA", //专家-数据应用
                        "SPECIALLIST_DATA_ADVANCED_QUERY", //专家-数据应用-高级查询
                        "SPECIALLIST_DATA_SEND_MAIL", //专家-数据应用-导出发邮件
                        "SPECIALLIST_SYSTEM", //专家-系统管理
                        "SPECIALLIST_SYSTEM_AREA", //专家-系统管理-区域中心管理
                        "SPECIALLIST_SYSTEM_ROLE", //专家-系统管理-专家角色管理
                        "SPECIALLIST_SYSTEM_ACCOUNT", //专家-系统管理-专家账号管理
                        "OPERATION_RESOURCE", //运营-资源管理
                        "OPERATION_RESOURCE_ADD", //运营-资源管理-新增资源
                        "OPERATION_RESOURCE_APPROVE", //运营-资源管理-资源审核
                        "OPERATION_CONSULT", //运营-在线咨询
                        "OPERATION_SYSTEM", //运营-系统管理
                        "OPERATION_SYSTEM_ORG", //运营-系统管理-医疗单位管理
                        "OPERATION_SYSTEM_ROLE", //运营-系统管理-运营角色管理
                        "OPERATION_SYSTEM_ACCOUNT" //运营-系统管理-运营账号管理
                    ];
                    return permissions;
                },
                // 解析权限
                parsePermissions: function(permissionString) {
                    return permissionString.indexOf('[') == 0 ? permissionString.slice(1, permissionString.length - 1).split(",") : [permissionString];
                },
                // 退出
                logOut: (usercode) => {
                    return http.get(`login/loginOut/${usercode}`,{isMask:true})
                },
                //查询患者
                searchPatients: (obj) => {
                    return http.post(`patientManagement/searchRelPatients`,obj,{isMask:true});
                },
                //搜索患者创建病历
                searchPatientsCreateMedicalRecord: (obj) => {
                    return http.post(`medicalRecordManagement/searchPatientsByPatientBaseInfo`,obj,{isMask:true});
                },
                //查询就诊记录无数据时的新建病历
                createMedicalRecordByPatients: (obj) => {
                    return http.post('medicalRecordManagement/createMedicalRecord',obj,{isMask:true});
                },
                //修改账号密码
                editUserPassword: (obj) => {
                    return http.post('employee/updatePassword',obj,{isMask:true});
                },
                //医生角色列表
                getDoctorList:(pageNo,listSize) => {
                    return http.get(`doctorRole/queryDoctorRoleList/${pageNo}/${listSize}`,{isMask:true});
                },
                //获取职称列表
                getJobTitleLsit:() => {
                    return http.get('dict/getPositionalTitlesType',{isMask:true});
                },
                //查询医生信息
                queryDoctorInformation: (employeeId) => {
                    return http.get(`doctorEmployee/queryDetail/${employeeId}`,{isMask:true});
                },
                //修改医生信息
                saveOrEditInformation: (obj) => {
                    return http.post(`doctorEmployee/save`,obj,{isMask:true});
                }
                

            };
            return mainServices;
        }
    ]);
};












