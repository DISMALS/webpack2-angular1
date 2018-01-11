class AddEditProgramCtrl {
    constructor($scope, APP_CONFIG, $uibModalInstance, items, toastr,operationService,conmmonService,$q) {
    	    var self = $scope;
        $scope.title = items.title;
        $scope.orgId = items.item.orgId;
        $scope.isSend = false;
        $scope.orgDetails={};
        $scope.logoSrc = '';

        //获取省份列表
        $scope.getProvinceList = () => {
            conmmonService.getProvinceList().then(rps => {
                if(rps.status == 200){
                   $scope.provinceList = rps.data;
                   $scope.provinceListcopy = $scope.provinceList;
//                 $scope.provinceList.unshift({regionCode:'',regionName:'--省份--'});
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.getProvinceList();

        //获取市列表
        $scope.getCityList = (code,type) => {
            conmmonService.getRegionByParentCode(code).then(rps => {
                if(rps.status == 200){
                    $scope.cityList = rps.data;
                    $scope.orgDetails.city = $scope.cityList[0].regionCode;
                    $scope.$select.selected.regionName = $scope.orgDetails.city = $scope.cityList[0].regionName;
//                  $scope.cityList.unshift({regionCode:'',regionName:'--城市--'});
                    if(!type){
                    		$scope.orgDetails.city = '';
                    		$scope.orgDetails.country = '';
                    }
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };

        //获取区列表
        $scope.getCountryList = (code,type) => {
            conmmonService.getRegionByParentCode(code).then(rps => {
                if(rps.status == 200){
                    $scope.countryList = rps.data;
                    if(!type){
                    		$scope.orgDetails.country = '';
                    }
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        
        //省份首拼过滤
        $scope.serchProvinceForm=(value)=>{
            var reg = /([\u4e00-\u9fa5]+)/g; //匹配中文
                if (value == '' || value == null) {
                    $scope.provinceList = $scope.provinceListcopy;
                } else {
                    $scope.provinceList = [];
                    if (reg.test(value)) { //中文
                        $scope.provinceListcopy.forEach(function(item) {
                            if (item.regionName.indexOf(value) > -1) {
                                $scope.provinceList.push(item);
                            }
                        });
                    } else { //字母、数字、特殊字符
                        value = value.toUpperCase();
                        for (var i = 0, len = $scope.provinceListcopy.length; i < len; i++) {
                            $scope.provinceListcopy[i].regionShortnameEn=$scope.provinceListcopy[i].regionShortnameEn.toUpperCase();
                            if ($scope.provinceListcopy[i].regionShortnameEn.indexOf(value) > -1) {
                                $scope.provinceList.push($scope.provinceListcopy[i]);
                            }
                        }
                    }
            } 
        }

        //获取机构详情
        $scope.initData = (orgId) => {
            operationService.viewOrgDetails(orgId).then(rps => {
                if(rps.status == 200){
                    $scope.orgDetails = rps.data;
                    $scope.logoSrc = $scope.orgDetails.logoUrl;
                    if($scope.orgId){
                        $scope.getCityList($scope.orgDetails.province,true);
                        $scope.getCountryList($scope.orgDetails.city,true);
                    }
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
            
        };
        if($scope.orgId){
            $scope.initData($scope.orgId);
        }
        
		//限制邮编长度 
		$scope.limitlength = () => {
			if($scope.orgDetails.zipCode.length > 6){
				$scope.orgDetails.zipCode = $scope.orgDetails.zipCode.substring(0,6);
			}
		};
		
        //上传图片
        $scope.serviceFunc = (file) => {
            let readerFile = new FileReader();
            readerFile.addEventListener('load',() => {
                $scope.logoSrc = readerFile.result;
            },false);
            readerFile.readAsDataURL(file[0]);
    
            conmmonService.saveimGroupUpload(file).then(rps => {
                if(rps.status == 200){
                    $scope.orgDetails.logoId = rps.data;
                    toastr.success('图片上传成功！',null,3000);
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        }

        // close modal
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };

        //sure
        $scope.sure = () => {
            $scope.orgDetails.pushAccountToAdmin = $scope.isSend ? 1 : 0;
            if($scope.orgId){
                $scope.orgDetails.orgId = $scope.orgId;
            }
            operationService.addOrEditOrg($scope.orgDetails).then(rps => {
                if(rps.status == 200){
                    if($scope.orgId){
                        toastr.success('医疗单位修改成功！',null,3000);
                    }else{
                        toastr.success('新增医疗单位成功！',null,3000);
                    }
                    $uibModalInstance.close($scope.orgDetails);
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        }
    };
}

AddEditProgramCtrl.$inject = ['$scope', 'APP_CONFIG', '$uibModalInstance', 'items', 'toastr','operationService','conmmonService','$q'];

module.exports = (ngMold) => {
    require.ensure(['../../service/operation-services'],(require) => {
        require('../../service/operation-services')(ngMold);
    },'./system/operation-services');
    ngMold.controller('addEditProgramCtrl', AddEditProgramCtrl);
}