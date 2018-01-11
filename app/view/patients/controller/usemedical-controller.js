require('../../../../images/nodata.png');
class PatientsUsemedicalCtrl {
    constructor(toastr, $scope, $stateParams, PatientsService,$timeout) {
        // $scope.patientId = $stateParams.pid;

        $scope.activeTab = $scope.$parent.activeTab; //当前选中的tab
        if(!$scope.activeTab.close){
            return false;
        }
        $scope.patientId = $scope.activeTab.params.pid || null;
        $scope.chatDate = moment(new Date()).format('YYYY-MM'); //初始化日期

        $scope.init = (date) => {
            if($scope.patientId){
                PatientsService.patientsDetailsMedication( $scope.patientId, date).then( data => {
                    if (data.status == 200) {
                        $scope.amData = [];
                        $scope.pmData = [];
                        $scope.xAxisData = [];
                        $scope.data = data.data;
                        if($scope.data.score<20){
                            $scope.level='未控制'
                        }else if($scope.data.score<25){
                            $scope.level='部分控制'
                        }else{
                            $scope.level='已控制'
                        }
                        _.eachRight($scope.data.medicationRecordVOs, (item) => {
                            $scope.xAxisData.push(item.recordDate);
                            if(item.peakFlowAM=='-1'){
                                item.peakFlowAM=0;
                            }
                            if(item.peakFlowPM=='-1'){
                                item.peakFlowPM=0;
                            }
                            let ApeakFlowAM=angular.copy(item)
                            let PpeakFlowAM=angular.copy(item)
                            ApeakFlowAM.value=item.peakFlowAM;
                            PpeakFlowAM.value=item.peakFlowPM;
                            ApeakFlowAM.type='am';
                            PpeakFlowAM.type='pm'
                            $scope.amData.push(ApeakFlowAM);
                            $scope.pmData.push(PpeakFlowAM);
                        });
                        $scope.diagramOptionTwo = {
                            legend: {
                                data: ['am峰流速(PEF)', 'pm峰流速(PEF)'],
                                itemGap: 20,
                                itemWidth: 51,
                                textStyle: {
                                    fontSize: 14,
                                    color: '#575d6a'
                                }
                            },
                            grid: {
                                left: '3%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                show: true,
                                type: 'category',
                                data: $scope.xAxisData,
                                splitNumber: 4
                            },
    
                            yAxis: {
                                axisLine: {
                                    show: false
                                },
                                interval: 25, //设置y轴刻度间隔
                                type: 'value'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                },
                                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                                borderWidth: 1,
                                borderColor: '#ccc ',
                                padding: 10,
                                textStyle: {
                                    color: '#000'
                                },
                                formatter:function(params){
                                    var str='';
                                    angular.forEach(params,function(item){
                                        if(item.data.type=='am'){
                                            let MedicationAm='';
                                            item.data.takePillsAM=='1'?(Medication='已用药'):(Medication='未用药');
                                            str+=`上午(am)<br/>用药品状态:${Medication}<br/>峰流速(PEF):${item.data.value}<br/>`;
                                        }else if(item.data.type=='pm'){
                                            let MedicationPm='';
                                            item.data.takePillsPM=='1'?(MedicationPm='已用药'):(MedicationPm='未用药');
                                            str+=`下午(pm)<br/>用药品状态:${MedicationPm}<br/>峰流速(PEF):${item.data.value}<br/>`;
                                        }
                                     })
                                    return str
                                },
                                position: function(pos, params, el, elRect, size) {
                                    var obj = { top: 10 };
                                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                                    return obj;
                                },
                                extraCssText: 'width: 150px'
                            },
                            series: [{
                                type: 'line',
                                smooth: true,
                                name: 'am峰流速(PEF)',
                                data: $scope.amData
                            }, {
                                type: 'line',
                                smooth: true,
                                name: 'pm峰流速(PEF)',
                                data: $scope.pmData
                            }],
                            animation: true
                        };
                    } else {
                        toastr.error(data.errorMessage, null, 1500);
                    }
                });
            }
            
        }
        $scope.init($scope.chatDate);
        $scope.$on('updateDate',(e,obj) => {
            $timeout(() => {
                let dateData = moment(obj.date).format('YYYY-MM');
                $scope.init(dateData);
            });
        });
    }
}

PatientsUsemedicalCtrl.$inject = ['toastr', '$scope', '$stateParams', 'PatientsService','$timeout'];

module.exports = (ngMold) => {
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, './patients/patients-serve');
    require('../../home/directive/echarts-ui-directive')(ngMold);
    ngMold.controller('patientsUsemedicalCtrl', PatientsUsemedicalCtrl);
}