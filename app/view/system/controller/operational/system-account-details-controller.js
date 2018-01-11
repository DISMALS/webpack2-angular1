require('../../../../../images/default-logo.png');
class SystemAccountDetailsCtrl {
    constructor($scope, $stateParams,$state,$uibModal,operationService,conmmonService,toastr) {
        $scope.id = $stateParams.id;
        $scope.pageindex = $stateParams.pageindex;
        $scope.searchkey = $stateParams.searchkey;
        console.log($scope.pageindex)
        $scope.title = $scope.id ? '修改运营账号' : '新增运营账号' ;
        $scope.obj = {
            logoSrc:`/images/default-logo.png`
        }
        $scope.accountObj = {};
        $scope.consultOrgList=false;//客户医院配置
        //上传图片
        $scope.serviceFunc = (files) => {
            // console.log(files);
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../html/upload-employee-logo.html'),
                controller: 'uploadEmployeeLogoCtrl',
                controllerAs: 'uploadEmployeeLogoCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: '上传头像',
                            item: files
                        };
                    },
                    uploadEmployeeLogoCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../upload-employee-logo-controller'], (require) => {
                            const ctrl = require('../upload-employee-logo-controller')(require('../../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/upload-employee-logo-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                $scope.obj.logoSrc = result.imgSrc;
                conmmonService.saveimGroupUpload(files).then(rps => {
                    if(rps.status == 200){
                        $scope.accountObj.headPicId = rps.data; //头像ID
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
            });
        }

        //选择性别
        $scope.isBoy = true;
        $scope.chooiseSex = () => {
            $scope.isBoy = !$scope.isBoy;
        };

        //选择在职情况
        $scope.working = true;
        $scope.isWork = () => {
            $scope.working = !$scope.working;
        };
        //选择的医院
        $scope.chooisesList = [];

        //监听医院选中事件
        $scope.$on('chooiseHospital',(evt,obj) => {
            $scope.chooisesList = obj.chooiseList;
        });

        //获取城市下的医院列表
        $scope.getHospitalLists = (city,init) => {
            let regionCode='';
            if(city){
                regionCode=city.regionCode;
            }
            operationService.queryOrgList(regionCode).then((res)=>{
                $scope.hospitalList=res.data;
                if($scope.hospitalList.length){
                    _.each($scope.hospitalList,function(item,i){
                        if(init){
                            //初始化进来
                            _.each(init,function(children,i){
                                if(item.orgId==children){
                                    item.active=true;
                                    $scope.chooisesList.push(item)
                                }
                            })
                        }else{
                            //非初始化
                            _.each($scope.chooisesList,function(children,i){
                                if(item.orgId==children.orgId){
                                    item.active=true;
                                }
                            })
                        }
                        
                    })
                }
            })
        };
        //获取医院列表
       
        //获取角色列表
        $scope.getRoleList = (pageNo,listSize,keyword) => {
            operationService.getOperationList(pageNo,listSize,keyword).then(data => {
                if(data.status == 200){
                    $scope.roleList = data.data;
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };
        //获取省份列表
        $scope.getProvinceList = () => {
            conmmonService.getProvinceList().then(rps => {
                if(rps.status == 200){
                    $scope.cityList = rps.data;
                    $scope.cityList.unshift({regionCode:'',regionName:'全部',active:true})
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.getProvinceList();
        //选定角色
        $scope.selectRole=(item)=>{
            operationService.checkRoleHasConsultAuthority(item.roleId).then(res=>{
               if(res.data){
               $scope.consultOrgList=res.data;
               }
            })
        }
        //初始化数据
        $scope.initData = () => {
            $scope.getRoleList(1,1000);
            //获取账号详情
            if(!$scope.id){return false};
            operationService.getOperationAccountDeails($scope.id).then(rps => {
                if(rps.status == 200){
                    $scope.accountObj = rps.data;
                    $scope.isBoy = $scope.accountObj.sex == 'M' ? true : false;
                    $scope.working = $scope.accountObj.statusDesc == '在职' ? true : false;
                    if($scope.accountObj.consultOrgIdList&&$scope.accountObj.consultOrgIdList.length){
                        $scope.consultOrgList=true;
                        $scope.getHospitalLists('',$scope.accountObj.consultOrgIdList)
                    }
                    // console.log(rps.data)
                    $scope.accountObj.roleId = $scope.accountObj.roleId ? $scope.accountObj.roleId[0] : null;
                    $scope.obj.logoSrc = $scope.accountObj.headPicUrl;

                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };
        $scope.initData();
        

        //save
        $scope.save = () => {
        	//校验姓名
            if(!$scope.accountObj.name || $scope.accountObj.name.length < 1){
	            toastr.warning('姓名不能为空！',null,3000);
	                return false;
            }
         //校验手机号
            let regPhoneNo = /^1\d{10}$/;
            if(!$scope.accountObj.phoneNo || !regPhoneNo.test($scope.accountObj.phoneNo)){
	            toastr.warning('请输入正确的手机号！',null,3000);
	                return false;
            }
        	//校验登录账号
        		let regUseCode = /^[A-Za-z\d]{6,16}$/;
            if(!$scope.accountObj.userCode || $scope.accountObj.userCode.length < 1 || !regUseCode.test($scope.accountObj.userCode)){
	            toastr.warning('登录账号必须是6到16位的大小写字母以及数字！',null,3000);
	                return false;
            }
        	//创建时校验密码
            if($scope.id == null){
	            	 let regPassword = /^[A-Za-z\d]{6,16}$/;
	            if(!$scope.accountObj.password || !regPassword.test($scope.accountObj.password)){
	                toastr.warning('输入的密码必须是6到16位的大小写字母以及数字！',null,3000);
	                return false;
	            }
            }
          //校验确认密码
	        	if($scope.accountObj.confirmPassword != $scope.accountObj.password){
	                toastr.warning('确认密码与输入的密码不一致，请重新输入！',null,3000);
	                return false;
	            }
        	//校验所属角色
            if(!$scope.accountObj.roleId){
	            toastr.warning('请选择所属角色！',null,3000);
	                return false;
            }
            let num = 0;
            let passwordCheck = ['password','confirmPassword'];
            let madancountArr = ['name','phoneNo','userCode','roleId']; //,'country'
            if(!$scope.id){
                madancountArr.concat(passwordCheck);
            }
            madancountArr.forEach(ele => {
                if(!$scope.accountObj[ele]){num += 1;}
            });
            if(num > 0){
                toastr.warning('请完善必填项内容！',null,2000);
                return false;
            }
            let newObj = angular.copy($scope.accountObj);
            newObj.status = $scope.working ? 1 : 0;
            newObj.sex = $scope.isBoy ? 'M' : 'F';
            newObj.birthday = moment(newObj.birthday).format('YYYY-MM-DD');
            if($scope.chooisesList.length){
                newObj.consultOrgIdList=[];
                _.each($scope.chooisesList,function(item){
                    newObj.consultOrgIdList.push(item.orgId)
                })
                newObj.consultOrgIdList= [...new Set(newObj.consultOrgIdList)];
            }
            operationService.addOrEditOperation(newObj).then(rps => {
                if(rps.status == 200){
                    if($scope.id){
                        toastr.success('运营账号修改成功！',null,3000);
                    }else{
                        toastr.success('新建运营账号成功！',null,3000);
                    }
                    $state.go('dryad.system.operating-account.list',{pageindex:$scope.pageindex,searchkey:$scope.searchkey});
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
        };

        //密码长度判断
        $scope.passwordLength = () => {
            let regPassword = /^[A-Za-z\d]{6,16}$/;
            if(!regPassword.test($scope.accountObj.password)){

                return false;
            }
        };

        //cancel
        $scope.cancel = () => {
            $state.go('dryad.system.operating-account.list',{pageindex:$scope.pageindex,searchkey:$scope.searchkey});
        };

        //print
        $scope.print = () => {
            window.print('ddd');
        };

        //download
        $scope.download = () => {
            window.open($scope.ewm);
        };
    }
}
SystemAccountDetailsCtrl.$inject = ['$scope', '$stateParams','$state','$uibModal','operationService','conmmonService','toastr'];
module.exports = (ngMold) => {
    require.ensure(['../../service/operation-services'],(require) => {
        require('../../service/operation-services')(ngMold);
    },'./system/operation-services');
    ngMold.controller('systemAccountDetailsCtrl', SystemAccountDetailsCtrl);
}