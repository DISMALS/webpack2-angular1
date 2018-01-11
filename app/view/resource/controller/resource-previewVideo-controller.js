/**
 * Created by wangmu on 17/11/8.
 */

class ResourcePreviewVideoCtrl {
    constructor( $scope,  $uibModalInstance, ResourceService, items, toastr, $uibModal ) {
        $scope.type = items.type;
        $scope.resourceId = items.resourceId;
        $scope.videoData = items.data? items.data : '';
        this.uibModalInstance = $uibModalInstance;
        $scope.fileId = $scope.videoData ? $scope.videoData.fileId : '';
        if ( !$scope.videoData ){
            ResourceService.getResourcePreview( $scope.resourceId ).then((data) => {
                if ( data.status == 200) {
                    $scope.videoData = data.data;
                    $scope.fileId = data.data.videoFileId;
                } else {
                    toastr.error( data.errorMessage, null, 3000 );
                }
            })
        }

        $scope.getApprove = () => { //审核通过,发布
            ResourceService.getPublishResource( $scope.resourceId ).then((data) => {
                if ( data.status == 200) {
                    toastr.success('审核成功', null, 3000);
                    return $uibModalInstance.close( 'true' );
                }
                toastr.error( data.errorMessage, null, 3000 );
            })
        }
        $scope.getReject = () => { //审核不通过, 退回
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../common/html/retreat-modal.html'),
                controller: 'retreatModalCtrl',
                controllerAs: 'retreatModalVm',
                size: 'sm',
                resolve: {
                    items: function() {
                        return {
                            info: '',
                            title: '填写退回说明',
                        };
                    },
                    retreatModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../common/controller/retreat-modal-controller'], (require) => {
                            const ctrl = require('../../common/controller/retreat-modal-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/retreat-modalp-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                let obj = {
                    resourceId: $scope.resourceId,
                    retreatCause: result
                }
                ResourceService.getRetreatResource( obj ).then((data) => {
                    if ( data.status == 200) {
                        toastr.success('审核退回成功', null, 3000);
                        return $uibModalInstance.close( 'true' );
                    }
                    toastr.error( data.errorMessage, null, 3000 );
                })

            });
        }
        $scope.closedModal = () => {
            $uibModalInstance.dismiss();
        }
    };

}
ResourcePreviewVideoCtrl.$inject = [ '$scope', '$uibModalInstance', 'ResourceService', 'items', 'toastr', '$uibModal' ];

module.exports = (ngMold) => {
    ngMold.controller('resourcePreviewVideoCtrl', ResourcePreviewVideoCtrl);
}