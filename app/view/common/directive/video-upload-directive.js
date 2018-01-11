
let VideoUpload = ($timeout, ResourceService, toastr) => {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            fileId: '=',
            progress: '=',
            isCancel: '=',
            fileName:'=',
            showCancel:'='
        },
        template: require('../html/video-upload.html'),

        link: function(scope, elem, attrs) {
            $timeout(()=>{
            scope.uploadAuth = '';
            scope.uploadAddress = '';
            var uploader = new VODUpload({
                // 文件上传失败
                'onUploadFailed': function (uploadInfo, code, message) {
                    toastr.error( '文件上传失败', null, 3000 );
                    scope.progress = 'onUploadFailed';
                    scope.showCancel = true;
                    scope.$apply();
                    console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
                },
                // 文件上传完成
                'onUploadSucceed': function (uploadInfo) {
                    scope.fileId = scope.videoId;
                    toastr.success( '文件上传完成', null, 3000 );
                    scope.fileName = uploadInfo.file.name;
                    scope.$apply();
                    console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
                },
                // 文件上传进度
                'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
                		
                		if(scope.progress == 'onUploadFailed'){
                			scope.$apply(function () {
                        scope.progress = 'onUploadFailed';
                    		});
                			return
                		}
                			scope.$apply(function () {
	                        scope.progress = Math.ceil(uploadedSize * 100 / totalSize);
	                    });
                			
                },
                // STS临时账号会过期，过期时触发函数
                'onUploadTokenExpired': function () {
                    console.log("onUploadTokenExpired");
                },
                // 开始上传
                'onUploadstarted': function (uploadInfo) {
                    uploader.setUploadAuthAndAddress(uploadInfo, scope.uploadAuth, scope.uploadAddress);
                    console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
                }
            });

            $(document).off('change', '.uploadVideoButton');
            $(document).on("change", '.uploadVideoButton', function(event) {
                let userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
                if (!event.target.files.length) {
                    return
                }
                
                for(var i=0; i<event.target.files.length; i++) {
                    uploader.addFile(event.target.files[i], null, null, null, userData);
                }
                let obj = {
                    "fileName": event.target.files[0].name,
                    "title": "string"
                }
                ResourceService.getUploadVideo( obj ).then((data)=> {
                    if ( data.status === 200 ) {
                        $timeout(function(){
	                        	scope.videoId = data.data.videoId;
	                        scope.uploadAuth = data.data.uploadAuth;
	                        scope.uploadAddress = data.data.uploadAddress;
	                    		scope.progress = 0;
	                    		scope.showCancel = true;
	                        uploader.startUpload();
	                        scope.$apply();
                        },100)
                    } else {
                        toastr.error( data.errorMessage, null, 3000 );
                    }
                });
            })
            $(document).off('click', '.cancelVideoButton');
            $(document).on('click', '.cancelVideoButton', function () {
                var index = 0;
                toastr.warning( '文件上传已取消', null, 3000 );
                uploader.cancelFile(index);
                uploader.deleteFile(index);
                uploader.cleanList();
                scope.showCancel = false;
                	scope.$apply();
            });
            }, 1500)
        }
    }
}
VideoUpload.$inject = ['$timeout', 'ResourceService', 'toastr'];

module.exports = (ngMold) => {
    ngMold.directive('videoUpload', VideoUpload);
}