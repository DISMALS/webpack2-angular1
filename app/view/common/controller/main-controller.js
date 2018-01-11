let menuList = require('../../../config/data/menu.json');
require('../../../../images/practice.png');
require('../../../../images/default-logo.png');
class MainCtrl {
    constructor($rootScope, $scope, $state, mainService, $uibModal, $cookies, $q,toastr,_) {
        $scope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
        if(!$scope.user){
            $state.go('authorize.login');
            return false;
        }

        $scope.practiceimg = $scope.user.orgIconUrl || 'images/practice.png'; //医院logo
        $scope.userimg = $scope.user.employeeHeadPicUrl || 'images/default-logo.png'; //用户头像
        $scope.name = $scope.user.name || $scope.user.username || '' ;
        $scope.searchList = [];
        $scope.searchBtn = false;
        

        //初始化数据
        let initData = () => {
            // console.log(menuList);
            $scope.menuList = menuList;
            // mainService.test().then(function(data) {
            //     $scope.menuList = data;
            // });
        }
        initData();

        //搜索患者
        $scope.searchValue = (keyword) => {
            if(keyword == ''){return false;}
            let obj = {
                keyword,
                doctorId:$scope.user.employeeId,
                pageNo:1,
                listSize:10000
            }
            mainService.searchPatients(obj).then((data) => {
                $scope.searchBtn = true;
                $scope.$broadcast('searchResult',{result:$scope.searchBtn});
                if(data.status == 200){
                    $scope.searchList = data.data || [];
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };

        //首页详情
        $scope.$on('homeDetails',(ev,obj) => {
            $scope.homeDetailsValue = obj.value;
            $scope.homeDetails = true;
        });

        //返回首页
        $scope.goBack = () => {
            $state.go('dryad.home.main');
        };

        //左侧菜单点击事件
        $scope.toggles = (scope, node) => {
            if (node.child && node.child.length > 0) {
                scope.toggle();
            } else { //直接跳转路由
                $state.go(node.state);
            }
        };

        //新建病历
        $scope.medicalRecords = (flag) => {
            //判断当前是否有正在新建的病历
            let account = $cookies.get('createAccount');
            // if(account && account !=0){
            //     toastr.warning('当前还有病历正在新建！',null,3000);
            //     return false;
            // }
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/check-number.html'),
                controller: 'checkCtrl',
                controllerAs: 'checkCtrlVm',
                size: 'width-60',
                resolve: {
                    items: function() {
                        return {
                            flag:flag || '',
                            action: 'ADD',
                        };
                    },
                    checkCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./check-controller'], (require) => {
                            const ctrl = require('./check-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/check-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                let obj = {};
                if(result.flag == 1){//初诊
                    obj.birthday=result.patients.birthday;
                    obj.name=result.patients.name;
                    obj.sex=result.patients.sex;
                    obj.doctorId=result.patients.doctorId;
                    $scope.createHis(obj,1);
                }else if(result.flag == 3){ //通过新增患者未搜索到患者时的确认弹窗
                    $scope.deleteModal(result);
                }else{//复诊
                    obj.patientId = result.patients.patientId;
                    obj.doctorId = result.patients.doctorId;
                    $scope.createHis(obj,2);
                }
            });
        };

        //新增病历主函数
        $scope.createHis = (obj,flag) => {
            mainService.createMedicalRecordByPatients(obj).then((data) => {
                if(data.status == 200){
                    let recordData = data.data;
                    let newObj;
                    if(flag == 1){ //初诊时
                        newObj = _.extend(data.data,obj);
                    }else if(flag == 3){ 
                        newObj = _.extend(data.data,obj);
                    }else{ //复诊时
                        newObj = recordData;
                    }
                    // $state.go('dryad.medicalhistory.search',{createRecord:patient});
                    $state.go('dryad.medicalhistory.search',{createRecord:newObj});
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        }


        //删除确认弹窗
        $scope.deleteModal = (patinet) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/delete-modal.html'),
                controller: 'deleteModalCtrl',
                controllerAs: 'deleteModalCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            patinet:patinet || null,
                            content: patinet ? '未搜索到匹配的患者，点击确认新增患者' : '删除后不可恢复，确定要删除该选项么？'
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./delete-modal-controller'], (require) => {
                            const ctrl = require('./delete-modal-controller')(require('../../../common/module'));
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
                if(patinet){ //没有搜索到患者时，新增病历
                    let obj = {};
                    obj.birthday=patinet.patients.birthday;
                    obj.name=patinet.patients.name;
                    obj.sex=patinet.patients.sex;
                    obj.doctorId=patinet.patients.doctorId;
                    $scope.createHis(obj,3);
                }
            });
        };
		//个人信息
		$scope.personInfo = () => {
			$uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/person-info.html'),
                controller: 'openPersonInfoCtrl',
                controllerAs: 'personInfoVm',
                size: 'width-850',
                resolve: {
                    items: function() {
                        return {
                            title: '个人信息'
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./person-info-controller'], (require) => {
                            const ctrl = require('./person-info-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/open-person-info-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            			delete result.headPicUrl;
                  mainService.saveOrEditInformation(result).then(rps => {
		                if(rps.status == 200){
		                			mainService.queryDoctorInformation(result.employeeId).then(rps=>{
		                				if(rps.status == 200){
		                					console.log(rps.data.headPicUrl)
		                					let headPicUrl = rps.data.headPicUrl;
		                					$scope.user.employeeHeadPicUrl = headPicUrl;
				                			$scope.user.name = result.name;
				                			$cookies.putObject('user',$scope.user);
				                			toastr.success('修改成功！',null,3000);
				                			$scope.userimg = headPicUrl;
				                			$scope.name = result.name;
		                				}else{
		                					toastr.error(rps.errorMessage,null,3000);
		                				}
		                			})
		                }else{
		                    toastr.error(rps.errorMessage,null,3000);
		                }
		            });
		            
                
            });
		}
        //修改密码
        $scope.editPassWord = () => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/edit-password.html'),
                controller: 'editPasswordCtrl',
                controllerAs: 'editPasswordVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '修改密码'
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./edit-password-controller'], (require) => {
                            const ctrl = require('./edit-password-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/edit-password-ctrl');
                        return deferred.promise;
                    }
                }
            })
        };

        //锁屏
        $scope.lock = () => {
            $state.go('authorize.lock', {
                nowroute: $state.$current.name
            });
        };
        //退到首页
        $scope.$on('tokenInvalid',(event,data)=>{
            $scope.signOut();
        })
        //退出
        $scope.signOut = () => {
            mainService.logOut($scope.user.username).then((data) => {
                if(data.status == 200){
                    let cookies = $cookies.getAll();
                    window.sessionStorage.clear();
                    for (let item in cookies) {
                        if(item != 'remmeberUsername'){
                            $cookies.remove(item);
                        }
                    }
                    $state.go('authorize.login');
                }
            });
        };
        

        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            if (fromState.name && toState.name == 'authorize.lock') {
                $cookies.put('lockroute', fromState.name);
            }
        });
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            if(!$state.includes("dryad.home.module.**")){
                $scope.homeDetails = false;
            }else{
                $scope.homeDetails = true;
            }
             $('.hidetip').hide();
        });
    };
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'mainService', '$uibModal', '$cookies', '$q','toastr','_'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        require('../service/main-service')(ngMold);
    }, './common/main-serve');
    ngMold.controller('mainCtrl', MainCtrl);
}