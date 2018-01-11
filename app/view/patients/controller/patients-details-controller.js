require('../../../../images/user-man.png');
require('../../../../images/user-woman.png');
class PatientsDeailsCtrl {
    constructor($scope,$cookies, $uibModal, $state, PatientsService, toastr,_,mainService) {
        $scope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {};
        $scope.baseInfo = {};
        $scope.man = 'images/user-man.png';
        $scope.woman = 'images/user-woman.png';

        $scope.parentTabList = $scope.$parent ? $scope.$parent.tablist : []; //获取tab list
        $scope.activeTab = {};
        // 获取当前选中的tab
        if($scope.parentTabList.length > 0){
            angular.forEach($scope.parentTabList,function(element) {
                if(element.active){
                    //保存当前选中的tab
                    $scope.activeTab = element;
                    if($scope.activeTab.params&&$scope.activeTab.params.pid){
                        PatientsService.patientsDetails( $scope.activeTab.params.pid ).then( data => {
                            if (data.status == 200) {
                                $scope.activeTab.data.phoneNo=data.data.basevo.phoneNo;
                                } else {
                                toastr.error(data.errorMessage, null, 1500);
                            }
                        });
                    }
                    $scope.activeTab.userimg = element.sex == 'M' ? 'images/user-man.png' : 'images/user-woman.png';
                }
            }, this);
        }

        if(!$scope.activeTab.close){
            $scope.tabData = [];
            return false;
        }

        $scope.tabData = [
            {
                heading: '基本信息',
                route: 'dryad.patients.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    pid: $scope.activeTab.params.pid
                }
            },
            {
                heading: '病历记录',
                route: 'dryad.patients.details.diagnosis',
                disable: false,
                params: {
                    index: 1,
                    pid: $scope.activeTab.params.pid
                }
            }, {
                heading: 'PEF/ACT/用药记录',
                route: 'dryad.patients.details.usemedical',
                disable: false,
                params: {
                    index: 2,
                    pid: $scope.activeTab.params.pid
                }
            }
        ];

        //新增病历按钮
        $scope.newCreateRecord = () => {
            let obj = {
                doctorId:$scope.user.employeeId,
                patientId: $scope.activeTab.params.pid
            }
            mainService.createMedicalRecordByPatients(obj).then((data) => {
                if(data.status == 200){
                    let recordData = data.data;
                    $state.go('dryad.medicalhistory.search',{createRecord:recordData});
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        };
        
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}

PatientsDeailsCtrl.$inject = ['$scope','$cookies', '$uibModal', '$state', 'PatientsService', 'toastr','_','mainService'];

module.exports = (ngMold) => {
    require.ensure(['../../common/service/main-service'], (require) => {
        require('../../common/service/main-service')(ngMold);
    }, './common/main-serve');
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, './patients/patients-serv');
    ngMold.controller('patientsDeailsCtrl', PatientsDeailsCtrl);
}