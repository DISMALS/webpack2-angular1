class MedicalHistoryTreatmentRegimenCtrl {
    constructor($scope, $stateParams,medicalService) {
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        self.imgShow=false;
          //初始化加载
          if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid, self.activeTab.params.rid,'solution').then(function (res) {
            if(res.status==200){
                if(res.data&&res.data.cureOutline){
                self.cureOutline=res.data.cureOutline;
                	 //治疗方案
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
                                            console.log(data.dictItemValue, item.dosageForm);
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

                }else{
                    self.imgShow=true;
                }
            }else{
            toastr.error(res.errorMessage);
            }
        })
    }
}
MedicalHistoryTreatmentRegimenCtrl.$inject = ['$scope', '$stateParams','medicalService'];
module.exports = (ngMold) => {
    require.ensure(['../../../medicalHistory/service/medical-history-service'], (require) => {
        require('../../../medicalHistory/service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalHistoryTreatmentRegimenCtrl', MedicalHistoryTreatmentRegimenCtrl);
}