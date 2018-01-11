require('../../../../../images/user-man.png');
require('../../../../../images/user-woman.png');
class MedicalHistoryDeailsCtrl {
    constructor($scope, $stateParams,$cookies, $state,medicalService,$uibModal) {
        this.scope = $scope;
        $scope.baseInfo={};
        $scope.user = JSON.parse($cookies.get('user'));
        $scope.man = 'images/user-man.png';
        $scope.woman = 'images/user-woman.png';
        $scope.activeTab = {};
        $scope.parentTabList = $scope.$parent ? $scope.$parent.tablist : []; 
         // 获取当前选中的tab
         if($scope.parentTabList.length > 0){
            angular.forEach($scope.parentTabList,function(element) {
                if(element.active){
                    $scope.activeTab = element;
                   //初始化数据
                   if($scope.activeTab.params&&$scope.activeTab.params.rid){
                    medicalService.getMedicalRecordHeaderInfo($scope.activeTab.params.rid).then((res)=>{    
                        if(res.status==200){
                            $scope.baseInfo=res.data;
                            $scope.baseInfo.recoradType =$scope.baseInfo.first? "初诊":"复诊";
                            // 如果是机构管理或者专家转换
                            if($scope.user.userType==4){
                                if($scope.baseInfo&&$scope.baseInfo.patientName){
                                    $scope.baseInfo.patientName=changeDesensitization(4,$scope.baseInfo.patientName)
                                }
                                if($scope.baseInfo&&$scope.baseInfo.mobilePhone){
                                    $scope.baseInfo.mobilePhone=changeDesensitization(4,$scope.baseInfo.mobilePhone)
                                }
                            }
                            
                        }
                    })
                }
                }
            }, this);
        }
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        //字段转换
        function changeDesensitization(type,data){
            if(type==1){ //名字 显示最后一位
                return data.replace(/.(?=.)/g, '*');
            }
            if(type==2){//手机电话 显示中间思维
                return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
            if(type==3){//固定电话 显示后三位
                return data.replace(/^.+(.)(.)(.)$/g, '****$1$2$3');
            }
            if(type==4){//地址  全部隐藏
                return '***';
            }
        }
        $scope.tabData = [{
                heading: '基本信息',
                route: 'dryad.home.module.medicalhistory.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            },
            {
                heading: '临床资料',
                route: 'dryad.home.module.medicalhistory.details.clinical-information',
                disable: false,
                params: {
                    index: 1,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            }, {
                heading: '实验室检查',
                route: 'dryad.home.module.medicalhistory.details.laboratory-inspection',
                disable: false,
                params: {
                    index: 2,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            },
            {
                heading: '诊断',
                route: 'dryad.home.module.medicalhistory.details.diagnosis',
                disable: false,
                params: {
                    index: 3,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            },
            {
                heading: '治疗方案',
                route: 'dryad.home.module.medicalhistory.details.treatment-regimen',
                disable: false,
                params: {
                    index: 3,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            },
            {
                heading: '特殊哮喘记录',
                route: 'dryad.home.module.medicalhistory.details.special-asthma',
                disable: false,
                params: {
                    index: 3,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
            //病历概览
            $scope.caseOverview=function(){
                    $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    template: require('../../../medicalHistory/html/medical-history-details-case.html'),
                    controller: 'medicalHistoryDetailsCaseCtrl',
                    controllerAs: 'medicalHistoryDetailsCaseCtrlVm',
                    size: 'width-65',
                    resolve: {
                        items: function() {
                            return {
                                action: 'ADD',
                                rid:$stateParams.rid,
                                pid:$stateParams.pid,
                            };
                        },
                        medicalHistoryDetailsCaseCtrl: ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./../../../medicalHistory/controller/medical-history-details-case-controller'], (require) => {
                                const ctrl = require('./../../../medicalHistory/controller/medical-history-details-case-controller')(require('../../../../common/module'));
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/medical-history-details-case-ctrl');
                            return deferred.promise;
                        }
                    }
                }).result.then(function(result) {
                });
            }
    }
}

MedicalHistoryDeailsCtrl.$inject = ['$scope', '$stateParams','$cookies', '$state','medicalService','$uibModal'];

module.exports = (ngMold) => {
    require.ensure(['../../../medicalHistory/service/medical-history-service'], (require) => {
        require('../../../medicalHistory/service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalHistoryDeailsCtrl', MedicalHistoryDeailsCtrl);
}