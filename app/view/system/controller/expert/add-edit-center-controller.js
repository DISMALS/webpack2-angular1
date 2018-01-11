class AddEditCenterCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr,conmmonService,expertService, _, $uibModal) {
        $scope.items = items;
        $scope.areaId = items.item.areaId;
        $scope.orginalCenter = {
            name:'',
            memo:'',
            regionCodeList:[]
        };
        
        //获取省份列表
        $scope.getProvinceList = () => {
            conmmonService.getProvinceList().then(rps => {
                if(rps.status == 200){
                    $scope.provinceList = rps.data;
                    $scope.provinceList.unshift({regionCode:'',regionName:'全国',regionShortnameEn:'QG'});
                    $scope.provinceListCopy=angular.copy($scope.provinceList);

                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };

        //获取区域中心详情
        $scope.getRegionalCenterDetails = () => {
            $scope.getProvinceList();
            if(!$scope.areaId){return false;}
            expertService.viewRegionalCenterDetails($scope.areaId).then(rps => {
                if(rps.status == 200){
                    $scope.orginalCenter = rps.data;
                    if (!$scope.orginalCenter.regionCodeList) {
                        $scope.orginalCenter.regionCodeList = [''];
                    }
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.getRegionalCenterDetails();
        $scope.selectProvince = (select) => {
            _.each(select, (item, index) => {
                if (item.regionCode === '' && select.length>1) {
                    $scope.tooltipOpen(index);
                }
            })
        }
        //省份首拼过滤
        $scope.searchProvinceForm=(value)=>{
            var reg = /([\u4e00-\u9fa5]+)/g; //匹配中文
            if (value == '' || value == null) {
                $scope.provinceList = $scope.provinceListCopy;
            } else {
                $scope.provinceList = [];
                if (reg.test(value)) { //中文
                    $scope.provinceListCopy.forEach(function(item) {
                        if (item.regionName.indexOf(value) > -1) {
                            $scope.provinceList.push(item);
                        }
                    });
                } else { //字母、数字、特殊字符
                    value = value.toUpperCase();
                    for (var i = 0, len = $scope.provinceListCopy.length; i < len; i++) {
                        $scope.provinceListCopy[i].regionShortnameEn=$scope.provinceListCopy[i].regionShortnameEn.toUpperCase();
                        if ($scope.provinceListCopy[i].regionShortnameEn.indexOf(value) > -1) {
                            $scope.provinceList.push($scope.provinceListCopy[i]);
                        }
                    }
                }
            }
        }
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //sure
        $scope.sure = () => {
            if ($scope.orginalCenter.regionCodeList.length<1) {
                return toastr.error('请选择中心下辖省份',null,3000);
            }
            _.each($scope.orginalCenter.regionCodeList, (item) => {
                if (item === '') {
                    $scope.orginalCenter.regionCodeList = null;
                }
            })

            $uibModalInstance.close($scope.orginalCenter);
        }

        //打开新提示
        $scope.tooltipOpen = (index) => {
            let content = '';
            if (index ==0 ) {
                content = '“全国”已包含其它省份在内，若需要单独选择其它省份，请先移除“全国”选项';
            }
            if (index >0 ) {
                content = '选择“全国”后，其它已选择省份将自动替换为“全国”选项';
            }
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../../common/html/delete-modal.html'),
                controller: 'deleteModalCtrl',
                controllerAs: 'deleteModalCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            item: '',
                            patinet: true,
                            content: content,
                            modalCancel: true
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../../common/controller/delete-modal-controller'], (require) => {
                            const ctrl = require('../../../common/controller/delete-modal-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/delete-modal-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                if (result || index == 0) {
                    $scope.orginalCenter.regionCodeList = [''];
                } else {
                    $scope.orginalCenter.regionCodeList.pop();
                }
            });
        };
    };
}

AddEditCenterCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr','conmmonService','expertService', '_', '$uibModal'];

module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'],(require) => {
        require('../../service/system-service')(ngMold);
    },'./system/system-service');
    require.ensure(['../../service/expert-services'],(require) => {
        require('../../service/expert-services')(ngMold);
    },'./system/expert-services');
    ngMold.controller('addEditCenterCtrl', AddEditCenterCtrl);
}