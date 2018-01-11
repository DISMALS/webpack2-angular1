class SeeFollowupCtrl {
    constructor($scope, items, FollowupService, moment, toastr, $uibModalInstance) {
        this.uibModalInstance = $uibModalInstance;
        $scope.followUpId = items.followUpId;
        FollowupService.getEditFollowup( $scope.followUpId ).then( (data) => {
            if (data.status == 200){
                $scope.followData = data.data;
            }else{
                toastr.error(data.errorMessage,null,1500);
                return;
            }
        })
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
    }

}
SeeFollowupCtrl.$inject = ['$scope', 'items', 'FollowupService', 'moment', 'toastr', '$uibModalInstance'];


module.exports = (ngMold) => {
    ngMold.controller('seeFollowupCtrl', SeeFollowupCtrl);
}