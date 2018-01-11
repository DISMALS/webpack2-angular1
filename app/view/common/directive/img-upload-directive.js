let UploadFile = ($timeout, conmmonService, toastr) => { //上传图片 封面指令
    return {
        restrict: 'ACE',
        transclude: true,
        replace: true,
        scope: {
            coverFileId: '=coverFileId',
            coverFileUrl: '=coverFileUrl'
        },
        template: require('../html/resource-uploadImg.html'),
        link: function($scope, elem, attrs) {
            $timeout(function() {
                $scope.serviceFunc = (file) => {
                    if ( !file.length ) {
                        return
                    }
                    conmmonService.saveimGroupUpload( file ).then( (data) => {
                        if ( data.status == 200) {
                            $scope.coverFileId = data.data;
                        } else {
                            toastr.error( data.errorMessage, null, 3000 );
                        }
                        conmmonService.getUploadImgUrl ( $scope.coverFileId  ).then( (data) => {
                            if ( data.status == 200) {
                                $scope.coverFileUrl = data.data.filePath;
                            } else {
                                toastr.error( data.errorMessage, null, 3000 );
                            }
                        })
                    })
                }
            });
        }
    }
}
UploadFile.$inject = ['$timeout', 'conmmonService', 'toastr'];

module.exports = (ngMold) => {
    ngMold.directive('uploadFile', UploadFile);
}