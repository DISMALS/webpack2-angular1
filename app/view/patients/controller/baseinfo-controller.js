
class PatientsBaseinfoCtrl {
    constructor($rootScope, $scope, toastr, PatientsService) {
        $scope.patientsDetails = {};
        $scope.activeTab = $scope.$parent.activeTab; //当前选中的tab
        if(!$scope.activeTab.close){
            return false;
        }
        $scope.patientId = $scope.activeTab.params.pid || null;
        if($scope.patientId){
            PatientsService.patientsDetails( $scope.patientId ).then( data => {
                if (data.status == 200) {
                    $scope.patientsDetails = data.data;
                    $scope.patientsDetails.basevo.visitDate = $scope.patientsDetails.basevo.visitDate || $scope.activeTab.data.visitDate;
                   // $scope.patientsDetails.basevo.age = $scope.activeTab.data.age;
                    $scope.patientsDetails.basevo.sexName = data.data.basevo.sex == 'M' ? '男' : '女';
                } else {
                    toastr.error(data.errorMessage, null, 1500);
                }
            });
        }

    }
}

PatientsBaseinfoCtrl.$inject = ['$rootScope', '$scope', 'toastr', 'PatientsService'];

module.exports = (ngMold) => {
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, './patients/patients-serv');
    ngMold.controller('patientsBaseinfoCtrl', PatientsBaseinfoCtrl);
}