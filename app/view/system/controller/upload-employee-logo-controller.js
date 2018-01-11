class UploadEmployeeLogoCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr) {
        $scope.items = items;

        //上传头像配置项
        $scope.cropObj = {
            cropOptions:{
                aspectRatio: 1,
                viewMode: 1,
                dragMode:'crop',
            },
            sourceImg : '',
            cropPable:false
        }
        let readfile = new FileReader();
        readfile.addEventListener('load',() => {
            $scope.cropObj.sourceImg = readfile.result;
            // console.log($scope.cropObj.sourceImg);
        },false);
        readfile.readAsDataURL($scope.items.item[0]);

        //重新上传头像
        //上传图片
        $scope.serviceFunc = (files) => {
            let reReadfile = new FileReader();
            reReadfile.addEventListener('load',() => {
                $scope.cropObj.sourceImg = reReadfile.result;
                $scope.$broadcast('updateLogo',{sourceImg:reReadfile.result});
                
            },false);
            reReadfile.readAsDataURL(files[0]);
        }
        
        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.sure = () => {
            $scope.$broadcast('canSave',{});
            $scope.$on('formdata',(e,obj) => {
                $uibModalInstance.close(obj);
            });
        }
    };
}

UploadEmployeeLogoCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr'];

module.exports = (ngMold) => {
    require('../directive/upload-employee-logo-directive')(ngMold);
    ngMold.controller('uploadEmployeeLogoCtrl', UploadEmployeeLogoCtrl);
}