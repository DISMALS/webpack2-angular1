module.exports = (ngMold) => {
    ngMold.factory('FollowupService', ['Http', '$cookies',
        (Http, $cookies) => {
            let http = new Http();

            let _getFollowupList = ( status, pageNo, listSize ) => { //获取随访列表
                if (status == 'all') { //全部随访列表
                    return http.get('followUp/queryAllList/' + pageNo + '/' + listSize , { isMask: true });
                }
                if (status == 'pending') { //待完成随访
                    return http.get('followUp/queryUnDoList/' + pageNo + '/' + listSize , { isMask: true });
                }
                if (status == 'publish') { //已完成随访
                    return http.get('followUp/queryDoneList/' + pageNo + '/' + listSize , { isMask: true });
                }
            }
            let _getAddFollowup = ( obj ) => { //增加或修改编辑随访
                return http.post('followUp/save', obj, { isMask: true });
            }

            let _getEditFollowup = ( followUpId ) => { //获取随访详情列表
                return http.get('followUp/getDetail/' + followUpId, { isMask: true });
            }

            let _getDoctorList = ( pageNo, listSize ) => { //获取医生列表字典
                return http.get('employee/getDoctorList/' + pageNo + '/' + listSize, { isMask: true });
            }

            let _getFollowupMode = ( ) => { //获取随访方式列表字典
                return http.get('dict/getFollowUpList', { isMask: true });
            }

            return {
                getDoctorList: _getDoctorList,
                getAddFollowup: _getAddFollowup,
                getEditFollowup: _getEditFollowup,
                getFollowupList: _getFollowupList,
                getFollowupMode: _getFollowupMode
            }
        }
    ]).name;
};