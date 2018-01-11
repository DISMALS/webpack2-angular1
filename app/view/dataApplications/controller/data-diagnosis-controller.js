class DataDiagnosisCtrl {
    constructor($scope, $stateParams,medicalService,conmmonService) {
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        self.imgShow=false;
            //初始化数据
         if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid, self.activeTab.params.rid,'diagnose').then(function(res){
            if(res.status==200){
                if(res.data.diagnose){
                    $scope.diagnose = res.data.diagnose;//诊断
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
                        _.each(res.data,function(a){
                            if(a.dictItemValue==$scope.diagnose.sodSub.state){
                                $scope.diagnose.sodSub.dictItemValue=a.dictItemName;
                                // console.log($scope.diagnose.sodSub.dictItemValue)
                            }
                        })
                    })
                }else{
                    self.imgShow=true;
                }
                
            }else{
                toastr.error(data.errorMessage);
            }
        })
    }
}
DataDiagnosisCtrl.$inject = ['$scope', '$stateParams','medicalService','conmmonService'];
module.exports = (ngMold) => {
    ngMold.controller('dataDiagnosisCtrl', DataDiagnosisCtrl);
}