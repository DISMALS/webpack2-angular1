class TreatmentRegimenCtrl {
    constructor($scope,$timeout,$stateParams,medicalService,toastr,$cookies,$rootScope,$uibModal,$state,_, baseconfigDrugdictionaryService,conmmonService) {
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        var isChange=false;
        self.transform={}
        self.followlastplan = self.$parent.baseInfo.recoradType == '初诊'?false:true;
        self.cureOutline={        
		    "cpa":[
		    {
		      "category":'',      
		      "medicine":'',   
		      "dosageForm":'',
		      "timeUser":'', //药频
		      "timeNumber":'', //药数
              "treatment":'', //疗程
              "treatmentUnit":'月',  //疗程单位
		       "createTime":'',
		      }
		    ],
		    "isSameAsPre":null,    
		    "nextTime":""     
        };
        self.copyeMdicineDataList=[];
        self.copyDosageForm=[];
        self.copyFicationsList=[];
        
        self.initCpa={
		      "category":'', //药品类别 
		      "medicine":'',   //药品
		      "dosageForm":'',//剂型
		      'fications':'', //规格
		      "timeUser":'', //药频
		      "timeNumber":'', //药数
              "treatment":'', //疗程
              "treatmentUnit":'月',  //疗程单位
		       "createTime":'',
		      };

        //初始化加载
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        self.info=function(){
        	medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid, self.activeTab.params.rid,'solution').then(function (res) {
             if(res.status==200){
                 if(res.data&&res.data.cureOutline){
	               self.cureOutline=res.data.cureOutline;
	               angular.forEach(self.cureOutline.cpa,function(a,i){
                    //    a.dosageForm=parseInt(a.dosageForm)
	               		self.changeSelectCategory(a.category,i,true);
	               })
                 }
             }else{
             	toastr.error(res.errorMessage);
             }
            })
        }
            //初始化加载数据
           getCategoryList();
            self.info();
        
         //获取药品大类列表 1级
        function getCategoryList(obj){
               medicalService.getQueryDrugCategory().then(function (res) {
                 if(res.status==200){
                     self.categoryList=res.data;
                 }else{
                     toastr.error(res.errorMessage);
                 }
            })
        }
        //根据父级获取药品  2级
        //首拼搜索
       let time = null;
       self.serchDosageForm=(key,item,i)=>{
            medicalService.getQueryBaseConfig(item.category,key).then(function (res) {
                if(res.data!=null){
                        self.copyeMdicineDataList[i]=angular.copy(res.data);
                }else{
                    self.copyeMdicineDataList[i]=[];
                }
                })
        }
        //获取使用频次下拉列表
        conmmonService.getUseDrugFrequencyList().then(res=>{
           self.UseDrugFrequencyList=res.data;
        //    console.log(res.data)
        })
        //获取疗程单位
        conmmonService.getCourseOfTreatmentList().then(res=>{
            self.CourseOfTreatmentList=res.data;
            // console.log(res.data)
         //    console.log(res.data)
         })
        //搜索药物
       self.changeSelectCategory=(categoryId,i,type,key)=>{
       	 if(!type){
                self.cureOutline.cpa[i].medicine='';
                self.cureOutline.cpa[i].dosageForm='';
                self.cureOutline.cpa[i].fications='';
       	}
         medicalService.getQueryBaseConfig(categoryId,key).then(function (res) {
            if(res.status==200){
                self.medicineList=res.data;
                self.copyeMdicineDataList[i]=angular.copy(self.medicineList);
                if(type){
                    //如果是初始化 
                    self.changeDosageForm(self.cureOutline.cpa[i],self.cureOutline.cpa[i].medicine,i,type)
                }

            }else{
                toastr.error(res.errorMessage);
            }
        })
    }
     //搜索药物剂型
     self.changeDosageForm=(item,drugId,i,type,key)=>{
        if(!type){
            self.cureOutline.cpa[i].dosageForm='';
            self.cureOutline.cpa[i].fications='';
       }
        medicalService.queryDrugDosage(drugId).then(function (res) {
            if(res.status==200){
                let  DrugList=angular.copy(res.data);
                self.copyDosageForm[i]=DrugList;
                //如果是初始化 
                if(type){
                    angular.forEach(self.copyDosageForm[i],function(a){
                        if(a.dictItemValue=item.dosageForm){
                            self.changeFications(self.cureOutline.cpa[i],a,i,type)
                            return false;
                        }
                    })
                }
            }
        })
    }
    //搜索药物规格
    self.changeFications=(item,dosageForm,i,type)=>{
        if(!type){
            self.cureOutline.cpa[i].fications='';
       }
        medicalService.queryDrugDetailInfoList(item.medicine,dosageForm.dictItemValue).then(function (res) {
            if(res.status==200){
                self.copyFicationsList[i]=angular.copy(res.data);
            }else{
                toastr.error(res.errorMessage);
            }
        })
    }
       //添加用药列表
       self.addCpa=()=>{
       	let initCpa={
		      "category":'',      
		      "medicine":'',   
		      "dosageForm":'',
		      'fications':'',
		      "timeUser":'', //药频
		      "timeNumber":'', //药数
              "treatment":'', //疗程
              "treatmentUnit":'月',  //疗程单位
		       "createTime":'',
		      };

        self.cureOutline.cpa.push(initCpa);
       }
       //删除用药列表
       self.deletCpa=(index)=>{
        self.cureOutline.cpa.splice(index,1);
        self.copyeMdicineDataList.splice(index,1);
        self.copyDosageForm.splice(index,1);
        self.copyFicationsList.splice(index,1);
       }
       
        //保存
        self.saveData = function (flag,index) {
            var dataList={};
            let flage = true;
            _.each(self.cureOutline.cpa, (item) => {
                if ( !item.category || !item.createTime || !item.dosageForm || ! item.fications || !item.medicine || !item.timeNumber || !item.timeUser || !item.treatment) {
                    flage = false;
                    return
                }

            })
            if ( !flage ) {
                $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                $('.visiting-time .date-input').focus().blur()
                $scope.tabData.active=4;
                 numbers=0;
                return toastr.warning('请先填写完整用药信息！',null, 1500);
            }
            dataList.medicalRecordInfo={};
            dataList.medicalRecordId=$stateParams.rid;
            dataList.medicalRecordInfo=self.cureOutline;
            medicalService.savePatientMedicalRecordDetailPart('CureOutline',dataList).then(function(data){
            	if(data.status==200){
                    isChange=false;
                    isNumber=2;
                    toastr.success('保存成功');
                    if(flag){
                        $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
                    }
            	}else{
            		toastr.error(data.errorMessage);
            	}
            })
        }
        self.scrollTo=function (m,i) {
            self.activeIndex = i
            $('.slide-bar').animate({left:i*85+20+'px'},200)
            document.getElementById(m).scrollIntoView()
        }
        $("[data-toggle='tooltip']").tooltip();
         //监听数据是否变化
         var isNumber=0; //监听变化次数
         $scope.$watch('cureOutline',function(a,b){
             // console.log('监听变化',isNumber)
             isNumber++;    
            if(isNumber>3){ 
             isChange=true; //判断是否变化
            }
         },true)
      //路由相关变化
      var numbers=0; //路由每次跳转两次
      $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
         if(fromState.name=='dryad.medicalhistory.details.treatment-regimen'){
              numbers++; 
              if(numbers==1){
                  _.each($scope.tabData,function(a,i){
                      if(a.route==toState.name){   //找到路由切换
                         if(isChange){ 
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
                    isChange=false;
                    $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
                }else if(result=='cancle'){
                $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                $('.visiting-time .date-input').focus().blur()
                $scope.tabData.active=4;
                 numbers=0;
                }else if(result=='save'){
                    self.saveData(true,index);
                }
            });
        };

      baseconfigDrugdictionaryService.getDrugTypeList().then(data => {
            if(data.status == 200){
                if(data.data.length > 0){
                    angular.forEach(data.data,(ele,i) => {
                        if(i == 0){
                            ele.active = true;
                        }else{
                            ele.active = false;
                        }
                    });
                }
                $scope.drugClass = data.data || [];
                $scope.chooiseType = $scope.drugClass[0];
            }else{
                toastr.error(data.errorMessage,null,3000);
            }
        });
        //添加或者修改
      $scope.editeAdd = (index,item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../system/html/drugDictionary/add-edit-drugdictionary.html'),
                controller: 'addEditDrugdictionaryCtrl',
                controllerAs: 'addEditDrugdictionaryCtrlVm',
                size: 'width-660',
                resolve: {
                    items: function() {
                        return {
                            title: '新增药品',
                            drugClass:$scope.drugClass,
                            clickEvent:item.category
                        };
                    },
                    addEditDrugdictionaryCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../system/controller/drugDictionary/add-edit-drugdictionary-controller'], (require) => {
                            const ctrl = require('../../system/controller/drugDictionary/add-edit-drugdictionary-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './system/add-edit-drugdictionary-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                baseconfigDrugdictionaryService.saveAddOrEditDrug(result).then(rps => {
                    if(rps.status == 200){
                        toastr.success('新增药品成功！',null,3000);
                        $scope.searchkey = '';
                        $scope.cureOutline.cpa[index].category = result.categoryId;
                        $scope.cureOutline.cpa[index].medicine = rps.data;
                        $scope.cureOutline.cpa[index].dosageForm = result.dosageId;
                        $scope.cureOutline.cpa[index].fications = result.unit;
                        self.changeSelectCategory(result.categoryId,index,true);
                    }else{
                        toastr.error(rps.errorMessage,null,3000);
                    }
                });
            });

        };
    }
}
TreatmentRegimenCtrl.$inject = ['$scope','$timeout', '$stateParams','medicalService','toastr','$cookies','$rootScope','$uibModal','$state','_', 'baseconfigDrugdictionaryService','conmmonService'];
module.exports = (ngMold) => {
    require.ensure(['../../system/service/baseconfig-drugdictionary-services'],(require) => {
        require('../../system/service/baseconfig-drugdictionary-services')(ngMold);
    },'./system/baseconfig-drugdictionary-services');
    ngMold.controller('treatmentRegimenCtrl', TreatmentRegimenCtrl);
}