class SpecialAsthmaCtrl {
    constructor($scope, $stateParams,medicalService,toastr,$cookies,$uibModal,$rootScope,$state) {
        console.log('this is medical history speical asthma!');
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        var isChange=false;
        self.transform={}
        //锚点，切换tab
        self.navs = [
//          {name:"哮喘类型",id:"asthma-type"},
        ];
        $scope.specialAsthma={          //特殊类型哮喘
            "asthmaTypes":{
              "type":2,               //哮喘类型
              "list":[
                {"name":"咳嗽变异性哮喘",status:null},
                {"name":"胸闷变异性哮喘",status:null},
                {"name":"阿司匹林药物诱发性哮喘",status:null},
                {"name":"哮喘 - 慢阻肺重叠",status:null},
                {"name":"妊娠期哮喘",status:null},
                {"name":"月经期哮喘",status:null},
                {"name":"脆性哮喘",status:null},
                {"name":"职业性哮喘",status:null},
                {"name":"重度哮喘",status:null},
                {"name":"激素依赖性哮喘",status:null}
              ]
            },
            "asthmaTable":{},
            "momo":'',
            "asythmaSpecialTypes":{}
          }
          //初始化时间
          if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        self.info=()=>{
        medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid,self.activeTab.params.rid,'specialdryad').then(function (res) {
            if(res.status==200){
                if(res.data.specialAsthma&&res.data.specialAsthma){
                    self.specialAsthma=res.data.specialAsthma;
                }
            }else{
                self.specialAsthmaCopy=angular.copy(self.specialAsthma);
                toastr.error(res.errorMessage, null, 3000);
            }
            self.specialAsthmaCopy=angular.copy(self.specialAsthma);
            })
        }
         $scope.info();
            //监听数据是否变化
            //路由相关变化
            var numbers=0;
            $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
            if(fromState.name=='dryad.medicalhistory.details.special-asthma'){
                numbers++; 
                if(numbers==1){
                    _.each($scope.tabData,function(a,i){
                        if(a.route==toState.name){   //找到路由切换
                            var isTrue=true;
                            _.each(self.specialAsthma.asthmaTypes.list,function(a,i){
                               if(a.status!=self.specialAsthmaCopy.asthmaTypes.list[i].status){
                                isTrue=false
                               };
                            })
                            if(!isTrue || self.specialAsthmaCopy.momo!=self.specialAsthma.momo){
                                event.preventDefault(); 
                                $scope.deleteModal('当前信息还未保存，是否保存？',i)
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
            $('.activeInput').focus();
            $scope.tabData.active=5;
            numbers=0;
            }else if(result=='save'){
                self.saveData(true,index);
               }
            });
            };
         self.saveData = function (flag,index) {
            var dataList={
                medicalRecordInfo:{}
            }
            dataList.medicalRecordId=$stateParams.rid;
            dataList.medicalRecordInfo=self.specialAsthma;
            medicalService.savePatientMedicalRecordDetailPart('SpecialAsthma',dataList).then(function(data){
            	if(data.status==200){
                    isTrue=false;
                    toastr.success('保存成功', null, 3000);
                    self.specialAsthmaCopy=angular.copy(self.specialAsthma);
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
SpecialAsthmaCtrl.$inject = ['$scope', '$stateParams','medicalService','toastr','$cookies','$uibModal','$rootScope','$state'];
module.exports = (ngMold) => {
    ngMold.controller('specialAsthmaCtrl', SpecialAsthmaCtrl);
}