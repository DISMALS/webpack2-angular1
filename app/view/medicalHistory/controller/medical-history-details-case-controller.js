
class medicalHistoryDetailsCaseCtrl {
    constructor($rootScope, $scope, $state, APP_CONFIG, mainService, $uibModalInstance, $uibModal, items, toastr, $stateParams, _, medicalService, conmmonService, $cookies, $q) {
//      console.log('开始预览')
        $scope.user = JSON.parse($cookies.get('user'));
        $scope.sureBtn = false;
        $scope.checkRowArr = []; // 选中的行
        $scope.patientId = $stateParams.pid;//病例号
        $scope.baseInfo = {   //基本信息
            patientName:'',
            sex:'',
            dob:'',
            nation:'',
            patientHeight:'',
            patientWeight:'',
            bmi:'',
            education:'',
            job:'',
            mobilePhone:'',
            telePhone:'',
            receptDoctor:'',
            address:{
                country:'',
                province:'',
                city:''
            }
        }
        $scope.clinicInfo = { //临床资料
            // generalCondition:{
            //     br:'',
            //     hr:'',
            //     bp:''
            // },
        }
        //确认
        $scope.sure = () => {
            $uibModalInstance.close($scope.sureBtnEnable());
        };

        // 关闭弹窗
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
        //字段转换
        function changeDesensitization(type,data){
        if(type==1){ //名字
            return data.replace(/.(?=.)/g, '*');
        }
        if(type==2){//手机电话
            return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
        if(type==3){//固定电话
            return data.replace(/^.+(.)(.)(.)$/g, '****$1$2$3');
        }
        if(type==4){//地址
            return '***';
        }
        if(type==5){//地址
            return '*';
        }
    }
        // console.log(items)
        //初始化数据
        if(!($cookies.get('createAccount')&&$stateParams.rid==JSON.parse($cookies.get('createAccount')))){
            medicalService.getPatientMedicalRecordDetail(items.pid,items.rid).then(function (res) {
            	if(res.status==200){
                if(res.data.baseInfo && res.data.baseInfo != null ){
                    $scope.baseInfo = res.data.baseInfo;//基本信息
                    $scope.baseInfo.medicalRecordCode=res.data.medicalRecordCode;
                    if($scope.user.userType==4){
                        if($scope.baseInfo.patientName){
                            $scope.baseInfo.patientName='***';
                        }
                        if($scope.baseInfo.mobilePhone){
                            $scope.baseInfo.mobilePhone='***';
                        }
                        if($scope.baseInfo.telePhone){
                            $scope.baseInfo.telePhone='***';
                        }
                        if($scope.baseInfo.address.province){
                            $scope.baseInfo.address.province='*';
                        }
                        if($scope.baseInfo.address.city){
                            $scope.baseInfo.address.city='*';
                        }
                        if($scope.baseInfo.address.country){
                            $scope.baseInfo.address.country='*';
                        }
                    }
                }
                if(res.data.clinicInfo && res.data.clinicInfo != null ){
                		$scope.clinicInfo = res.data.clinicInfo;//临床信息
                		if($scope.clinicInfo.firstTime){
                			//首次发病时间
                			$scope.clinicInfo.medicalHistory.firstTime = moment($scope.clinicInfo.medicalHistory.firstTime).format('YYYY-MM-DD')
						}
                	angular.forEach($scope.clinicInfo.asthmaSymptoms.symptoms,function(a){
                		if(a.type=='e'){
                			a.details.times.type=parseInt(a.details.times.type)-1;
                			a.details.color.type=parseInt(a.details.color.type)-1;
                			a.details.character.type=parseInt(a.details.character.type)-1;
                		}
                	})
                	angular.forEach($scope.clinicInfo.medicalHistory.acuteCondition,function(a){
                			a.times=parseInt(a.times)-1;
                	})
                	angular.forEach($scope.clinicInfo.medicalHistory.comorbidity.data,function(a){
                		if(a.type=='b'||a.type=='c'){
                			a.times=parseInt(a.times)-1;
                		}
                	})
                	$scope.clinicInfo.medicalHistory.smokeHistory.state=parseInt($scope.clinicInfo.medicalHistory.smokeHistory.state)-1;
                }
                
                if(res.data.labInspection && res.data.labInspection != null ){
                    $scope.labInspection = res.data.labInspection;//实验室检查
                    $scope.labInspection.pft.bpt.type = !$scope.labInspection.pft.bpt.type? '' : $scope.labInspection.pft.bpt.type == 3 ? '甘露醇' : $scope.labInspection.pft.bpt.type == 2 ? '乙酰甲胆碱' : '组胺';

                    let promis = [];
                    //获取过敏源强度字典
                    let natureSelect = conmmonService.getSkinResultLevelList().then( (data) => {
                        $scope.natureSelect = data.data;
                    })
                    promis.push(natureSelect);
                    //获取过敏源字典
                    let allergyList = conmmonService.getSkinSourceList().then( (data) => {
                        $scope.allergyList = data.data;

                    })
                    promis.push(allergyList);

                    $q.all(promis).then( () => {
                        //过敏源数据处理
                        _.each($scope.labInspection.cap.ast.result.source, (item) => {
                            _.each($scope.allergyList, (list) => {
                                if ( list.dictItemValue == item.value ) {
                                    item.name = list.dictItemName;
                                }
                            })
                            _.each($scope.natureSelect, (list) => {
                                if ( list.dictItemValue == item.intensity ) {
                                    item.intensityName = list.dictItemName;
                                }
                            })
                        })
                        //血清特异性IgE检测：
                        _.each($scope.labInspection.cap.lge.list, (item) => {
                            _.each($scope.allergyList, (list) => {
                                if ( list.dictItemValue == item.value ) {
                                    item.name = list.dictItemName;
                                }
                            })
                        })
                    });
                }
                
                if(res.data.diagnose && res.data.diagnose != null ){
                        $scope.diagnose = res.data.diagnose;//过敏
                        // diagnose.diseaseStage.state
                          //病情分期字典
                        conmmonService.getDiseaseStageList().then((res)=>{
                            self.diseaseStageList=res.data;
                            _.each(res.data,function(a){
                                if(a.dictItemValue==$scope.diagnose.diseaseStage.state){
                                    $scope.diagnose.diseaseStage.dictItemValue=a.dictItemName;
                                }
                            })
                        })
                        //疾病严重程度
                        conmmonService.getDiseaseLevelStatusList().then((res)=>{
                            self.sodList=res.data;
                            _.each(res.data,function(a){
                                if(a.dictItemValue==$scope.diagnose.sod.state){
                                    $scope.diagnose.sod.dictItemValue=a.dictItemName;
                                    // consolle.log(self.initInfo)
                                }
                            })
                        })
                        //病情严重程度
                        conmmonService.getIllnessStageList().then((res)=>{
                            // self.initInfo.sodSub.list=res.data;
                            // console.log(res.data)
                            _.each(res.data,function(a){
                                if(a.dictItemValue==$scope.diagnose.sodSub.state){
                                    $scope.diagnose.sodSub.dictItemValue=a.dictItemName;
                                }
                            })
                        })
                }
                if(res.data.cureOutline && res.data.cureOutline != null ){
                        $scope.cureOutline = res.data.cureOutline;//治疗方案
                        // let promiseAll = [];
                        // let  timeUser = conmmonService.getUseDrugFrequencyList().then(res=>{
                        //       $scope.timeUserList=res.data;
                        //  })
                        // promiseAll.push(timeUser);
                        // $q.all(promiseAll).then(res=>{
                            medicalService.getQueryDrugCategory().then(function (res) {  //药品大类
                                if(res.status==200){
                                    $scope.categoryList = res.data;
                                        _.each($scope.cureOutline.cpa, (item) => {
                                        item.medicineName=item.medicine;
                                            //药品大类
                                            _.each($scope.categoryList, (list)=>{
                                            if(list.categoryId == item.category){
                                                item.categoryName = list.name;
                                            }
                                        })
                                        // _.each($scope.timeUserList,(data)=>{
                                        //     if(item.timeUser==data.dictItemValue){
                                        //         item.timeUser=data.dictItemName
                                        //     }
                                        // })
                                        //药物
                                        medicalService.getQueryBaseConfig(item.category).then(function (rqs) {
                                            if(rqs.status==200){
                                                _.each(rqs.data,(data)=>{
                                                    if(data.drugId == item.medicine){
                                                        item.medicineName=data.drugName
                                                    }
                                                })
                                            }else{
                                                toastr.error(rqs.errorMessage, null, 3000);
                                            }
                                        })
                                            //剂型
                                        medicalService.queryDrugDosage(item.medicine).then(function (rqs) {
                                            if(rqs.status==200){
                                                _.each(rqs.data,(data)=> {
                                                    if(data.dictItemValue == item.dosageForm){
                                                        item.dosageFormName = data.dictItemName;
                                                    }
                                                })
                                            }else{
                                                toastr.error(rqs.errorMessage, null, 3000);
                                            }
                                        })
                                    })
                                }else{
                                    toastr.error(res.errorMessage, null, 3000);
                                }
                            })
                        // })
                        
                }
                if(res.data.specialAsthma && res.data.specialAsthma.asthmaTypes&&res.data.specialAsthma.asthmaTypes.list){
                    $scope.specialAsthma=res.data.specialAsthma;
                }
            	}else{
            		 toastr.error(res.errorMessage, null, 3000);
            	}
                
            })
        }else{
        	toastr.error('请先保存基本信息', null, 3000);
        }
    //    $scope.$watch('baseInfo.patientWeight',function(){
    //     	if($scope.baseInfo.patientWeight&&$scope.baseInfo.patientHeight){
    //     	let bmi=(parseInt($scope.baseInfo.patientWeight)/parseInt($scope.baseInfo.patientHeight)*2).toFixed(2)
    //        	 $scope.baseInfo.bmi=bmi==NaN?0:bmi;
    //     	}
        	
    //     })
    //      $scope.$watch('baseInfo.patientHeight',function(){
    //        if($scope.baseInfo.patientWeight&&$scope.baseInfo.patientHeight){
    //     	let bmi=(parseInt($scope.baseInfo.patientWeight)/parseInt($scope.baseInfo.patientHeight)*2).toFixed(2)
    //        	 $scope.baseInfo.bmi=bmi==NaN?0:bmi;
    //     	}
    //     })
         $("[data-toggle='tooltip']").tooltip();
    };
}

medicalHistoryDetailsCaseCtrl.$inject = ['$rootScope', '$scope', '$state', 'APP_CONFIG', 'mainService', '$uibModalInstance', '$uibModal', 'items', 'toastr', '$stateParams', '_', 'medicalService', 'conmmonService', '$cookies', '$q'];
 

module.exports = (ngMold) => {
    require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalHistoryDetailsCaseCtrl', medicalHistoryDetailsCaseCtrl);
}