module.exports = (ngMold) => {
    ngMold.factory('PatientsService', ['Http', '$cookies',
        (Http, $cookies) => {
            let http = new Http();

            let patientsList = {
                // 搜索患者
                patientsSearch : ( obj ) => {
                    return http.post('patientManagement/searchRelPatients', obj, { isMask: true });
                },
                // 患者详情
                patientsDetails : ( patientId ) => {
                    return http.get(`patientManagement/getPatientInfoBaseInfo/${patientId}`, { isMask: true });
                },
                // 查询患者病历记录
                patientsDetailsMedical : ( patientId ) => {
                    return http.get('patientManagement/getPatientInfoMedicalInfo/' + patientId , { isMask: true });
                },
                // 查询患者用药记录
                patientsDetailsMedication : ( patientId, date ) => {
                    return http.get('patientManagement/getPatientInfoMedicationInfo/' + patientId + '/' + date, { isMask: true });
                },
                // 更新filter
                updataFilter : ( obj ) => {
                    return http.put('patientManagement/upsertSearchFilter', obj, { isMask: true });
                },
                // 高级搜索患者
                queryRelPatients: (obj) => {
                    return http.post(`patientManagement/searchRelPatientsByFilters`,obj,{isMask:true});
                },
                //获取高级筛选历史记录
                getRelHistoryList:(doctorId,filterType) => {
                    return http.get(`patientManagement/getSearchFilters/${doctorId}/${filterType}`,{isMask:true});
                },
                //获取高级筛选历史纪录详情
                getRelHistroyListDetails:(...arg) => {
                    return http.get(`patientManagement/getSearchFilter/${arg[0]}/${arg[1]}/${arg[2]}`,{isMask:true});
                },
                //删除高级查询历史纪录
                deleteRelHistoryList: (...arg) => {
                    return http.delete(`patientManagement/deleteSearchFilter//${arg[0]}/${arg[1]}/1`,{isMask:true});
                },
                //删除高级查询历史纪录
                autoComplete: ( obj ) => {
                    return http.post(`patientManagement/autoComplete`, obj, {isMask:true});
                }
            };

            return patientsList;
        }
    ]).name;
};