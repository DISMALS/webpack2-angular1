let echarts = require('echarts');
let DryadEcharts = ($timeout) => {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $timeout(function() {
                let ratio = attrs.ratio;
                let eleParent = $(elem).parent();
                // 初始化页面尺寸
                $(elem[0]).css({
                    'width': $(eleParent).width() * parseFloat(ratio),
                    'min-height': '420px',
                    // marginLeft: ($(window).width() * (1 - parseFloat(ratio))) / 2
                });
                //实例化一个图表对象
                let echartsInstance = echarts.init(elem[0]);

                //监听和初始化图表
                if (attrs.dryadEcharts) {
                    scope.$watch(attrs['dryadEcharts'], function() {
                        let option = scope.$eval(attrs.dryadEcharts);
                        if (angular.isObject(option)) {
                            echartsInstance.setOption(option);
                        }
                    }, true);
                }

                //窗口尺寸变化，重绘图表
                $(window).resize(function() {
                    $(elem[0]).css({
                        'width': $(eleParent).width() * parseFloat(ratio),
                        'min-height': '420px',
                        // marginLeft: ($(window).width() * (1 - parseFloat(ratio))) / 2
                    });
                    echartsInstance.resize();
                });
            });
        }
    }
}
DryadEcharts.$inject = ['$timeout'];

module.exports = (ngMold) => {
    ngMold.directive('dryadEcharts', DryadEcharts);
}