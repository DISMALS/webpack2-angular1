/**
 * Created by wangmu on 17/11/9.
 */

module.exports = (ngMold) => {
    ngMold.factory('ResourceService', ['Http', '$cookies',
        (Http, $cookies, ) => {
            let http = new Http();

            let _getResourceListUncommitted = ( data ) => { //未提交列表
                var str = '';
                _.each(['resourceProperty', 'resourceType', 'resourceClassify', 'pageNo', 'listSize'], function(key) {
                    if (String(data[key]) != '' && data[key] != undefined) {
                        str +=  '/' + encodeURIComponent(data[key]);
                    }
                });
                var keyword = '';
                if ( String(data.keyword) != '' && data.keyword != undefined ) {
                    keyword = '?keyword=' + data.keyword;
                }
                return http.get('useResource/queryUnSubmitList' + str + keyword );
            }
            let _getResourceListApproval = ( data ) => { //待审核列表
                var str = '';
                _.each(['resourceProperty', 'resourceType', 'resourceClassify', 'pageNo', 'listSize'], function(key) {
                    if (String(data[key]) != '' && data[key] != undefined) {
                        str +=  '/' + encodeURIComponent(data[key]);
                    }
                });
                var keyword = '';
                if ( String(data.keyword) != '' && data.keyword != undefined ) {
                    keyword = '?keyword=' + data.keyword;
                }
                return http.get('useResource/queryPendingList' + str + keyword );
            }
            let _getResourceListPublished = ( data ) => { //已上线列表
                var str = '';
                _.each(['resourceProperty', 'resourceType', 'resourceClassify', 'pageNo', 'listSize'], function(key) {
                    if (String(data[key]) != '' && data[key] != undefined) {
                        str +=  '/' + encodeURIComponent(data[key]);
                    }
                });
                var keyword = '';
                if ( String(data.keyword) != '' && data.keyword != undefined ) {
                    keyword = '?keyword=' + data.keyword;
                }
                return http.get('useResource/queryPublishedList' + str + keyword );
            }

            let _getResourceOffline = ( resourceId ) => { //下线资源
                return http.put('manageResource/insertingCoil/' + resourceId);
            }

            let _getSettingOlder = ( upResourceId, downResourceId ) => { //调整资源顺序
                return http.put('manageResource/settingUpShowOlder/' + upResourceId + '/' + downResourceId);
            }

            let _getCancelSettingUpHomePageShow = ( resourceId ) => { //取消首页显示
                return http.put('/manageResource/cancelSettingUpHomePageShow/' + resourceId);
            }

            let _getSettingUpHomePageShow = ( resourceId ) => { //设置首页显示
                return http.put('/manageResource/settingUpHomePageShow/' + resourceId);
            }

            let _getSave = ( obj ) => { // 保存资源
                return http.post('manageResource/save', obj);
            }

            let _getSaveAndSubmit = ( obj ) => { // 保存并提交
                return http.post('manageResource/saveAndSubmit', obj);
            }

            let _getPublishResource = ( resourceId ) => { // 发布资源
                return http.put('manageResource/publish/' + resourceId);
            }

            let _getRetreatResource = ( obj ) => { // 审核退回
                return http.post('manageResource/retreat', obj);
            }

            let _getResourceSearchClassify = () => { //资源分类
                return http.get('dict/getResourceClassifyList');
            }
            let _getResourceSearchProperty = () => { //资源性质
                return http.get('dict/getResourcePropertyList');
            }
            let _getResourceSearchState = () => { //资源状态
                return http.get('dict/getResourceStateList');
            }
            let _getResourceSearchArea = (pageNo, listSize) => { //区域中心
                return http.get('specailListArea/queryAreaList/' + pageNo + '/' + listSize);
            }
            let _getResourceSearchOrg = (pageNo, listSize) => { //医疗单位, 机构列表
                return http.get('useOrganization/queryOrgList/' + pageNo + '/' + listSize);
            }
            let _getResourcePositional = ( ) => { //职称
                return http.get('dict/getPositionalTitlesType');
            }
            let _getResourceEdit = ( resourceId ) => { //编辑资源
                return http.get('useResource/queryDetailForEdit/' + resourceId);
            }

            let _getResourcePreview = ( resourceId ) => { //预览资源
                return http.get('useResource/getResourceDetail/' + resourceId);
            }

            let _getResourceDelete = ( resourceId ) => { //删除资源
                return http.put('manageResource/delete/' + resourceId);
            }

            let _getUploadVideo = ( data ) => { //视频预览
                return http.post('vod/getUploadVideoInfo', data);
            }

            return {
                getSave: _getSave,
                getUploadVideo: _getUploadVideo,
                getSettingOlder: _getSettingOlder,
                getResourceEdit: _getResourceEdit,
                getSaveAndSubmit: _getSaveAndSubmit,
                getResourceDelete: _getResourceDelete,
                getPublishResource: _getPublishResource,
                getRetreatResource: _getRetreatResource,
                getResourceOffline: _getResourceOffline,
                getResourcePreview: _getResourcePreview,
                getResourceSearchOrg: _getResourceSearchOrg,
                getResourcePositional: _getResourcePositional,
                getResourceSearchArea: _getResourceSearchArea,
                getResourceSearchState: _getResourceSearchState,
                getResourceListApproval: _getResourceListApproval,
                getResourceListPublished: _getResourceListPublished,
                getSettingUpHomePageShow: _getSettingUpHomePageShow,
                getResourceSearchClassify: _getResourceSearchClassify,
                getResourceSearchProperty: _getResourceSearchProperty,
                getResourceListUncommitted: _getResourceListUncommitted,
                getCancelSettingUpHomePageShow: _getCancelSettingUpHomePageShow,
            }
        }
    ]);
};