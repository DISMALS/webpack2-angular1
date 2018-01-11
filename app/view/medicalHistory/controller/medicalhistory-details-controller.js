require('../../../../images/user-man.png');
require('../../../../images/user-woman.png');
class MedicalHistoryDeailsCtrl {
    constructor($scope, $stateParams, $state,$q,$uibModal,medicalService,toastr,$cookies) {
        $scope.baseInfo = {};
        $scope.isDisable = ($cookies.get('createAccount')&&$stateParams.rid==JSON.parse($cookies.get('createAccount'))) ?true:false;
     	$scope.man = 'images/user-man.png';
        $scope.woman = 'images/user-woman.png';
        $scope.parentTabList = $scope.$parent ? $scope.$parent.tablist : []; //获取tab list
        $scope.activeTab = {};
        // 获取当前选中的tab
        if($scope.parentTabList.length > 0){
            angular.forEach($scope.parentTabList,function(element) {
                if(element.active){
                    $scope.activeTab = element;
                    //初始化数据
                    if($scope.activeTab.params&&$scope.activeTab.params.rid){
                        medicalService.getMedicalRecordHeaderInfo($scope.activeTab.params.rid).then((res)=>{
                            $scope.baseInfo=res.data;
                            $scope.baseInfo.recoradType =$scope.baseInfo.first? "初诊":"复诊";
                            // console.log($scope.baseInfo)
                        })
                    }
                }
            }, this);
        }
        var recoradType=$scope.baseInfo.recoradType
        //详情tablist
        $scope.tabData = [{
                heading: '基本信息',
                route: 'dryad.medicalhistory.details.baseinfo',
                disable: false,
                params: {
                    index: 0,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid,
                    first:$stateParams.first
                }
            },
            {
                heading: '临床资料',
                route: 'dryad.medicalhistory.details.clinical-information',
                disable: $scope.isDisable,
                params: {
                    index: 1,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            }, {
                heading: '实验室检查',
                route: 'dryad.medicalhistory.details.laboratory-inspection',
                disable: $scope.isDisable,
                params: {
                    index: 2,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            },
            {
                heading: '诊断',
                route: 'dryad.medicalhistory.details.diagnosis',
                disable: $scope.isDisable,
                params: {
                    index: 3,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            },
            {
                heading: '治疗方案',
                route: 'dryad.medicalhistory.details.treatment-regimen',
                disable: $scope.isDisable,
                params: {
                    index: 4,
                    pid: $stateParams.pid,
                    rid: $stateParams.rid
                }
            }
        ];
        $state.go($scope.tabData[0]['route'], $scope.tabData[0]['params']);
        var AsthmaRecord={
            heading: '特殊哮喘记录',
            route: 'dryad.medicalhistory.details.special-asthma',
            disable: false,
            params: {
                index: 5,
                pid: $stateParams.pid,
                rid: $stateParams.rid
            }
        }
        //判断是否有特殊哮喘模块
        if($scope.activeTab&&$scope.activeTab.params&&$scope.activeTab.params.pid){
        		medicalService.getPatientMedicalRecordDetailPart($scope.activeTab.params.pid,$scope.activeTab.params.rid,'specialdryad').then(function (res) {
            if(res.status==200){
                if(res.data.specialAsthma){
                    $scope.tabData.push(AsthmaRecord);
                }
            }
           });
        }
        
        
        $scope.showAsthmaRecord=function(){
            if($scope.tabData.length==5){
                $scope.tabData.push(AsthmaRecord);
                $state.go($scope.tabData[5]['route'], $scope.tabData[5]['params']);
            }
        }
        $scope.$on("index",function (e,v) {
            if(v.index==1){
                v.item.recoradType=$scope.baseInfo.recoradType;
                $scope.baseInfo.sex=v.item.sex;
                $scope.baseInfo.mobilePhone=v.item.mobilePhone;
                $scope.baseInfo.patientName=v.item.patientName;
                $scope.baseInfo.age=v.item.age;
                $scope.tabs = $cookies.get('historytabs') ? JSON.parse($cookies.get('historytabs')) : [];
                for(var i=0;i<$scope.tabs.length;i++){
                    if($scope.tabs[i].params.rid==$stateParams.rid){
                        $scope.tabs[i].title=v.item.patientName;
                        $scope.tabs[i].recoradType=$scope.baseInfo.recoradType;
                        $scope.tabs[i].sex=v.item.sex;
                         $scope.tabs[i].age=v.item.age;
                    }
                }
                $cookies.putObject('historytabs', $scope.tabs);
            }
            _.each($scope.tabData,(item)=>{item.disable=false})
        //    $state.go($scope.tabData[v.index].route, $scope.tabData[v.index]['params'])
        });
        //获取信息
        
         //病历概览
        $scope.caseOverview=function(){
        	if(!($cookies.get('createAccount')&&$stateParams.rid==JSON.parse($cookies.get('createAccount')))){
        		 $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/medical-history-details-case.html'),
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
                        require.ensure(['./medical-history-details-case-controller'], (require) => {
                            const ctrl = require('./medical-history-details-case-controller')(require('../../../common/module'));
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
        	}else{
        		toastr.error('请先保存基本信息');
        	}
           
        }
    }
}

MedicalHistoryDeailsCtrl.$inject = ['$scope', '$stateParams', '$state','$q','$uibModal','medicalService','toastr','$cookies'];

module.exports = (ngMold) => {
	 require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalHistoryDeailsCtrl', MedicalHistoryDeailsCtrl);
}



// '<div>' + '<uib-tabset active="tabs.active" class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}" class="{{class}}">' + '<uib-tab class="tab {{tab.class}}" ng-repeat="tab in tabs" ' + 'disable="tab.disable" ng-click="go(tab)">' + '<uib-tab-heading ng-bind-html="tab.heading"></uib-tab-heading>' + '</uib-tab>' + '</uib-tabset>' + '</div>'