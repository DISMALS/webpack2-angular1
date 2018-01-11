window.echarts = require('../../../../node_modules/echarts/dist/echarts.min');
let DryadEcharts = ($timeout,homeService) => {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $timeout(function() {
                let ratio = attrs.ratio;
                let eleParent = $(elem).parent();
                // 初始化页面尺寸
                $(elem[0]).css({'width': $(eleParent).width() * parseFloat(ratio)});

                //图表数据初始化以及变化时
                let initFn = () => {
                    //实例化一个图表对象
                    scope.echartsInstance = echarts.init(elem[0]);
                    //监听和初始化图表
                    if (attrs.dryadEcharts) {
                        scope.$watch(attrs['dryadEcharts'], function() {
                            let option = scope.$eval(attrs.dryadEcharts);
                            if (angular.isObject(option)) {
                                scope.echartsInstance.setOption(option);
                            }
                        }, true);
                    }
                };

                //判断是地图还是统计报表
                if(attrs.mapAccount){ //地图
                    $(elem[0]).css({'height': '650px'});
                    let num = 0;
                    let prevObj = null;
                    // 异步获取城市信息
                    homeService.getCitiesList().then(data => {
                        echarts.registerMap('china', data); // 注册地图
                        initFn();
                        scope.$apply();
                    });
                    scope.$on('resizeMap',(evt,obj) => {
                        // console.log(obj);
                        if(scope.echartsInstance){
                            scope.echartsInstance.setOption(obj.option);
                            num = 0;
                            prevObj = obj.option;
                        }
                        if(obj.loadNum == 2){
                            if(num == 0){
                                let timeout = setTimeout(() => {
                                    let seriesArr = prevObj.series;
                                    angular.forEach(seriesArr,element => {
                                        if(element.data.length > 0){
                                            angular.forEach(element.data,ele => {
                                                delete ele.label;
                                            })
                                        }
                                    });                                    
                                    prevObj.series = seriesArr;
                                    scope.echartsInstance.setOption(prevObj);
                                    num += 1;
                                    clearTimeout(timeout);
                                },4000);
                            }
                        }
                        
                    });
                    
                }else{
                    $(elem[0]).css({'min-height': '420px'});
                    initFn();
                }
                
                

                //窗口尺寸变化，重绘图表
                $(window).resize(function() {
                    $(elem[0]).css({'width': $(eleParent).width() * parseFloat(ratio)});
                    if(attrs.mapAccount){
                        $(elem[0]).css({'min-height': '650px'});
                    }else{
                        $(elem[0]).css({'min-height': '420px'});
                    }
                    
                    scope.echartsInstance.resize();
                });
            });
        }
    }
}
DryadEcharts.$inject = ['$timeout', 'homeService'];

module.exports = (ngMold) => {
    require.ensure(['../service/home-service'], (require) => {
        require('../service/home-service')(ngMold);
    }, './home/home-service');
    ngMold.directive('dryadEcharts', DryadEcharts);
}