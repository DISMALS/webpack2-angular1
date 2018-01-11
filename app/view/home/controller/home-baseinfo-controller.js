
class HomeBaseinfoCtrl {
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
                           // 如果是机构管理或者专家转换
			        if($scope.user.userType==4){
			            if($scope.patientsDetails.basevo&&$scope.patientsDetails.basevo.name){
			                $scope.patientsDetails.basevo.name=changeDesensitization(4,$scope.patientsDetails.basevo.name)
			            }
			            if($scope.patientsDetails.basevo&&$scope.patientsDetails.basevo.phoneNo){
			                $scope.patientsDetails.basevo.phoneNo=changeDesensitization(4,$scope.patientsDetails.basevo.phoneNo)
			            }
			            if($scope.patientsDetails.basevo&&$scope.patientsDetails.basevo.address){
			                $scope.patientsDetails.basevo.address=changeDesensitization(4,$scope.patientsDetails.basevo.address)
			            }
			            if($scope.patientsDetails.basevo&&$scope.patientsDetails.basevo.telephone){
			                $scope.patientsDetails.basevo.telephone=changeDesensitization(4,$scope.patientsDetails.basevo.telephone)
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
                } else {
                    toastr.error(data.errorMessage, null, 1500);
                }
            });
        }

    }
}

HomeBaseinfoCtrl.$inject = ['$rootScope', '$scope', 'toastr', 'PatientsService'];

module.exports = (ngMold) => {
	require.ensure(['../../patients/service/patients-service'], (require) => {
	require('../../patients/service/patients-service')(ngMold);
}, './patients/patients-serv');
    ngMold.controller('homeBaseinfoCtrl', HomeBaseinfoCtrl);
}