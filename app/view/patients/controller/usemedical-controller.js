require('../../../../images/user-icon.png');
class PatientsUsemedicalCtrl {
    constructor($rootScope, $scope, $stateParams, APP_CONFIG) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
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
        // 图表二
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
                data: ['2017-09-10', '2017-09-15', '2017-09-17', '2017-09-19', '2017-09-20', '2017-09-25'],
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
                data: [32, 43, 54, 21, 43, 23, 43, 45, 34, 34, 24, 23, 34, 24]
            }, {
                type: 'line',
                smooth: true,
                name: 'pm峰流速(PEF)',
                data: [2, 32, 12, 3, 2, 43, 2, 34, 53, 12, 3, 2, 4, 22, 11, 23]
            }],
            animation: true
        };
    }
}

PatientsUsemedicalCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'APP_CONFIG'];

module.exports = (ngMold) => {
    ngMold.controller('patientsUsemedicalCtrl', PatientsUsemedicalCtrl);
}