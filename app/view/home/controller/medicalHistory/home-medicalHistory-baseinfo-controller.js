class MedicalHistoryBaseinfoCtrl {
    constructor($scope, $stateParams, _, medicalService,toastr,$cookies,$rootScope,$state,$uibModal) {
        var self = $scope;
        $scope.user = JSON.parse($cookies.get('user'));
        // 从父级中拿到选中的tab
        self.parentTabList=self.$parent.parentTabList;//历史tab页
        self.activeTab = self.$parent.activeTab;
        // console.log(self.activeTab)
        self.goNextTab=false;
        self.nationArr = [];
        self.educationArr = [];
        self.jobArr = [];
        self.baseInfoCopy=angular.copy(self.baseInfo)
        //初始化数据
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
            //初始化数据 
        medicalService.getPatientInfoBaseInfoInDataApplication(self.activeTab.params.pid,self.activeTab.params.rid).then(function (res) {
        self.baseInfo = res.data.basevo;
        // 如果是机构管理或者专家转换
        if($scope.user.userType==4){
            if($scope.baseInfo&&$scope.baseInfo.name){
                $scope.baseInfo.name=changeDesensitization(4,$scope.baseInfo.name)
            }
            if($scope.baseInfo&&$scope.baseInfo.phoneNo){
                $scope.baseInfo.phoneNo=changeDesensitization(4,$scope.baseInfo.phoneNo)
            }
            if($scope.baseInfo&&$scope.baseInfo.address){
                $scope.baseInfo.address=changeDesensitization(4,$scope.baseInfo.address)
            }
            if($scope.baseInfo&&$scope.baseInfo.telephone){
                $scope.baseInfo.telephone=changeDesensitization(4,$scope.baseInfo.telephone)
            }
        }
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
        }
       })
        $("[data-toggle='tooltip']").tooltip();
    }
    }
MedicalHistoryBaseinfoCtrl.$inject = ['$scope', '$stateParams', '_', 'medicalService','toastr','$cookies','$rootScope','$state','$uibModal']
module.exports = (ngMold) => {
    require.ensure(['../../../medicalHistory/service/medical-history-service'], (require) => {
        require('../../../medicalHistory/service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalHistoryBaseinfoCtrl', MedicalHistoryBaseinfoCtrl);
}