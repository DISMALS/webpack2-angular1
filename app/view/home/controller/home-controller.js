class homeMainCtrl {
    constructor($scope, $state) {
        $scope.goPatients = () => {
            $state.go('dryad.patients');
        }

        $scope.itemArray = [
            { id: 1, name: '2010季度' },
            { id: 2, name: '2011季度' },
            { id: 3, name: '2012季度' },
            { id: 4, name: '2013季度' },
            { id: 5, name: '2014季度' },
            { id: 6, name: '2015季度' },
            { id: 7, name: '2016季度' },
            { id: 8, name: '2017季度' }
        ];

        $scope.initData = {
            chartOnePei: true,
            chartTwoPei: true
        }

        $scope.selected = {
            diagramOne: $scope.itemArray[0],
            diagramTwo: $scope.itemArray[0]
        };

        // 曲线图一
        $scope.diagramOptionOne = {
            color: ['#1495eb', '#bc99f4', '#e2534d'],
            legend: {
                data: ['轻度', '中度', '重度'],
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
                data: ['第一季度', '第二季度', '第三季度', '第四季度']

            },
            yAxis: {
                axisLine: {
                    show: false
                },
                type: 'value',
                interval: 25, //设置y轴刻度间隔
                // splitNumber: 5,
                // max: 200
                // interval: 50 
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: '#ccc',
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
                name: '轻度',
                // tooltip: {
                //     formatter: function (param) {
                //         param = param[0];
                //         return [
                //             'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                //             'Open: ' + param.data[0] + '<br/>',
                //             'Close: ' + param.data[1] + '<br/>',
                //             'Lowest: ' + param.data[2] + '<br/>',
                //             'Highest: ' + param.data[3] + '<br/>'
                //         ].join('');
                //     }
                // },
                data: [32, 43, 54, 21, 43, 23, 43, 45, 34, 34, 24, 23, 34, 24]
            }, {
                type: 'line',
                smooth: true,
                name: '中度',
                data: [2, 32, 12, 3, 2, 43, 2, 34, 53, 12, 3, 2, 4, 22, 11, 23]
            }, {
                type: 'line',
                smooth: true,
                name: '重度',
                data: [12, 13, 1, 31, 14, 15, 16, 17, 18, 23, 13, 42, 21, 43]
            }],
            animation: true
        };
        //饼图一
        $scope.peiChartOptionOne = {
            color: ['#1495eb', '#bc99f4', '#e2534d'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['轻度', '中度', '重度']
            },
            series: [{
                name: '哮喘病情统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '轻度' },
                    { value: 310, name: '中度' },
                    { value: 234, name: '重度' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        // 图表二
        $scope.diagramOptionTwo = {
            color: ['#1495eb', '#bc99f4', '#e2534d'],
            legend: {
                data: ['完全控制', '部分控制', '未控制'],
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
                data: ['第一季度', '第二季度', '第三季度', '第四季度']
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
                name: '完全控制',
                data: [32, 43, 54, 21, 43, 23, 43, 45, 34, 34, 24, 23, 34, 24]
            }, {
                type: 'line',
                smooth: true,
                name: '部分控制',
                data: [2, 32, 12, 3, 2, 43, 2, 34, 53, 12, 3, 2, 4, 22, 11, 23]
            }, {
                type: 'line',
                smooth: true,
                name: '未控制',
                data: [12, 13, 1, 31, 14, 15, 16, 17, 18, 23, 13, 42, 21, 43]
            }],
            animation: true
        };
        //饼图二
        $scope.peiChartOptionTwo = {
            color: ['#1495eb', '#bc99f4', '#e2534d'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['完全控制', '部分控制', '未控制']
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '完全控制' },
                    { value: 310, name: '部分控制' },
                    { value: 234, name: '未控制' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        $scope.chartActive = (index) => {
            if (index == 1) {
                $scope.initData.chartOnePei = !$scope.initData.chartOnePei;
            } else {
                $scope.initData.chartTwoPei = !$scope.initData.chartTwoPei;
            }
        };
    }
}

homeMainCtrl.$inject = ['$scope', '$state'];

module.exports = (ngModule) => {
    ngModule.controller('homeMainCtrl', homeMainCtrl);
}