class MedicalHistoryCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG,$state,toastr,medicalService) {
        this.scope = $scope;
        $scope.tablist = [];

        //获取cookies中的tab
        $scope.tabs = $cookies.get('historytabs') ? JSON.parse($cookies.get('historytabs')) : [];
        $scope.tabfixed = [{
            icon: 'search',
            close: false,
            title: '病历查询',
            route: 'dryad.medicalhistory.search'
        }];
        $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
        $scope.active = 0;

        //添加tab
        $scope.$on('addTab', function(evt, obj) {
            let num = 0;
            $scope.tabs = $cookies.get('historytabs') ? JSON.parse($cookies.get('historytabs')) : [];
            $scope.tablist.map((item, index) => {    
                if(item.params){
                    if((obj.params.pid == item.params.pid) && (obj.params.rid == item.params.rid)){
                        num++;
                        if($scope.active == index){
                            $scope.$broadcast('activeTab',{active:$scope.active});
                        }else{
                            $scope.active = index;
                        }
                    }else if((obj.params.pid != item.params.pid) && (obj.params.rid == item.params.rid)){
                        num = -1;
                    }
                } 
            });
            if(num == -1){toastr.warning('你有未操作完的病历！',null,3000);return false;}
            if (num == 0) {
                $scope.tabs.push(obj);
                $cookies.putObject('historytabs', $scope.tabs);
                $scope.tablist = $scope.tabfixed.concat(($scope.tabs ? $scope.tabs : []));
                $scope.active = $scope.tablist.length - 1;
                // $state.go(obj.route,obj.params);
            }
            if(!obj.from){
                $scope.$apply();
            }
//           $('.hidetip').hide();
        });
        //更新tab
        $scope.$on('index',function(e,v){
            if(v.index==1){
                for(var i=0;i<$scope.tabs.length;i++){
                    if($scope.tabs[i].params.pid==v.item.patientId){
                        $scope.tabs[i].title=v.item.patientName;

                        $scope.tabs[i].sex=v.item.sex;
                         $scope.tabs[i].recoradType=v.item.recoradType;
                    }
                }
            }
        })
        // 删除tab
        $scope.$on('closeTab', function(evt, obj) {
            let closeObj = obj.item;
            $scope.tabs = $cookies.get('historytabs') ? JSON.parse($cookies.get('historytabs')) : [];
            // $scope.tablist.splice(obj.index, 1);
            if ($scope.tabs.length > 0) {
                angular.forEach($scope.tabs, (i, k) => {
                    if (i.params.rid == closeObj.params.rid) {
                        medicalService.getPatientMedicalPatientInfo(closeObj.params.pid,closeObj.params.rid).then(function (res) {
                            if(!(res.data.mobilePhone&&res.data.receptDoctor)){
                                $scope.deleteModal('当前病历还未保存，确认放弃？',obj.index,k,i.params)
                            }else{
                                $scope.tablist.splice(obj.index, 1);
                                $scope.tabs.splice(k, 1);
                                $scope.active = 0;
                                $cookies.putObject('historytabs', ($scope.tabs || []));
                            }
                        })
                    }
                });
            }
        });
        $scope.$on('deleteTab',(evt,obj)=>{ //删除病例删除右侧tab
            $scope.tabs = $cookies.get('historytabs') ? JSON.parse($cookies.get('historytabs')) : [];
            // $scope.tablist.splice(obj.index, 1);
            if ($scope.tabs.length > 0) {
                angular.forEach($scope.tabs, (i, k) => {
                    if (i.params.rid == obj.medicalRecordId) {
                        $scope.tablist.splice(obj.index, 1);
                        $scope.tabs.splice(k, 1);
                        $scope.active = 0;
                        $cookies.putObject('historytabs', ($scope.tabs || []));
                    }
                });
            }
        })
        //选中tab
        $scope.$on('active', function(evt, obj) {
            $scope.active = obj.index;
        });
         //删除确认弹窗
       $scope.deleteModal = (patinet,index,k,obj) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/medicalhistory-delete.html'),
                controller: 'delectMedicalhistoryCtrl',
                controllerAs: 'delectMedicalhistoryCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            type:'DELETE',
                            patinet:patinet || null,
                            content: patinet
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./medicalhistory-delete-controller'], (require) => {
                            const ctrl = require('./medicalhistory-delete-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/delete-modal-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            if(!(result=='cancle')){
                let employeeId = JSON.parse($cookies.get('user')).employeeId;
                medicalService.deleteEmptyMedicalRecord(employeeId,obj.pid,obj.rid).then((res)=>{
                    if(res.status==200){
                            $scope.tablist.splice(index, 1);
                            $scope.tabs.splice(k, 1);
                            $scope.active = 0;
                            $cookies.putObject('historytabs', ($scope.tabs || []));
                    }else{
                        toastr.error(res.errorMessage, null, 2000);
                    }
                })
                
            }
            });
        };
        //路由相关变化
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            if(!(fromParams.createRecord || toParams.createRecord)){
                if(toState.name == 'dryad.medicalhistory.search'){
                    $scope.active = 0;
                }
            }
        });
    }
}


MedicalHistoryCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$timeout', '$cookies', 'APP_CONFIG','$state','toastr','medicalService'];
module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryCtrl', MedicalHistoryCtrl);
};