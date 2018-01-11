//单图片上传
let DryadUploadImg = ($timeout) => {
    return {
        restrict: "A",
        scope: {
            previewSrc:'=',
            serviceFn:'='
        },
        // template:`
        // <label class="fileLabel">
        //     <a class="patients-especial botton-special" data-ng-bind="btnName"></a>
        //     <input class="upfile" type="file" accept="image/jpg, image/gif, image/jpeg, image/png" style="opacity:0;cursor:pointer;">
        // </label>`,
        link: function(scope, ele, attrs) {
            $(ele).bind("change", function(event) {
                scope.serviceFn(event.target.files);
                // var file, width, height, reader, path;
                // file = this.files[0];
                // if (file) {
                //     if (/^.*\.(jpg|jpeg|png)$/i.test(file.name)) {
                //         if (file.size > 2 * 1024 * 1024) {
                //             $uiNoty.error('P002E018');
                //             return;
                //         } else {
                //             reader = new FileReader();
                //             reader.onload = function(theFile) {
                //                 if (attrs.sizeLimit) {
                //                     width = parseInt(attrs.sizeLimit.split('*')[0]);
                //                     height = parseInt(attrs.sizeLimit.split('*')[1]);
                //                     var img = new Image();
                //                     img.onload = function() {
                //                         if (this.width != width || this.height != height) {
                //                             $uiNoty.error('请上传尺寸为' + width + '*' + height + '的图片');
                //                         } else {
                //                             _setProp();
                //                         }
                //                     }
                //                     img.src = reader.result;
                //                 } else {
                //                     _setProp();
                //                 }
                //             };
                //             reader.readAsDataURL(file);
                //         }
                //     } else {
                //         $uiNoty.error('P001E011');
                //     }
                // }

                // function _setProp() {
                //     scope.imgPath = reader.result;
                //     scope.imgName = file.name;
                //     scope.imgFile = file;
                //     scope.$apply();
                // }
            });
        }
    }
}
DryadUploadImg.$inject = ['$timeout'];

//多图片上传
let DryadMultiFileSelect = ($timeout) => {
    return {
        restrict: "E",
        scope: {
            names: '=',
            files: '='
        },
        replace: true,
        template: '<div class="multiFilesWrapper p-l-20 p-r-20 p-b-20">' +
            '<label class="import-file">' +
            '<i class="lk-icon">&#xe617;</i><span>{{"UPLOAD" | translate}}</span>' +
            '<input type="file" accept="image/jpg" multiple style="display:none"></label>' +
            '<ul><li ng-repeat="item in names track by $index">' +
            '<input ng-model="item" disabled="disabled"><i class="lk-icon" ng-click="del($index)">&#xe613;</i>' +
            '</li></ul></div>',
        link: function(scope, ele, attrs) {
            ele.find('input').bind("change", function(event) {
                var files = event.target.files;
                if (!files.length) {
                    return;
                }
                for (var i = 0; i < files.length; i++) {
                    if (!/^.*\.(jpg|jpeg)$/i.test(files[i].name)) {
                        $uiNoty.error('P001E012', 2000);
                        event.target.value = '';
                        return;
                    }
                    if (files[i] && files[i].size >= 2 * 1024 * 1024) {
                        $uiNoty.error('P002E018', 2000);
                        event.target.value = '';
                        return;
                    }
                }
                scope.names.length = 0;
                scope.files.length = 0;
                for (var i = 0; i < Math.min(files.length, 4); i++) {
                    scope.files.push(files[i]);
                    scope.names.push(files[i].name);
                }
                scope.$apply();
            });

            scope.del = function(index) {
                scope.names.splice(index, 1);
                scope.files.splice(index, 1);
            }

            scope.$watch('names.length', function(newValue, oldValue) {
                if (!newValue) {
                    ele.find('input').val('');
                }
            })

        }
    }
}
DryadMultiFileSelect.$inject = ['$timeout'];

//上传pdf
let DryadPdfFileSelect = ($timeout) => {
    return {
        restrict: "E",
        scope: {
            name: '=',
            file: '=',
            size: '='
        },
        replace: true,
        template: '<div class="multiFilesWrapper">' +
            '<label class="import-file">' +
            '<i class="lk-icon">&#xe623;</i><span>{{"UPLOAD" | translate}}</span>' +
            '<input type="file" accept="application/pdf,"  style="display:none"></label>' +
            '<div class="col-sm-12">{{name}}</div>' +
            '</div>',
        link: function(scope, ele, attrs) {
            ele.find('input').bind("change", function(event) {
                var files = event.target.files;
                if (!files.length) {
                    return;
                }

                if (files[0] && files[0].size >= 2 * 1024 * 1024) {
                    $uiNoty.error('P002E018', 2000);
                    event.target.value = '';
                    return;
                }


                scope.file = files[0];
                scope.name = files[0].name;
                scope.size = files[0].size;

                scope.$apply();
            });
        }
    }
}
DryadPdfFileSelect.$inject = ['$timeout'];

//上传pdf、图片
let DryadPdfImgFileSelect = ($timeout) => {
    return {
        restrict: "E",
        scope: {
            refresh: '&',
            row: '=',
            examination: '='
        },
        replace: true,
        template: '<label>' +
            '<span style="cursor:pointer;font-weight:normal;color:#319DB5" ng-class="{corneal:!row.encounterCtmriId}">' +
            '<span style="cursor:pointer;font-weight:normal;color:#319DB5" ng-if="row.encounterCtmriId || row.examId || examination">{{"UPLOAD" | translate}}</span>' +
            '<span ng-if="!row.encounterCtmriId && !row.examId && !examination">{{"UPLOAD" | translate}}{{"CORNEAL_TOPOGRAPHY" | translate}}</span>' +
            '</span>' +
            '<input type="file" style="display:none"></label>',
        link: function(scope, ele, attrs) {
            ele.find('input').on("change", function(event) {
                var files = event.target.files;
                if (!files.length) {
                    return;
                }
                if (!/^.*\.(jpg|jpeg|png|pdf)$/i.test(files[0].name)) {
                    $uiNoty.error('P001E013', 2000);
                    event.target.value = '';
                    return;
                }
                scope.file = files[0];
                if (scope.row.examId) { scope.row.encounterCtmriId = scope.row.examId }
                if (scope.row.encounterCtmriId) {
                    NurseNewService.ctmriUpload(scope.file).then(function(data) {
                        NurseNewService.ctmriPreview(scope.row.encounterCtmriId, data.values).then(function(data) {
                            scope.refresh();
                            scope.$emit('kang', {});
                        });
                    }, function(err) {
                        $uiNoty.error(err.message);
                    })

                } else {
                    if (scope.examination) {
                        NurseNewService.ctmriUpload(scope.file).then(function(data) {
                            scope.$emit('ecg', data.values);
                        }, function(err) {
                            $uiNoty.error(err.message);
                        });
                    } else {
                        NurseNewService.ctmriUpload(scope.file).then(function(data) {
                            scope.$emit('imgId', data.values);
                        }, function(err) {
                            $uiNoty.error(err.message);
                        });
                    }
                }
                scope.$apply();
            });
        }
    }
}
DryadPdfImgFileSelect.$inject = ['$timeout'];


module.exports = (ngMold) => {
    ngMold.directive('dryadUploadImg', DryadUploadImg);
    ngMold.directive('dryadMultiFileSelect', DryadMultiFileSelect);
    ngMold.directive('dryadPdfFileSelect', DryadPdfFileSelect);
    ngMold.directive('dryadPdfImgFileSelect', DryadPdfImgFileSelect);
};