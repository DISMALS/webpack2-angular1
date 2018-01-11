module.exports = (ngMold) => {
    ngMold.factory ('medicalService',['$state', 'Http', '$cookies',
        ($state, Http, $cookies) => {
            const http = new Http();
            // 获取民族字典
            const _getNation = () => {
                return http.get('dict/getVolkList',{isMask:true});
            }
            //获取教育程度字典
            const _getEducation = () => {
                return http.get('dict/getEduList',{isMask:true})
            }
            //获取职业字典
            const _getJob = () => {
                return http.get('dict/getOccupationList',{isMask:true})
            }

            //获取医生列表
            const _getDoctorList = () => {
                return http.get('employee/getDoctorList/1/1000',{isMask:true})
            }

            //获取所有省列表
            const _getProvinceList = () => {
                return http.get('dict/getProvinceList',{isMask:true})
            }

            //根据父编码获取地区列表
            const _getRegionByParentCode = (code) => {
                return http.get('dict/getRegionByParentCode/'+code,{isMask:true})
            }

            //获取病例详情
            let _getPatientMedicalRecordDetail = (pid,rid) => {
                const url = "patientManagement/getPatientMedicalRecordDetail/" + pid + "/" + rid
                return http.get(url,{isMask:true})
            }
            //搜索病例列表
			let _searchMedicalRecordList=(obj)=>{
			 return http.post('medicalRecordManagement/searchMedicalRecords',obj,{isMask:true})
			}
			
			 //获取病例基本信息
            let _getPatientMedicalPatientInfo = (pid,rid) => {
                return http.get("medicalRecordManagement/getPatientMedicalRecordBaseInfo/"+pid+'/'+rid,{isMask:true})
            }
            //保存病例基本信息
            let _savePatientMedicalPatientInfo = (obj) => {
                return http.put("medicalRecordManagement/saveMedicalRecordBaseInfo",obj,{isMask:true})
            }
            //获取患者病例记录 type为类型 
			let _getPatientMedicalRecordDetailPart=(pid,rid,type)=>{
				return http.get('medicalRecordManagement/getPatientMedicalRecordDetailPart/'+pid+'/'+rid+'/'+type,{isMask:true})
			}
			// 获取患者病例记录 type为类型 
			let _savePatientMedicalRecordDetailPart=(type,obj)=>{
				return http.put('medicalRecordManagement/saveMedicalRecord'+type,obj,{isMask:true})
            }
            //保存实验室检查
			let _getSaveMedicalRecordLabInspection=(obj)=>{
				return http.put('medicalRecordManagement/saveMedicalRecordLabInspection', obj);
            }
            //获取病例基本信息
            let _getPatientInfoBaseInfoInDataApplication = (pid) => {
                return http.get("patientManagement/getPatientInfoBaseInfoInDataApplication/"+pid,{isMask:true})
            }
            //上传实验室检查
			let _SaveMedicalRecordLabInspectionFile=(doctorId,patientId,medicalRecordId,files)=>{
				let config = {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            	};
				var fb = new FormData();
				fb.append('file', files[0]);
				return http.post('medicalRecordManagement/uploadPatientImage/'+doctorId+'/'+patientId+'/'+medicalRecordId,fb,config);
            }
            //上传实验室检查
			let _getImageUrl=(fileId)=>{
				return http.get('file/url/'+fileId,{isMask:true});
            }
            //保存实验室检查
			let _deleteEmptyMedicalRecord=(doctorId,medicalPatientId,medicalRecordId)=>{
				return http.delete('medicalRecordManagement/deleteEmptyMedicalRecord/'+doctorId+'/'+medicalPatientId+'/'+medicalRecordId);
            }
            return {
                getNation: _getNation,
                getEducation:_getEducation,
                getJob: _getJob,
                getProvinceList: _getProvinceList,
                getDoctorList:_getDoctorList,//获取医生列表
                getRegionByParentCode: _getRegionByParentCode,
                getPatientMedicalRecordDetail: _getPatientMedicalRecordDetail,
                searchMedicalRecordList:_searchMedicalRecordList,  //查询病历列表
                getPatientMedicalPatientInfo:_getPatientMedicalPatientInfo, //获取病例基本信息
                savePatientMedicalPatientInfo:_savePatientMedicalPatientInfo, //保存病例基本信息
                getPatientMedicalRecordDetailPart:_getPatientMedicalRecordDetailPart, //获取患者病例记录 type为类型 
                savePatientMedicalRecordDetailPart:_savePatientMedicalRecordDetailPart, //保存病例记录 type
                getSaveMedicalRecordLabInspection:_getSaveMedicalRecordLabInspection, //保存实验室检查接口
                SaveMedicalRecordLabInspectionFile:_SaveMedicalRecordLabInspectionFile, //病例影像学上传
                getImageUrl:_getImageUrl, //根据ID获取图片url
                deleteEmptyMedicalRecord:_deleteEmptyMedicalRecord, //删除空白病例
                getPatientInfoBaseInfoInDataApplication:_getPatientInfoBaseInfoInDataApplication,//数据应用获取基本信息
                
                // 更新病历filter
                updataFilter : ( obj ) => {
                    return http.put('patientManagement/upsertSearchFilter', obj, { isMask: true });
                },
                // 高级搜索病历
                queryRelMedicalRecord: (obj) => {
                    return http.post(`medicalRecordManagement/searchMedicalRecordsByFilters`,obj,{isMask:true});
                },
                //获取病历高级筛选历史记录
                getRelHistoryList:(doctorId,filterType) => {
                    return http.get(`patientManagement/getSearchFilters/${doctorId}/${filterType}`,{isMask:true});
                },
                //获取病历高级筛选历史纪录详情
                getRelHistroyListDetails:(...arg) => {
                    return http.get(`patientManagement/getSearchFilter/${arg[0]}/${arg[1]}/${arg[2]}`,{isMask:true});
                },
                //删除病历高级查询历史纪录
                deleteRelHistoryList: (...arg) => {
                    return http.delete(`patientManagement/deleteSearchFilter/${arg[0]}/${arg[1]}/2`,{isMask:true});
                },
                //获取病例，患者，数据应用头部信息
                getMedicalRecordHeaderInfo:(rid)=>{
                    return http.get('medicalRecordManagement/getMedicalRecordHeaderInfo/'+rid,{isMask:true})
                },
                //获取药品类型列表
                getQueryDrugCategory:()=>{
                    return http.get('drug/queryDrugCategory',{isMask:true})
                },
                //获取药品列表
                getQueryBaseConfig:(type,key)=>{
                    if(key){
                        return http.get('drug/queryDrugBaseInfo/1/10000?keyword='+key+'&categoryId='+type,{isMask:true})
                    }else{
                        return http.get('drug/queryDrugBaseInfo/1/10000?categoryId='+type,{isMask:true})
                    }
                    
                },
                // 获取剂型列表
                queryDrugDosage:(drugId)=>{
                     return http.get('drug/queryDrugDosage/'+drugId,{isMask:true})
                },
                //获取剂型单位规格
                queryDrugDetailInfoList:(drugBaseId,dosageId)=>{  
                    return http.get('drug/queryDrugDetailInfoList/1/1000?drugBaseId='+drugBaseId+'&dosageId='+dosageId,{isMask:true})
                },
                //删除病例
                deleteMedicalRecord:(rid)=>{  
                    return http.delete('medicalRecordManagement/deleteMedicalRecord/'+rid,{isMask:true})
                },
                //导出病例
                exportMedicalRecordsByFilters:(obj)=>{  
                    return http.post('medicalRecordManagement/exportMedicalRecordsByFilters',obj,{isMask:true})
                },
            }
        }
    ])
}