
require('../../../../images/nodata.png');
class HomeUsemedicalCtrl {
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
                        $scope.data = data.data;
                        if($scope.data.score<20){
                            $scope.level='未控制'
                        }else if($scope.data.score<25){
                            $scope.level='部分控制'
                        }else{
                            $scope.level='已控制'
                        }
                        if(!data.data.medicationRecordVOs){
                            //toastr.warning('暂无数据！',null,1000);
                        }
                        $scope.diagramOptionTwo = {
                            // color: ['#bc99f4', '#e2534d'],
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
                                data: [],
                                splitNumber: 4
                            },

                            yAxis: {
                                axisLine: {
                                    show: false
                                },
                                interval: 25, //设置y轴刻度间隔
                                type: 'value',
                                // splitNumber: 5
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                },
                                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                                borderWidth: 1,
                                borderColor: '# ccc ',
                                padding: 10,
                                textStyle: {
                                    color: '#000'
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
                                data: []
                            }, {
                                type: 'line',
                                smooth: true,
                                name: 'pm峰流速(PEF)',
                                data: []
                            }],
                            animation: true
                        };

                        _.eachRight($scope.data.medicationRecordVOs, (item) => {
                            $scope.diagramOptionTwo.xAxis.data.push(item.recordDate);
                            if(item.peakFlowAM=='-1'){
                                item.peakFlowAM=0;
                            }
                            $scope.diagramOptionTwo.series[0].data.push(item.peakFlowAM);
                            if(item.peakFlowPM=='-1'){
                                item.peakFlowPM=0;
                            }
                            $scope.diagramOptionTwo.series[1].data.push(item.peakFlowPM);
                        })
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

HomeUsemedicalCtrl.$inject = ['toastr', '$scope', '$stateParams', 'PatientsService','$timeout'];

module.exports = (ngMold) => {
	require.ensure(['../../patients/service/patients-service'], (require) => {
    require('../../patients/service/patients-service')(ngMold);
}, './patients/patients-serv');
    ngMold.controller('homeUsemedicalCtrl', HomeUsemedicalCtrl);
}