class FollowupOperationCtrl {
    constructor($scope, items, FollowupService, toastr, $uibModalInstance) {
        $scope.followupModeList = '';
        $scope.followUpId = items.followUpId;
        this.uibModalInstance = $uibModalInstance;
        FollowupService.getEditFollowup( $scope.followUpId ).then( (data) => {
            if (data.status == 200){
                $scope.followData = data.data;
                $scope.followData.realDate = moment(new Date()).format('YYYY-MM-DD');
            }else{
                toastr.error(data.errorMessage,null,1500);
                return;
            }
        })
        FollowupService.getFollowupMode( ).then( (data) => { //随访方式
            if (data.status == 200){
                $scope.followupModeList = data.data;
                $scope.active = data.data[0].dictItemValue;

            }else{
                toastr.error(data.errorMessage,null,1500);
                return;
            }
        })
        FollowupService.getDoctorList( 1, 100 ).then((data) => {
            if(data.status==200){
                $scope.getDoctorList = data.data;
                $scope.followData.realEmployeeId = $scope.getDoctorList[0].employeeId;
            }else{
                toastr.error(data.errorMessage,null,1500);
                return;
            }
        })

        $scope.onModeList = ( id ) => {
            $scope.active = id;
        }
        $scope.getSaveFollowup = () => {
            let obj = $scope.followData;
            obj.way = $scope.active;
            if ($scope.followUpId) {
                obj.followUpId = $scope.followUpId;
            }
            obj.birthday = moment(obj.birthday).format('YYYY-MM-DD');
            obj.planDate = moment(obj.planDate).format('YYYY-MM-DD');
            obj.realDate = moment(obj.realDate).format('YYYY-MM-DD');
            if (!obj.resultContent) {
                return  toastr.error('请输入随访结果!', null, 1500);
            }
            if (!obj.realEmployeeId) {
                return  toastr.error('请输入随访人员!', null, 1500);
            }
            FollowupService.getAddFollowup( obj ).then( (data) => {
                if(data.status==200){
                    toastr.success('随访成功',null,1500);
                    return $uibModalInstance.close( 'true' );
                }else{
                    toastr.error(data.errorMessage,null,1500);
                    return;
                }
            })
        }

        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
    }

}
FollowupOperationCtrl.$inject = ['$scope', 'items', 'FollowupService', 'toastr', '$uibModalInstance'];


module.exports = (ngMold) => {
    ngMold.controller('followupOperationCtrl', FollowupOperationCtrl);
}