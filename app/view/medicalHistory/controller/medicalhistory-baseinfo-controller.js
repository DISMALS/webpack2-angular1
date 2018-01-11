class MedicalhistoryBaseinfoCtrl {
    constructor($scope, $stateParams, _, medicalService,toastr,$cookies,$rootScope,$state,$uibModal) {
        var self = $scope;
        $scope.user = JSON.parse($cookies.get('user'));
        // 从父级中拿到选中的tab
        // console.log(self.$parent)
        self.parentTabList=self.$parent.parentTabList;//历史tab页
        self.activeTab = self.$parent.activeTab;
        // console.log(self.activeTab)
        self.goNextTab=false;
        // console.log($stateParams)
        // self.newMedicalRecord = $cookies.get('newCreateMedicalRecord') ? JSON.parse($cookies.get('newCreateMedicalRecord')) : null;
         	// console.log($cookies.get('newCreateMedicalRecord')) //新建病历需要更改数据
        self.baseInfo={
            "caseId": "",
            "patientName": "",
            "sex": "M",
            "dob": "",
            "nation": "",
            "patientHeight": '',
            "patientWeight": '',
            "bmi": "",
            "education": "",
            "job": "",
            "mobilePhone": "",
            "telePhone": "",
            "receptDoctor": "",
            "address": {
                "province":'',
                "city":'-1',
                "country":'-1'
            }
        };
        self.address = {
            province: [{regionCode: "-1", regionName: '---省---' }],
            city: [{ regionCode: "-1", regionName: '---市---' }],
            country: [{ regionCode: "-1", regionName: '---县---'}]
        };
        self.nationArr = [];
        self.educationArr = [];
        self.jobArr = [];
        self.baseInfoCopy=angular.copy(self.baseInfo)
        //初始化数据
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        self.init=()=>{
            
            //初始化数据 
        medicalService.getPatientMedicalPatientInfo(self.activeTab.params.pid,self.activeTab.params.rid).then(function (res) {
            self.baseInfo = res.data;
            // console.log(self.baseInfo)
            if(self.baseInfo){
                if(self.baseInfo.education!=''){
                     self.baseInfo.education=parseInt(self.baseInfo.education);
                     if(!self.baseInfo.education){
                       self.baseInfo.education='';
                     }
                }
              if(self.baseInfo.nation!=''){
                   self.baseInfo.nation=parseInt(self.baseInfo.nation); 
                   if(!self.baseInfo.nation){
                       self.baseInfo.nation='';
                   }	
              }
              if(self.baseInfo.job!=''){
                self.baseInfo.job=parseInt(self.baseInfo.job);
                if(!self.baseInfo.job){
                   self.baseInfo.job='';
               }	
              }
              if(parseInt(self.baseInfo.receptDoctor)>0){
                self.baseInfo.receptDoctor=parseInt(self.baseInfo.receptDoctor);
                if(!self.baseInfo.receptDoctor){
                   self.baseInfo.receptDoctor='';
               }	
              }else{
                //   console.log('zouleme')
                  let isEmployeeId=false;
                _.each(self.itemArr,function(a){
                    if(a.employeeId==$scope.user.employeeId){
                        self.baseInfo.receptDoctor=parseInt($scope.user.employeeId);
                        isEmployeeId=true;
                    }
                 })
                 if(!isEmployeeId){
                    self.baseInfo.receptDoctor=''
                 }
               }
           //    self.baseInfo.receptDoctor=parseInt(self.baseInfo.receptDoctor);
              if(self.baseInfo.patientWeight||self.baseInfo.patientHeight){
                  self.baseInfo.bmi=(parseInt(self.baseInfo.patientWeight)/parseInt(self.baseInfo.patientHeight)*2).toFixed(2);
              }else{
                  self.baseInfo.patientWeight='';
                      self.baseInfo.patientHeight=''
              }
               if(self.baseInfo.address.city&&self.baseInfo.address.city!='-1'){
                   medicalService.getRegionByParentCode(self.baseInfo.address.province).then(function (res) {
                       self.address.city = res.data;
                       if(self.baseInfo.address.country&&self.baseInfo.address.country!='-1'){
                           medicalService.getRegionByParentCode(self.baseInfo.address.city).then(function (res) {
                               self.address.country = res.data;
                           })
                       }
                   })
               }
               if(!self.baseInfo.address.city){
                   self.baseInfo.address.city='-1'
               }
               if(!self.baseInfo.address.province){
                   self.baseInfo.address.province=''
               }
               if(!self.baseInfo.address.country){
                   self.baseInfo.address.country='-1'
               }
           }
           self.baseInfoCopy=angular.copy(self.baseInfo)
       })
        }
        
        self.$watch('baseInfo.patientWeight',function(){
        	if(self.baseInfo&&self.baseInfo.patientWeight&&self.baseInfo.patientHeight){
        	let bmis=(parseInt(self.baseInfo.patientWeight)/(parseInt(self.baseInfo.patientHeight)*parseInt(self.baseInfo.patientHeight)/10000)).toFixed(2)
                self.baseInfo.bmi=bmis==NaN?0:bmis;
        	}else{
                self.baseInfo.bmi = '';
        	}
        })
         self.$watch('baseInfo.patientHeight',function(){
           if(self.baseInfo&&self.baseInfo.patientWeight&&self.baseInfo.patientHeight){
        	let bmis=(parseInt(self.baseInfo.patientWeight)/(parseInt(self.baseInfo.patientHeight)*parseInt(self.baseInfo.patientHeight)/10000)).toFixed(2)
                self.baseInfo.bmi=bmis==NaN?0:bmis;
        	}else{
                self.baseInfo.bmi = '';
        	}
        })
        var numbers=0;
        //路由相关变化
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
            // console.log('切换路由')
            // console.log(JSON.parse($cookies.get('historytabs')))
            if(fromState.name=='dryad.medicalhistory.details.baseinfo'){
                numbers++;
                if(numbers==1){
                    _.each($scope.tabData,function(a,i){
                        if(a.route==toState.name){
                            self.baseInfoCopy2=angular.copy(self.baseInfo);
                            self.baseInfoCopy2.dob=moment(self.baseInfoCopy2.dob).format('YYYY-MM-DD');
                            self.baseInfoCopy.dob=moment(self.baseInfoCopy.dob).format('YYYY-MM-DD');
                             delete self.baseInfoCopy.bmi;delete self.baseInfoCopy2.bmi;
                           if(!(JSON.stringify(self.baseInfoCopy)==JSON.stringify(self.baseInfoCopy2))){
                                // console.log(self.goNextTab)
                                if(self.goNextTab==false){
                                event.preventDefault(); 
                                //删除确认弹窗
                                 $scope.deleteModal('当前病历还未保存，是否保存？',i)
                                 
                               }
                            } 
                           
                        }
                    })
                }
               
            }
        });
       //删除确认弹窗
       $scope.deleteModal = (patinet,index) => {
        $uibModal.open({
            animation: true,
            backdrop: 'static',
            template: require('../html/medicalhistory-delete.html'),
            controller: 'delectMedicalhistoryCtrl',
            controllerAs: 'delectMedicalhistoryCtrlVm',
            size: 'width-400',
            resolve: {
                items: function() {
                    return {
                        title: '提示',
                        patinet:patinet || null,
                        content: patinet
                    };
                },
                deleteModalCtrl: ($q, $ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./medicalhistory-delete-controller'], (require) => {
                        const ctrl = require('./medicalhistory-delete-controller')(require('../../../common/module'));
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
           if(result=='noSave'){
            $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
           }else if(result=='cancle'){
            $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
            $('.medical-base-info table tr:eq(0) td:eq(1) input').focus()
            $scope.tabData.active=0;
            numbers=0;
           }else if(result=='save'){
            self.saveData(true,index);
           }
        });
    };
        //获取民族字典列表
        medicalService.getNation().then(function (res) {
            self.nationArr = res.data;
        })
        //获取教育程度字典列表
        medicalService.getEducation().then(function (res) {
            self.educationArr = res.data;
        })
        //获取职业列表
        medicalService.getJob().then(function (res) {
            self.jobArr = res.data;
        })
        //获取省份字典列表
        medicalService.getProvinceList().then(function (res) {
            // console.log(res.data)
            self.address.province = res.data
            self.address.provinceCopy=angular.copy(self.address.province);
            // self.address.province.unshift({regionCode:"-1", regionName: '---省---' })
        })
        //省份首拼过滤
        $scope.serchProvinceForm=(value)=>{
            // console.log(value)
            var reg = /([\u4e00-\u9fa5]+)/g; //匹配中文
                if (value == '' || value == null) {
                    self.address.province = self.address.provinceCopy;
                } else {
                    self.address.province = [];
                    if (reg.test(value)) { //中文
                        self.address.provinceCopy.forEach(function(item) {
                            if (item.regionName.indexOf(value) > -1) {
                                self.address.province.push(item);
                            }
                        });
                    } else { //字母、数字、特殊字符
                        value = value.toUpperCase();
                        // console.log(value)
                        for (var i = 0, len = self.address.provinceCopy.length; i < len; i++) {
                            self.address.provinceCopy[i].regionShortnameEn=self.address.provinceCopy[i].regionShortnameEn.toUpperCase();
                            if (self.address.provinceCopy[i].regionShortnameEn.indexOf(value) > -1) {
                                self.address.province.push(self.address.provinceCopy[i]);
                            }
                        }
                        // console.log(self.address.province)
                    }
            } 
        }
        //根据parentCode获取区域列表
        self.onSearchProvince = function(val) {
           medicalService.getRegionByParentCode(val.regionCode).then(function (res) {
               self.address.city = res.data
            //    self.address.city.unshift({ regionCode: "-1", regionName: '---市---' })
               self.address.country=[{ regionCode: "-1", regionName: '---县---'}];
            //    self.address.country.unshift({ regionCode: "-1", regionName: '---县---' })
               self.baseInfo.address.province =val.regionCode;
               self.baseInfo.address.city = self.address.city[0].regionCode;
               self.baseInfo.address.country =self.address.country[0].regionCode;
               
           })
        }
        //根据parentCode获取区域列表 region
        self.onSearchCity = function(val) {
            medicalService.getRegionByParentCode(val.regionCode).then(function (res) {
                if(res.data.length){
                    self.address.country = res.data
                }else{
                    self.address.country= [{ regionCode: "-1", regionName: '---县---'}];
                }
                self.baseInfo.address.city = val.regionCode;
                self.baseInfo.address.country = self.address.country[0].regionCode;
            })
        }
        self.onSearchRegion = function (val) {
            self.baseInfo.address.country = val.regionCode;
        }
		//获取医生列表
        self.getDoctorList = function(val) {
           medicalService.getDoctorList().then(function (res) {
               self.itemArr = res.data;
               self.init()
               
           })
        }
        $scope.isTrue=false
        self.getDoctorList();

        //输入框数字校验
        $scope.numCheck = (value,flag) => {
            if(flag == 1){ //身高、体重
                let reg = /^\d+.?\d*$/ig;
                if(!reg.test($scope.baseInfo[value])){
                    $scope.baseInfo[value] = '';
                }
            }else if(flag == 2){ //固定电话
                let regs = /^[\d{3,4}]-[\d{6,8}]/g;
                if(!regs.test($scope.baseInfo[value])){
                    toastr.warning('固定电话格式不正确！',null,3000);
                    $scope.baseInfo[value] = '';
                }
            }
            
        };

        //检查必填项
        var  checkRequired = function () {
			if($scope.baseInfo.patientName==''||$scope.baseInfo.patientName==null){
				return false
			}
			if($scope.baseInfo.mobilePhone==''||$scope.baseInfo.mobilePhone==null||($scope.baseInfo.mobilePhone+'').length!=11){
				return false
			}
			if($scope.baseInfo.receptDoctor==''||$scope.baseInfo.receptDoctor==null){
				return false
			}
			if($scope.baseInfo.address.city=='-1'){
				return false
			}
			if($scope.baseInfo.address.province=='-1'){
				return false
            }
            if(self.address.country.length>1&&$scope.baseInfo.address.country=='-1'){
				return false
            }
            if($scope.baseInfo.patientHeight==''){
				return false
			}
			if($scope.baseInfo.patientWeight==''){
				return false
            }
            return true;
        }
        $("[data-toggle='tooltip']").tooltip();
        self.saveData = function (flag,index) {
            if(!checkRequired()){
                toastr.warning('请填写完整的病历基本信息', null, 3000);
                if(flag){ 
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.medical-base-info table tr:eq(0) td:eq(1) input').focus()
                    $scope.tabData.active=0;
                    numbers=0;
                }
                return false;
        	}
            //校验手机号
            let regPhoneNo = /^1\d{10}$/;
            if(!$scope.baseInfo.mobilePhone || !regPhoneNo.test($scope.baseInfo.mobilePhone)){
                toastr.warning('请输入正确的手机号！',null,3000);
                if(flag){ 
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.medical-base-info table tr:eq(0) td:eq(1) input').focus()
                    $scope.tabData.active=0;
                    numbers=0;
                }
	           return false;
            }
            let patientHeight =/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
            if(!$scope.baseInfo.patientHeight || !patientHeight.test($scope.baseInfo.patientHeight)){
                toastr.warning('请输入正确的身高！',null,3000);
                if(flag){ 
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.medical-base-info table tr:eq(0) td:eq(1) input').focus()
                    $scope.tabData.active=0;
                    numbers=0;
                }
	                return false;
            }
            let patientWeight = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
            if(!$scope.baseInfo.patientWeight || !patientWeight.test($scope.baseInfo.patientWeight)){
                toastr.warning('请输入正确的体重！',null,3000);
                if(flag){ 
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.medical-base-info table tr:eq(0) td:eq(1) input').focus()
                    $scope.tabData.active=0;
                    numbers=0;
                }
	                return false;
            }
                self.baseInfo.medicalRecordId=$stateParams.rid;
        		self.baseInfo.dob=moment(self.baseInfo.dob).format("YYYY-MM-DD");
	        	self.baseInfo.doctorId=self.user.employeeId;
	        	self.baseInfo.patientId=$stateParams.pid;
                self.baseInfo.bmi=Number(self.baseInfo.bmi);
                self.baseInfo.firstVisit=self.activeTab.data.firstVisit;
	        	medicalService.savePatientMedicalPatientInfo(self.baseInfo).then(function(data){
	        		if(data.status==200){
                        self.goNextTab=true;
                        toastr.success('保存成功', null, 3000);
	        			self.$emit('index',{index:1,item:self.baseInfo});
                        //更新cookies中新建病历的标识值
                         $cookies.put('createAccount',0);
                         if(flag){
                            $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
                         }
	        		}else{
        				toastr.error(data.errorMessage, null, 3000);
        		}
        	})
        	}
    }
}
MedicalhistoryBaseinfoCtrl.$inject = ['$scope', '$stateParams', '_', 'medicalService','toastr','$cookies','$rootScope','$state','$uibModal']
module.exports = (ngMold) => {
    require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalhistoryBaseinfoCtrl', MedicalhistoryBaseinfoCtrl);
}