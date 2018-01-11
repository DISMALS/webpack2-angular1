class HomeDeailsCtrl {
    constructor($scope,$cookies, $uibModal, $state, PatientsService, toastr,_) {
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
                    // $scope.activeTab.recoradType = element.data.first ? "初诊" : "复诊";
                    $scope.activeTab.userimg = element.sex == 'M' ? 'images/user-man.png' : 'images/user-woman.png';
                    console.log($scope.activeTab)
                     // 如果是机构管理或者专家转换
			        if($scope.user.userType==4){
			            if($scope.activeTab.data&&$scope.activeTab.data.phoneNo){
			                $scope.activeTab.data.phoneNo=changeDesensitization(4,$scope.activeTab.data.phoneNo)
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
                route: 'dryad.home.module.main.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    pid: $scope.activeTab.params.pid
                }
            },
            {
                heading: '病历记录',
                route: 'dryad.home.module.main.details.diagnosis',
                disable: false,
                params: {
                    index: 1,
                    pid: $scope.activeTab.params.pid
                }
            }, {
                heading: 'PEF/ACT/用药记录',
                route: 'dryad.home.module.main.details.usemedical',
                disable: false,
                params: {
                    index: 2,
                    pid: $scope.activeTab.params.pid
                }
            }
        ];

        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
    }
}

HomeDeailsCtrl.$inject = ['$scope','$cookies', '$uibModal', '$state', 'PatientsService', 'toastr','_'];

module.exports = (ngMold) => {
	require.ensure(['../../patients/service/patients-service'], (require) => {
    require('../../patients/service/patients-service')(ngMold);
}, './patients/patients-serv');
    ngMold.controller('homeDeailsCtrl', HomeDeailsCtrl);
}