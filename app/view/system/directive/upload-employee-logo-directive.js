require('../../../../node_modules/cropper/dist/cropper.css');
require('../../../../node_modules/cropper/dist/cropper.js');
//上传pdf、图片
let DryadUploadEmployeeLogo = ($timeout,_) => {
    return {
        restrict: "ECMA",
        scope: {
            cropOptions:'=',
            sourceImg:'=',
            resultImg:'=',
            cropPable:'=',
            preview:'='
        },
        replace: 'true',
        template: `<div class="cropContent"><img id="image"></div>`,
        link: function(scope, ele, attrs) {
            var $image = $('#image');
            var $result = $('#resultImg');
            var $button = $('#button');

            //生成预览图
            function getRoundedCanvas(sourceCanvas) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var width = sourceCanvas.width;
                var height = sourceCanvas.height;
                canvas.width = width;
                canvas.height = height;
                context.beginPath();
                context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
                context.strokeStyle = 'rgba(0,0,0,0)';
                context.stroke();
                context.clip();
                context.drawImage(sourceCanvas, 0, 0, width, height);
                return canvas;
            }

            //初始化运行
            $timeout(function(){
                document.getElementById('image').src = scope.sourceImg;
                $image.on({
                    ready: function () {
                        scope.cropPable = true;
                    }
                }).cropper(_.extend(scope.cropOptions,{preview:$result}));
            },1000,false);

            $button.on('click', function () {
                var croppedCanvas;
                var roundedCanvas;
                if (!scope.cropPable) {return;}
                // Crop
                croppedCanvas = $image.cropper('getCroppedCanvas');
                // Round
                roundedCanvas = getRoundedCanvas(croppedCanvas);
                // Show
                // $result.html('<img src="' + roundedCanvas.toDataURL() + '">');
            });

            //重新上传头像
            scope.$on('updateLogo',(e,obj) => {
                $image.cropper('replace',obj.sourceImg);
            });

            //接收保存通知
            scope.$on('canSave',(e,obj) => {
                var croppedCanvas;
                var roundedCanvas;
                if (!scope.cropPable) {return;}
                // Crop
                croppedCanvas = $image.cropper('getCroppedCanvas');
                 
                // Round
                roundedCanvas = getRoundedCanvas(croppedCanvas);
                // console.log(roundedCanvas.toDataURL());
                // let formData = new FormData();
                // formData.append('cropped',roundedCanvas.toDataURL());

                // scope.$emit('formdata',{imgfile:formData});
                croppedCanvas.toBlob((blob) => {
                    let formData = new FormData();
                    formData.append('cropped',blob);
                    scope.$emit('formdata',{imgfile:formData,imgSrc:roundedCanvas.toDataURL()});
                });
            });
        }
    }
}
DryadUploadEmployeeLogo.$inject = ['$timeout','_'];


module.exports = (ngMold) => {
    ngMold.directive('dryadUploadEmployeeLogo', DryadUploadEmployeeLogo);
};