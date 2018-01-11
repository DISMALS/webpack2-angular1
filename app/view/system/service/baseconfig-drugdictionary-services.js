module.exports = (ngMod) => {
    ngMod.factory('baseconfigDrugdictionaryService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let baseconfigDrugdictionaryServices = {
                //获取药品类型列表
                getDrugTypeList: (keyword='') => {
                    return http.get(`drug/queryDrugCategory?keyword=${keyword}`,{isMask:true});
                },
                //根据类型获取药品列表
                getDrugListByDrugType: (categoryId,pageNo,listSize,keyword='',drugBaseId='',dosageId='') => {
                    let str='';
                    if(categoryId){
                        str+='?categoryId='+categoryId;
                    }
                    if(drugBaseId){
                        str+='&drugBaseId='+drugBaseId;
                    }
                    if(dosageId){
                        str+='&dosageId='+dosageId;
                    }
                    if(keyword){
                        str+='&keyword='+keyword;
                    }
                    return http.get(`drug/queryDrugDetailInfoList/${pageNo}/${listSize}`+str,{isMask:true});
                },
                //获取药品详情
                getDrugDetails:(detailId) => {
                    return http.get(`drug/queryDrugDetailInfo/${detailId}`,{isMask:true});
                },
                //删除药品
                deleteDrug:(drugId) => {
                    return http.put(`drug/delete/${drugId}`,{isMask:true});
                },
                //保存修改药品或者新建药品
                saveAddOrEditDrug: (obj) => {
                    return http.post(`drug/saveDrugInfo`,obj,{isMask:true});
                },
                


                //获取基础配置列表
                getBaseConfigList: () => {
                    return http.get('baseConfig/queryBaseConfigList',{isMask:true});
                },
                //根据基础配置获取基础配置项
                getBaseConfigItemList: (baseId,pageNo,listSize,keyword='') => {
                    return http.get(`baseConfig/queryBaseConfigItemList/${baseId}/${pageNo}/${listSize}?keyword=${keyword}`,{isMask:true});
                },
                //删除基础配置项
                deleteBaseConfigItem: (itemId) => {
                    return http.put(`baseConfig/delBaseConfigItem/${itemId}`,{isMask:true});
                },
                //保存修改或者新建的配置项
                saveAddOrEditConfigItem: (obj) => {
                    return http.post('baseConfig/saveBaseConfigItem',obj,{isMask:true});
                },
                //基础配置项上移或下移
                upOrDownConfiguration: (upItemId,downItemId) => {
                    return http.put(`baseConfig/settingUpShowOlder/${upItemId}/${downItemId}`,{isMask:true});
                }
            };
            return baseconfigDrugdictionaryServices;
        }
    ]);
};