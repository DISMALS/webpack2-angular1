class DataLaboratoryInspectionCtrl {
    constructor($scope, $uibModal,medicalService,conmmonService,$q,$cookies) {
        const self = $scope;
        $scope.user = JSON.parse($cookies.get('user'));
        self.activeTab = self.$parent.activeTab;
        self.imgShow=false;
         //初始化数据
         if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
            medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid,self.activeTab.params.rid,'libcheck').then(function(data){
               
                if(data.status==200){
                    // console.log(data)
                    if(data.data&&data.data.labInspection){
                        $scope.labInspection =data.data.labInspection;//实验室检查
                        $scope.labInspection.pft.bpt.type = !$scope.labInspection.pft.bpt.type? '' : $scope.labInspection.pft.bpt.type == 3 ? '甘露醇' : $scope.labInspection.pft.bpt.type == 2 ? '乙酰甲胆碱' : '组胺';
    
                        let promis = [];
                        //获取过敏源强度字典
                        let natureSelect = conmmonService.getSkinResultLevelList().then( (data) => {
                            $scope.natureSelect = data.data;
                        })
                        promis.push(natureSelect);
                        //获取过敏源字典
                        let allergyList = conmmonService.getSkinSourceList().then( (data) => {
                            $scope.allergyList = data.data;
    
                        })
                        promis.push(allergyList);
    
                        $q.all(promis).then( () => {
                            //过敏源数据处理
                            _.each($scope.labInspection.cap.ast.result.source, (item) => {
                                _.each($scope.allergyList, (list) => {
                                    if ( list.dictItemValue == item.value ) {
                                        item.name = list.dictItemName;
                                        // console.log(item.name)
                                    }
                                })
                                _.each($scope.natureSelect, (list) => {
                                    if ( list.dictItemValue == item.intensity ) {
                                        item.intensityName = list.dictItemName;
                                        // console.log(item.intensityName)
                                    }
                                })
                            })
                            //血清特异性IgE检测：
                            _.each($scope.labInspection.cap.lge.list, (item) => {
                                _.each($scope.allergyList, (list) => {
                                    if ( list.dictItemValue == item.value ) {
                                        item.name = list.dictItemName;
                                        // console.log(item.name)
                                    }
                                })
                            })
                        });
                    }else{
                        self.imgShow=true;
                    }
                }else{
                    toastr.error(data.errorMessage);
                }
            })


        //查看图片详情
        self.viewPictureDetails = (picture) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../medicalHistory/html/view-picture.html'),
                controller: 'viewPictureCtrl',
                controllerAs: 'viewPictureCtrlVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            picture,
                            action: 'dataVIEW'
                        };
                    },
                    viewPictureCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../medicalHistory/controller/view-picture-controller'], (require) => {
                            const ctrl = require('../../medicalHistory/controller/view-picture-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './medicalHistory/check-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        };
        } 
    }
DataLaboratoryInspectionCtrl.$inject = ['$scope', '$uibModal','medicalService','conmmonService','$q','$cookies'];

module.exports = (ngMold) => {
    ngMold.controller('dataLaboratoryInspectionCtrl', DataLaboratoryInspectionCtrl);
}