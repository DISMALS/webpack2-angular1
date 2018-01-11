require('../../../../images/nodata.png');
class PatientsDiagnosisCtrl {
    constructor($rootScope, $scope, $stateParams, PatientsService,$uibModal,toastr) {
        $scope.activeTab = $scope.$parent.activeTab; //当前选中的tab
        if(!$scope.activeTab.close){
            return false;
        }
        $scope.patientId = $scope.activeTab.params.pid || null;

        PatientsService.patientsDetailsMedical( $scope.patientId ).then( (data) => {
            if(data.status == 200){
                $scope.events = data.data.medicalRecords;
            }else{
                // toastr.error(data.errorMessage, null, 1500);
            }
        });
        //病例概览
        $scope.caseOverview = (item) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../medicalHistory/html/medical-history-details-case.html'),
                controller: 'medicalHistoryDetailsCaseCtrl',
                controllerAs: 'medicalHistoryDetailsCaseCtrlVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            rid:item.medicalRecordId,
                            pid:$scope.patientId,
                        };
                    },
                    medicalHistoryDetailsCaseCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../medicalHistory/controller/medical-history-details-case-controller'], (require) => {
                            const ctrl = require('../../medicalHistory/controller/medical-history-details-case-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './medicalHistory/controller/medical-history-details-case-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                // $state.go('dryad.medicalhistory.search',{createRecord:result});
            });
        }
        
    }
}

PatientsDiagnosisCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'PatientsService','$uibModal','toastr'];

module.exports = (ngMold) => {
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, './patients/patients-serv');
    ngMold.controller('patientsDiagnosisCtrl', PatientsDiagnosisCtrl);
}