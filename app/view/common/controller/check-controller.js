class CheckCtrl {
    constructor($scope,mainService, $uibModalInstance, items, toastr,_,conmmonService,$cookies) {
        $scope.user = JSON.parse($cookies.get('user'));
        $scope.item = items;
        $scope.isBoy = true;
        $scope.noMatch = false;
        $scope.patients = {
            birthday:moment(new Date()).format('YYYY-MM-DD'),
            sex:$scope.isBoy ? 'M' : 'F',
            name:''
        };
        $scope.sureBtn = false;
        $scope.checkRowArr = []; // 选中的行
        $scope.patientsRecord = [];
        //选择性别
        $scope.chooiseSex = () => {
            $scope.isBoy = !$scope.isBoy;
        };

        //是否选中
        $scope.isCheck = (item,index) => {
            $scope.patientsRecord.forEach((element,i) => {
                if(i !== index){
                    element.check = false;
                }else{
                    $scope.checkRowArr.push(element);
                }
            });
            //点击按钮是否可用
            $scope.sureBtn = _.find($scope.patientsRecord,(item,i) => {return item.check == true;}) ? true : false;
        };
        
        //查询列表有值时确认按钮是否启用
        $scope.sureBtnEnable = () => {
            let checkRow = _.find($scope.patientsRecord,(item,i) => {
                return item.check == true;
            });
            if(checkRow){
                checkRow.doctorId = $scope.user.employeeId;
            }
            return checkRow;
        };
        //确认 
        $scope.sure = () => {
            if(!$scope.sureBtn){return false;}
            let obj = {};
            $scope.isBoy ? $scope.patients.sex = 'M' : $scope.patients.sex = 'F';
            $scope.patients.birthday=moment($scope.patients.birthday).format('YYYY-MM-DD');
            if(($scope.patientsRecord.length > 0) && $scope.sureBtnEnable()){
                let chooiseRow = $scope.sureBtnEnable();
                if(chooiseRow.flag){
                    //初诊
                    obj.flag = 1; 
                    obj.patients = angular.copy($scope.patients);
                    obj.patients.doctorId = $scope.user.employeeId;
                }else{
                    //复诊
                    obj.flag = 2; 
                    obj.patients = angular.copy($scope.sureBtnEnable());
                }
            }else{
                //初诊
                obj.flag = 1; 
                obj.patients = angular.copy($scope.patients);
                obj.patients.doctorId = $scope.user.employeeId;
            }
            // console.log(obj)
             $uibModalInstance.close(obj);
        };
        
        //搜索患者
        $scope.searchPatients = () => {
            if($scope.patients.name == ''){
                toastr.warning('请填写患者姓名！',null,1500);
                return false;
            }
            $scope.patients.birthday=moment($scope.patients.birthday).format('YYYY-MM-DD');
            $scope.patients.doctorId = $scope.user.employeeId;
            $scope.patients.sex = $scope.isBoy ? 'M' : 'F';
            mainService.searchPatientsCreateMedicalRecord($scope.patients).then((data) => {
                if(data.status == 200){
                    let noMatch = {
                        visitDate:'以上均不是本患者，需要新建患者档案',
                        phoneNo:'',
                        flag:'nomatch'
                    };
                    $scope.patientsRecord = data.data || [];
                    
                    if($scope.patientsRecord.length == 0){
                        // $scope.sureBtn = true;
                        let obj = {};
                        $scope.isBoy ? $scope.patients.sex = 'M' : $scope.patients.sex = 'F';
                        $scope.patients.birthday=moment($scope.patients.birthday).format('YYYY-MM-DD');
                        obj.flag = 3; 
                        obj.patients = angular.copy($scope.patients);
                        obj.patients.doctorId = $scope.user.employeeId;
                        $uibModalInstance.close(obj);
                    }
                    $scope.patientsRecord.push(noMatch);
                }else{
                    toastr.error(data.errorMessage,null,1500);
                }
            });
        };

        // 关闭弹窗
        $scope.closedModal = () => {
            $uibModalInstance.dismiss('cancel');
        };
    };
}

CheckCtrl.$inject = ['$scope','mainService', '$uibModalInstance', 'items', 'toastr','_','conmmonService','$cookies'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, './common/main-serve');
    ngMold.controller('checkCtrl', CheckCtrl);
}