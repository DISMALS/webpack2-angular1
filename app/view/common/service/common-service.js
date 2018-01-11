module.exports = (ngMod) => {
    ngMod.factory('conmmonService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let conmmonServices = {
                //获取科室性质字典项列表
                getDictPropertyList: () => {
                    return http.get('dict/getDictPropertyList',{isMask:true});
                },
                //查询科室列表
                getDepartmentList:(pageNo,listSize,keyword='') => {
                    return http.get(`organization/queryDeptList/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //获取教育程度字典项列表
                getEduList: () => {
                    return http.get('dict/getEduList',{isMask:true});
                },
                //获取随访方式字典项列表
                getFollowUpList: () => {
                    return http.get('dict/getFollowUpList',{isMask:true});
                },
                //获取职业字典项列表
                getOccupationList: () => {
                    return http.get('dict/getOccupationList',{isMask:true});
                },
                //查询所有省列表
                getProvinceList: () => {
                    return http.get('dict/getProvinceList',{isMask:true});
                },
                //通过父编码取得对应地区列表
                getRegionByParentCode: (code) => {
                    return http.get(`dict/getRegionByParentCode/${code}`,{isMask:true});
                },
                //获取资源分类字典项列表
                getResourceClassifyList: () => {
                    return http.get('dict/getResourceClassifyList',{isMask:true});
                },
                //获取资源性质字典项列表
                getResourcePropertyList: () => {
                    return http.get('dict/getResourcePropertyList',{isMask:true});
                },
                //获取资源状态字典项列表
                getResourceStateList: () => {
                    return http.get('dict/getResourceStateList',{isMask:true});
                },
                //获取性别字典项列表
                getSexList: () => {
                    return http.get('dict/getSexList',{isMask:true});
                },
                //获取过敏原皮试结果分析字典项列表
                getSkinResultLevelList: () => {
                    return http.get('dict/getSkinResultLevelList',{isMask:true});
                },
                //获取过敏原字典项列表
                getSkinSourceList: () => {
                    return http.get('dict/getSkinSourceList',{isMask:true});
                },
                //获取民族字典项列表
                getVolkList: () => {
                    return http.get('dict/getVolkList',{isMask:true});
                },
                //视频播放列表
                getPlayAuth: ( videoId ) => {
                    return http.get('vod/getPlayAuth/' + videoId,{isMask:true});
                },
                //高级查询->查询主题
                querySubjectList:(filterType) => {
                    return http.get(`filter/getFilterItemsByFilterType/${filterType}`,{isMask:true});
                },
                //高级查询->查询条件
                queryConditionList:(filterType,filterItem) => {
                    return http.get(`filter/getFilterConditionByFilterItem/${filterType}/${filterItem}`,{isMask:true});
                },
                //资源图片上传
                saveimGroupUpload: (files)=>{
                    let config = {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    };
                    var fb = new FormData();
                    fb.append('file', files[0]);
                    return http.post('file/uploadFile',fb,config);
                },
                //资源图片获取URL
                getUploadImgUrl: ( fileId ) => { //图片上传
                    return http.get('file/url/' + fileId);
                },
                /*获取所有药品列表
                *arg[0]:药品类型,0为所有药品
                *arg[1]:页数
                *arg[2]:每页条数
                */
                getAllDrugList: (...arg) => {
                    return http.get(`drug/queryBaseConfigItemList/${arg[0]}/${arg[1]}/${arg[2]}`,{isMask:true});
                },
                //疾病严重程度
                getDiseaseLevelStatusList:() => {
                    return http.get('dict/getDiseaseLevelStatusList',{isMask:true});
                },
                //病情分期字典
                getDiseaseStageList:() => {
                    return http.get('dict/getDiseaseStageList',{isMask:true});
                },
                //病情严重程度
                getIllnessStageList:() => {
                    return http.get('dict/getIllnessStageList',{isMask:true});
                },
                //获取药品字典
                getDrugDictList:() => {
                    return http.get('drug/queryDrugBaseInfo/1/1000',{isMask:true});
                },
                //文件上传
                upLoadFile: (file) => {
                    let config = {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity,
                        isMask:true
                    };
                    return http.post('file/uploadFile',file,config);
                },
                //获取药品剂型列表
                getDosageList: () => {
                    return http.get('dict/getDosageList',{isMask:true});
                },
                //获取职称列表
                getJobTitleLsit:() => {
                    return http.get('dict/getPositionalTitlesType',{isMask:true});
                },
                //获取使用频次
                getUseDrugFrequencyList:() => {
                    return http.get('dict/getUseDrugFrequencyList',{isMask:true});
                },
                //疗程单位字典
                getCourseOfTreatmentList:() => {
                    return http.get('dict/getCourseOfTreatmentList',{isMask:true});
                }
            };
            return conmmonServices;
        }
    ]);
};












