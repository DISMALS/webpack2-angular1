require('../../../../images/severityofdisease.png');
class MedicalhistoryDiagnosisCtrl {
    constructor($scope, $stateParams, medicalService,toastr,$cookies,conmmonService,$rootScope,$uibModal,$state) {
        console.log('this is medical history disgnosis!');
        const self = $scope;
        $scope.diseaseimg = 'severityofdisease.png';
        self.activeTab = self.$parent.activeTab;
        self.initInfo ={
            "diseaseStage":{
                "state":null
            },
            "sod":{
                "state":null
            },
            "sodSub":{
                "state":null
            }
        }
		$scope.init=function(){
			medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid, self.activeTab.params.rid,'diagnose').then(function(data){
				if(data.status==200){
					if(data.data.diagnose){
                        self.initInfo=data.data.diagnose;
                        self.initInfoCopy=angular.copy(self.initInfo)
					}else{
                        self.initInfoCopy=angular.copy(self.initInfo)
                    }
					
				}else{
					toastr.error(data.errorMessage);
				}
            })
            //病情分期字典
            conmmonService.getDiseaseStageList().then((res)=>{
                self.diseaseStageList=res.data;
            })
            //疾病严重程度
            conmmonService.getDiseaseLevelStatusList().then((res)=>{
                self.sodList=res.data;
            })
            
            //病情严重程度
            conmmonService.getIllnessStageList().then((res)=>{
                self.sodSubList=res.data;
            })
        }
          //初始化数据
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
        return false;
    }
      $scope.init();
          //路由相关变化
          var numbers=0;
          $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => { 
            if(fromState.name=='dryad.medicalhistory.details.diagnosis'){
                numbers++;
                if(numbers==1){
                    _.each($scope.tabData,function(a,i){
                        if(a.route==toState.name){
                            self.initInfoCopy2=angular.copy(self.initInfo);
                           if(!(self.initInfoCopy2.diseaseStage&&self.initInfoCopy2.diseaseStage.state==self.initInfoCopy.diseaseStage.state&&self.initInfoCopy2.sod.state==self.initInfoCopy.sod.state&&self.initInfoCopy2.sodSub.state==self.initInfoCopy.sodSub.state)){
                               event.preventDefault(); 
                                //删除确认弹窗
                                $scope.deleteModal('当前诊断信息未保存，是否保存？',i)
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
                if(self.initInfo.diseaseStage.state){
                    _.each(self.diseaseStageList,function(a,i){
                        if(a.dictItemValue==self.initInfo.diseaseStage.state)
                        $('.diagnose-content .row:eq(0) .col-lg-9 label:eq('+i+')').focus()
                    })
                }
            else if(self.initInfo.sod.state){
                _.each(self.sodList,function(a,i){
                    if(a.dictItemValue==self.initInfo.diseaseStage.state)
                    $('.diagnose-content .row:eq(1) .col-lg-9 label:eq('+i+')').focus()
                })
                }
            else if(self.initInfo.sodSub.state){
                    _.each(self.sodSubList,function(a,i){
                        if(a.dictItemValue==self.initInfo.diseaseStage.state)
                        $('.diagnose-content .row:eq(2) .col-lg-9 label:eq('+i+')').focus()
                    })
                    // $('.diagnose-content .row:eq(2) .col-lg-9 label:eq('+self.initInfo.sodSub.state+')').focus()
                }
                $scope.tabData.active=3;
                numbers=0;
           }else if(result=='save'){
            self.saveData(true,index);
           }
        });
    };
    
        self.saveData = function (flag,index) {
        	 var dataList={}
            dataList.medicalRecordId=$stateParams.rid;
            dataList.medicalRecordInfo=self.initInfo
        	medicalService.savePatientMedicalRecordDetailPart('Diagnose',dataList).then(function(data){
        		if(data.status==200){
                    self.initInfoCopy=angular.copy(self.initInfo)
                    toastr.success('保存成功');
                    self.$emit('index',{index:4,rid:data.data});
                    if(flag){
                        $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
                    }
            	}else{
            		toastr.error(data.errorMessage);
            	}
        	})
            // console.log(self.initInfo)
        }
        $("[data-toggle='feno']").popover({
            trigger:'hover',
            html:true
        });
    }
}
MedicalhistoryDiagnosisCtrl.$inject = ['$scope', '$stateParams', 'medicalService','toastr','$cookies','conmmonService','$rootScope','$uibModal','$state'];
module.exports = (ngMold) => {
    require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalhistoryDiagnosisCtrl', MedicalhistoryDiagnosisCtrl);
}