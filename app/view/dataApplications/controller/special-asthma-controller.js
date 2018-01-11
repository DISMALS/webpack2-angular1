class DataSpecialAsthmaCtrl {
    constructor($scope, $stateParams,medicalService) {
          //初始化时间
        const self = $scope;
        self.imgShow=false;
        self.activeTab = self.$parent.activeTab;
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
        return false;
         }
        medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid,self.activeTab.params.rid,'specialdryad').then(function (res) {
            if(res.status==200){
                if(res.data.specialAsthma){
                    self.specialAsthma=res.data.specialAsthma;
                }else{
                    self.imgShow=true;
                }
            }
            })
        }
}
DataSpecialAsthmaCtrl.$inject = ['$scope', '$stateParams','medicalService'];
module.exports = (ngMold) => {
    ngMold.controller('dataSpecialAsthmaCtrl', DataSpecialAsthmaCtrl);
}