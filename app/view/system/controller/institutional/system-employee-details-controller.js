require('../../../../../images/default-logo.png');
class SystemEmployeeDetailsCtrl {
    constructor($scope, $stateParams,$state,$uibModal,systemService,toastr,conmmonService,$q,_,$timeout) {
        $scope.id = $stateParams.id || null;
        let promisArr = [];
        $scope.title = $scope.id ? '修改员工' : '新增员工';

        $scope.otherObj = {
            headPicUrl:`/images/default-logo.png`
        }
		$scope.checkPhoneNo = ()=>{
			let regPhone = /^[0-9]*$/ig;
			if(!regPhone.test($scope.departmentObj.phoneNo)){
				$scope.departmentObj.phoneNo = null;
				return false;
			}
			if($scope.departmentObj.phoneNo.length>11){
				$scope.departmentObj.phoneNo = $scope.departmentObj.phoneNo.substr(0,11)
			}
		}
        
        $scope.departmentObj = {
            dateKeyboarder:false
        };
        
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
                $scope.otherObj.headPicUrl = result.imgSrc;
                conmmonService.saveimGroupUpload(files).then(rps => {
                    if(rps.status == 200){
                        $scope.departmentObj.headPicId = rps.data; //头像ID
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
            });
        }
        
        //获取科室列表
        let deptList = conmmonService.getDepartmentList(1,1000).then(rps => {
            if(rps.status == 200){
                $scope.departmentList = rps.data;
//              let result = [];
//              rps.data.forEach(function(a){
//              		console.log(a)
//              		if(a.status == 1){
//              			result.push(a)
//              		}
//              })
//              $scope.departmentList = result;
//              if($scope.id){
//              	$scope.departmentList = rps.data;
//              }
            }
        });
        //获取角色列表
        let roleList = systemService.getDoctorList(1,1000).then(rps => {
            if(rps.status == 200){
                $scope.roleList = rps.data;
            }
        });
        //获取职称列表
        let jobTitle = conmmonService.getJobTitleLsit(1,1000).then(rps => {
            if(rps.status == 200){
                $scope.jobTitleList = rps.data;
            }
        });
        promisArr.push(deptList,roleList,jobTitle);
        
        // 初始化数据
        $scope.initData = () => {
            $q.all(promisArr).then(() => {
                if(!$scope.id){return false;}
                systemService.queryDoctorInformation($scope.id).then(rps => {
                    if(rps.status == 200){
                        $scope.departmentObj = rps.data;
                        $scope.departmentObj.roleId = $scope.departmentObj.roleId[0];
                        $scope.isBoy = $scope.departmentObj.sex == 'M' ? true : false;
                        $scope.working = $scope.departmentObj.statusDesc == '在职' ? true : false;
                        $scope.departmentObj.dateKeyboarder = $scope.departmentObj.dateKeyboarder == 1 ? true : false;
                        if($scope.departmentObj.headPicUrl){
                        		$scope.otherObj.headPicUrl = angular.copy($scope.departmentObj.headPicUrl);
                        }
                        $scope.otherObj.qrCodeUrl = angular.copy($scope.departmentObj.qrCodeUrl);
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
            });
        };
        $scope.initData();
        
        //print
        $scope.print = () => {
			var popupWin = window.open('', '_blank');
            var headstr = "<html><head><title></title></head><body  style='display:flex;justify-content:center;align-items:center;'>";
			var footstr = "</body>";
			var str = `
			<div class="print-main" style="overflow:hidden;width:400px;border:1px solid #00a6c9;padding:10px;">
				<div class="print-main-top" style="overflow:hidden;">
					<div class="print-main-top-l" style="float:left;margin-left:40px;margin-right:80px;overflow: hidden;margin-top: 20px;border-radius:50%;">
						<div class="print-headimg" style="width:100px;height:100px;">
							<img style="width:100px;height:100px;" src=`+$scope.otherObj.headPicUrl+` alt="员工头像">
						</div>
					</div>
					<div class="print-main-top-r" style="float:left;">
						<p>姓名:<span>`+$scope.departmentObj.name+`</span></p>
						<p>职业:<span>`+$scope.departmentObj.roleName+`</span></p>
						<p>科室:<span>`+$scope.departmentObj.deptName+`</span></p>
					</div>
				</div>
				<div class="print-qrimg" style="text-align:center;">
					<img style="width:240px;height:240px;" src=`+$scope.departmentObj.qrCodeUrl+` alt="员工二维码">
				</div>
			</div>
			`
			popupWin.document.write(headstr + str + footstr);
            popupWin.document.close();
            popupWin.focus();
            $timeout(function(){
            		popupWin.print();
            })
        };

        //download
        $scope.download = () => {
            var popupWin = window.open('', '_blank');
            var headstr = "<html><head><title></title></head><body  style='display:flex;justify-content:center;align-items:center;'>";
			var footstr = "</body>";
			var str = `
			<div class="print-main" style="overflow:hidden;width:400px;border:1px solid #00a6c9;padding:10px;">
				<div class="print-main-top" style="overflow:hidden;">
					<div class="print-main-top-l" style="float:left;margin-left:40px;margin-right:80px;overflow: hidden;margin-top: 20px;border-radius:50%;">
						<div class="print-headimg" style="width:100px;height:100px;">
							<img style="width:100px;height:100px;" src=`+$scope.otherObj.headPicUrl+` alt="员工头像">
						</div>
					</div>
					<div class="print-main-top-r" style="float:left;">
						<p>姓名:<span>`+$scope.departmentObj.name+`</span></p>
						<p>职业:<span>`+$scope.departmentObj.roleName+`</span></p>
						<p>科室:<span>`+$scope.departmentObj.deptName+`</span></p>
					</div>
				</div>
				<div class="print-qrimg" style="text-align:center;">
					<img style="width:240px;height:240px;" src=`+$scope.departmentObj.qrCodeUrl+` alt="员工二维码">
				</div>
			</div>
			`
			popupWin.document.write(headstr + str + footstr);
            popupWin.document.close();
            popupWin.focus();
            $timeout(function(){
            		popupWin.print();
            })
        };
        
        //save
        $scope.save = () => {
        	    //校验员工姓名
            if(!$scope.departmentObj ||!$scope.departmentObj.name || $scope.departmentObj.name.length < 1){
	            toastr.warning('员工姓名不能为空！',null,3000);
	                return false;
            }
        		//校验手机号
            let regPhoneNo = /^1\d{10}$/;
            if(!$scope.departmentObj.phoneNo || !regPhoneNo.test($scope.departmentObj.phoneNo)){
	            toastr.warning('请输入正确的联系电话！',null,3000);
	                return false;
            }
            //校验邮箱
            let regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if(!$scope.departmentObj.email|| !regEmail.test($scope.departmentObj.email)){
	            toastr.warning('请输入正确的邮箱！',null,3000);
	                return false;
            }
            //校验职称
            if(!$scope.departmentObj.titles || $scope.departmentObj.titles.length < 1){
	            toastr.warning('请输入职称！',null,3000);
	                return false;
            }
            //校验简介
            if(!$scope.departmentObj.baseInfo || $scope.departmentObj.baseInfo.length < 1){
	            toastr.warning('请输入简介！',null,3000);
	                return false;
            }
            //校验擅长
            if(!$scope.departmentObj.goodAt || $scope.departmentObj.goodAt.length < 1){
	            toastr.warning('请输入擅长领域！',null,3000);
	                return false;
            }
            //校验科室
            if(!$scope.departmentObj.deptId){
	            toastr.warning('请选择科室！',null,3000);
	                return false;
            }
            //校验角色
            if(!$scope.departmentObj.roleId){
	            toastr.warning('请选择角色！',null,3000);
	                return false;
            }
            //新建时校验登录密码
            if(!$scope.id){
            		let regPassword = /^[A-Za-z\d]{6,16}$/;
            		if(!$scope.departmentObj.password || !regPassword.test($scope.departmentObj.password)){
            			toastr.warning('输入的密码必须是6到16位的大小写字母以及数字！',null,4000);
	                return false;
            		}
            }
            //校验确认密码
            if($scope.departmentObj.confirmPassword !== $scope.departmentObj.password){
	            toastr.warning('确认密码与输入的密码不一致！',null,3000);
	                return false;
            }
            
        	
//          $scope.cheackMandatory();
//          if($scope.errNum > 0){
//              toastr.warning('请完善必填项内容！',null,3000);
//              return false;
//          }
//          if($scope.formatErr == 1){
//              toastr.warning('输入的手机号码格式不正确！',null,3000);
//              return false;
//          }else if($scope.formatErr == 2){
//              toastr.warning('输入的邮箱格式不正确！',null,3000);
//              return false;
//          }else if($scope.formatErr == 3){
//              toastr.warning('输入的密码必须是6到16位的大小写字母以及数字！',null,4000);
//              return false;
//          }else if($scope.formatErr == 4){
//              toastr.warning('确认密码与输入的密码不一致！',null,3000);
//              return false;
//          }


            let obj = angular.copy($scope.departmentObj);
            obj.sex = $scope.isBoy ? 'M' : 'F';
            obj.status = $scope.working ? 1 : 0;
            obj.dateKeyboarder = $scope.departmentObj.dateKeyboarder ? 1 : 0;
            obj.userCode = $scope.departmentObj.phoneNo;
            obj.birthday = moment(obj.birthday).format('YYYY-MM-DD');
            delete obj.headPicUrl;
            delete obj.deptName;
            delete obj.statusDesc;
            systemService.saveOrEditInformation(obj).then(rps => {
                if(rps.status == 200){
                		if($scope.id){
                		    toastr.success('员工修改成功！',null,3000);
	
                		}else{
                			toastr.success('员工新增成功！',null,3000);
                		}
                    $state.go('dryad.system.institutional-management.list.employee',{pageindex:$stateParams.pageindex,searchkey:$stateParams.searchkey});
                }else{
                    toastr.error(rps.errorMessage,null,3000);
                }
            });
            
        };

        //cancel
        $scope.cancel = () => {
            $state.go('dryad.system.institutional-management.list.employee',{pageindex:$stateParams.pageindex,searchkey:$stateParams.searchkey});
        };


    }
}
SystemEmployeeDetailsCtrl.$inject = ['$scope', '$stateParams','$state','$uibModal','systemService','toastr','conmmonService','$q','_','$timeout'];
module.exports = (ngMold) => {
    require.ensure(['../../service/system-service'], (require) => {
        require('../../service/system-service')(ngMold);
    }, './system/system-service');
    ngMold.controller('systemEmployeeDetailsCtrl', SystemEmployeeDetailsCtrl);
}