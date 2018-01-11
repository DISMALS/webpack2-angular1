class DataClinicalInformationCtrl {
    constructor($scope, $stateParams,medicalService) {
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        self.imgShow=false;
        //初始化数据
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid, self.activeTab.params.rid,'clinicinfo').then(function (res) {
            if(res.status==200){
                if(res.data.clinicInfo!=null){
                    self.clinicInfo=res.data.clinicInfo;
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
                }else{
                    self.imgShow=true;
                }
            }else{
                toastr.error(res.errorMessage);
            }
           })
    }
}
DataClinicalInformationCtrl.$inject = ['$scope', '$stateParams','medicalService'];

module.exports = (ngMold) => {
    ngMold.controller('dataClinicalInformationCtrl', DataClinicalInformationCtrl);
}