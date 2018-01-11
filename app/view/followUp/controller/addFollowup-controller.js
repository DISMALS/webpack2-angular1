class AddFollowupCtrl {
    constructor($scope, items, FollowupService, moment, toastr, $uibModalInstance) {
        $scope.followUpId = items.followUpId;
        $scope.addText =  items.followUpId ? '编辑': '新增';
        // console.log(items.phoneNo);
        $scope.followData =  {
            way: 0,
            orgId: 1,
            status: 0,
            planContent: '',
            resultContent: '',
            realEmployeeId: 0,
            planEmployeeId: '',
            medicalReocrdNo: '',
            phoneNo: items.phoneNo ? items.phoneNo : '',
            birthday: moment(new Date()).format('YYYY-MM-DD'),
            realDate: moment(new Date()).format('YYYY-MM-DD'),
            planDate: moment(new Date()).format('YYYY-MM-DD'),
            patientName: items.patientName ? items.patientName : '',
        }
        FollowupService.getDoctorList( 1, 100 ).then((data) => {
            if(data.status==200){
                $scope.doctorList = data.data;
                if ( !$scope.followUpId ) {
                    $scope.followData.planEmployeeId = $scope.doctorList[0].employeeId;
                }
            }else{
                toastr.error(data.errorMessage,null,3000);
                return;
            }
        })

        if ( $scope.followUpId ) {
            FollowupService.getEditFollowup( $scope.followUpId ).then( (data) => {
                if (data.status == 200){
                    $scope.followData = data.data;
                }else{
                    toastr.error(data.errorMessage,null,3000);
                    return;
                }
            })
        }
        $scope.getSaveFollowup = () => {
            let obj = $scope.followData;
            if ($scope.followUpId) {
                obj.followUpId = $scope.followUpId;
            }
            obj.birthday = moment(obj.birthday).format('YYYY-MM-DD');
            obj.planDate = moment(obj.planDate).format('YYYY-MM-DD');
            if (!obj.patientName) {
                return  toastr.error('请填写患者姓名', null, 3000);
            }
            if (!obj.phoneNo) {
                return  toastr.error('请填写手机号', null, 3000);
            }
            let regPhoneNo = /^1\d{10}$/;
            if(!regPhoneNo.test(obj.phoneNo) || (obj.phoneNo+'').length!=11){
                toastr.error('请输入正确的手机号！',null,3000);
                return;
            }
            if (!obj.planDate) {
                return  toastr.error('请选择计划随访日期', null, 3000);
            }
            if (!obj.planEmployeeId) {
                return  toastr.error('请选择计划随访人员', null, 3000);
            }
            FollowupService.getAddFollowup( obj ).then( (data) => {
                if(data.status==200){
                    toastr.success('操作成功',null,3000);
                    return $uibModalInstance.close( 'true' );
                }else{
                    toastr.error(data.errorMessage,null,3000);
                    return;
                }
            })
        }
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
    }

}
AddFollowupCtrl.$inject = ['$scope', 'items', 'FollowupService', 'moment', 'toastr', '$uibModalInstance'];


module.exports = (ngMold) => {
    require.ensure(['../service/followup-service'], (require) => {
        require('../service/followup-service')(ngMold);
    }, './followUp/followup-serve');
    ngMold.controller('addFollowupCtrl', AddFollowupCtrl);
}