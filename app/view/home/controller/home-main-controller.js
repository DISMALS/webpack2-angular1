
// let provinceList =  require('../../../config/data/provinceBgColor.json');
let citiesList =  require('../../../../node_modules/echarts/map/json/china-cities.json');
class HomeMainCtrl {
    constructor($rootScope,$scope, $state, toastr, $timeout, $cookies, homeService,$ocLazyLoad) {
        $scope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
        if(!$scope.user){$state.go('authorize.login'); return false;}
        $scope.doctorId = $scope.user.employeeId;
        $scope.prevData = null;
        $scope.loadNum = 0;
        $scope.initData = {
            chartOnePei: true,
            chartTwoPei: true
        };
        $scope.dataArr = null;
        $scope.homeInfo = {
            patientCount: 0,
            medicalRecordCount: 0,
            uncontrolPatientCount: 0,
            highLevelPatientCount: 0
        }
        homeService.getHomeInfo( $scope.doctorId ).then((data)=>{ //获取首页统计信息
            if (data.status==200) {
                 if (!data.data) {
                     return
                 }
                $scope.homeInfo = data.data;
            } else{
                toastr.error(data.errorMessage,null,1500);
                return;
            }
        });

        $scope.getIllnessInitPie = ( ) => {
            $scope.illnessInitPie = {};
            $scope.illnessInitPieShow = false;
            homeService.getHomePatientChart( $scope.doctorId ).then((data)=>{ //患者病历饼状图两个图表
                if (data.status == 200) {
                		$timeout(function(){
                			if (!data.data) {
                        $scope.illnessInitPieShow = true;
                        return
	                    }
	                    $scope.illnessInitPie = data.data;
	                    $scope.chartPei();
                		})
                } else{
                    toastr.error(data.errorMessage,null,1500);
                    $scope.illnessInitPieShow = true;
                    return;
                }
            })
        }
        $scope.getIllnessInitPie();
        $scope.$on('updateDate',(e,obj) => {
            $timeout(() => {
                let dateData = moment(obj.date).format('YYYY');
                if ($scope.type === 'ill' ) {
                    if ($scope.illnessYear === dateData) {
                        return
                    }
                    $scope.illnessYear = dateData;
                    $scope.illnessInit();
                } else {
                    if ($scope.controlYear === dateData) {
                        return
                    }
                    $scope.controlYear = dateData;
                    $scope.controlInit();
                }
            });
        });

        //已登记患者\重度哮喘患者\已登记病历\为控制患者
        $scope.homeDetails = (num,value) => {
            $scope.$emit('homeDetails',{
                num,
                value
            });
            if ( num == 3 ) {
                $state.go('dryad.home.module.medicalhistory.list',{
                    type: num
                });
                return
            }
            $state.go('dryad.home.module.main.patients',{
                type: num
            });
        };

        $scope.chartPei = ()=> {//饼图一
            $scope.peiChartOptionOne = {
                color: ['#1495eb', '#bc99f4', '#e2534d','#d4e4d4'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['轻度哮喘', '中度哮喘', '重度哮喘','未记录']
                },
                series: [{
                    name: '疾病严重程度统计',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: $scope.illnessInitPie.levels, name: '轻度哮喘' },
                        { value: $scope.illnessInitPie.levelm, name: '中度哮喘' },
                        { value: $scope.illnessInitPie.levell, name: '重度哮喘' },
                        { value: $scope.illnessInitPie.levelempty, name: '未记录' }
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

            //饼图二
            $scope.peiChartOptionTwo = {
                color: ['#1495eb', '#bc99f4', '#e2534d','#d4e4d4'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['已控制', '部分控制', '未控制','未记录']
                },
                series: [{
                    name: '整体控制水平统计',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: $scope.illnessInitPie.csl, name: '已控制' },
                        { value: $scope.illnessInitPie.csm, name: '部分控制' },
                        { value: $scope.illnessInitPie.css, name: '未控制' },
                        { value: $scope.illnessInitPie.csempty, name: '未记录' }
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
        }
       

        //获取城市经纬度列表
        let chinaCitiesList = () => { 
            $scope.newCitiesList = {};
            angular.forEach(citiesList.features,element => {
                let names = element.properties.name;
                $scope.newCitiesList[names] = element.properties.cp;
            });
        }

        //加载地图分布数据
        let firstData = (data,flag,res,first) => {
            if(flag){ //患者
                let patientsList = data.patientAreaCountList;
                if(first){ //首次加载
                    $scope.loadNum += 1;
                    // console.log('首次加载患者：',patientsList);
                    if(!patientsList || patientsList.length == 0){return []};
                    for (var i = 0; i < patientsList.length; i++) {
                        var geoCoord = $scope.newCitiesList[patientsList[i].name];
                        if (geoCoord) {
                            let obj = {
                                name: patientsList[i].name,
                                value: geoCoord.concat(patientsList[i].value)
                            };
                            res.push(obj);
                        }
                    }
                }else{
                    if(!patientsList){patientsList = [];}
                    if(!$scope.prevData || !$scope.prevData.patientAreaCountList || $scope.prevData.patientAreaCountList.length < 1){return [];}
                    for (var i = 0; i < $scope.prevData.patientAreaCountList.length; i++) {
                        var geoCoord = $scope.newCitiesList[$scope.prevData.patientAreaCountList[i].name];
                        if (geoCoord) {
                            let obj = {
                                name: $scope.prevData.patientAreaCountList[i].name,
                                value: geoCoord.concat($scope.prevData.patientAreaCountList[i].value)
                            };
                            res.push(obj);
                        }
                    }
                    if(patientsList.length > 0){
                        let num = 0;
                        angular.forEach(res,(ele) => {
                            if(ele.name == patientsList[0].name){
                                num += 1;
                                ele.value[2] = patientsList[0].value;
                                ele.label = {
                                    normal: {
                                        formatter: '{b}：患者+1',
                                        position: 'top',
                                        distance:6,
                                        fontSize:24,
                                        color:'#fff',
                                        show: true,
                                        backgroundColor:'#20a0ff',
                                        borderRadius:4,
                                        shadowColor:'rgba(0,0,0,0.20)',
                                        shadowBlur:4,
                                        shadowOffsetY:2,
                                        padding:[3,5,3,5]
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                }
                            }
                        });
                        if(num == 0){
                            var geoCoords = $scope.newCitiesList[patientsList[0].name];
                            if (geoCoords) {
                                let obj = {
                                    name: patientsList[0].name,
                                    value: geoCoords.concat(patientsList[0].value),
                                    label:{
                                        normal: {
                                            formatter: '{b}：患者+1',
                                            position: 'top',
                                            distance:6,
                                            fontSize:24,
                                            color:'#fff',
                                            show: true,
                                            backgroundColor:'#20a0ff',
                                            borderRadius:4,
                                            shadowColor:'rgba(0,0,0,0.20)',
                                            shadowBlur:4,
                                            shadowOffsetY:2,
                                            padding:[3,5,3,5]
                                        },
                                        emphasis: {
                                            show: false,
                                        }
                                    }
                                };
                                res.push(obj);
                            }
                        }
                    }
                }
            }
            if(!flag){ //病历
                let recordList = data.medicalRecordAreaCountList;
                if(first){ //首次加载
                    $scope.loadNum += 1;
                    // console.log('首次加载病历：',recordList);
                    if(!recordList || recordList.length == 0){return []};
                    for (var i = 0; i < recordList.length; i++) {
                        var geoCoord = $scope.newCitiesList[recordList[i].name];
                        if (geoCoord) {
                            res.push({
                                name: recordList[i].name,
                                value: geoCoord.concat(recordList[i].value)
                            });
                        }
                    }
                    return res;
                }else{
                    if(!recordList){recordList = [];}
                    if(!$scope.prevData || !$scope.prevData.medicalRecordAreaCountList || $scope.prevData.medicalRecordAreaCountList.length < 1){return [];}
                    for (var i = 0; i < $scope.prevData.medicalRecordAreaCountList.length; i++) {
                        var geoCoord = $scope.newCitiesList[$scope.prevData.medicalRecordAreaCountList[i].name];
                        if (geoCoord) {
                            let obj = {
                                name: $scope.prevData.medicalRecordAreaCountList[i].name,
                                value: geoCoord.concat($scope.prevData.medicalRecordAreaCountList[i].value)
                            };
                            res.push(obj);
                        }
                    }
                    if(recordList.length > 0){
                        let num = 0;
                        angular.forEach(res,(ele) => {
                            if(ele.name == recordList[0].name){
                                num += 1;
                                ele.value[2] = recordList[0].value;
                                ele.label = { 
                                    normal: {
                                        formatter: '{b}：病历+1',
                                        position: 'top',
                                        distance:6,
                                        color:'#fff',
                                        show: true,
                                        fontSize:24,
                                        backgroundColor:'#f7ba2a',
                                        borderRadius:4,
                                        shadowColor:'rgba(0,0,0,0.20)',
                                        shadowBlur:4,
                                        shadowOffsetY:2,
                                        padding:[3,5,3,5]
                                        
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                }
                            }
                        });
                        if(num == 0){
                            var geoCoords = $scope.newCitiesList[recordList[0].name];
                            if (geoCoords) {
                                let obj = {
                                    name: recordList[0].name,
                                    value: geoCoords.concat(recordList[0].value),
                                    label:{ 
                                        normal: {
                                            formatter: '{b}：病历+1',
                                            position: 'top',
                                            distance:6,
                                            color:'#fff',
                                            show: true,
                                            fontSize:24,
                                            backgroundColor:'#f7ba2a',
                                            borderRadius:4,
                                            shadowColor:'rgba(0,0,0,0.20)',
                                            shadowBlur:4,
                                            shadowOffsetY:2,
                                            padding:[3,5,3,5]
                                            
                                        },
                                        emphasis: {
                                            show: false,
                                        }
                                    }
                                };
                                res.push(obj);
                            }
                        }
                    }
                }
            }
            if(first){$scope.prevData = data;}
            // console.log(res);
            return res;
        };
        
        //将数据转换成地图数据
        
        let convertData = function (data,flag) {
            chinaCitiesList();
            var res = [];
            if($scope.loadNum == 2){ //二次加载
                return firstData(data,flag,res,false);
            }else{ //首次加载分布数据
                return firstData(data,flag,res,true);
            }
        };

        //地图配置
        var mapConfig = (dataArr) => {
            $scope.optionEarthMap = {
                // backgroundColor: '#404a59',
                color:['#20a0ff','#f7ba2a'],
                title: {
                    text: '全国患者分布图',
                    // subtext: 'data from PM25.in',
                    // sublink: 'http://www.pm25.in',
                    left: 20,
                    top:20,
                    textStyle: {
                        color: '#2f2e2e'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter:params => `${params.seriesName}<br />${params.name}:${params['value'][2]}`
                },
                legend: {
                    // orient: 'vertical',
                    // y: 'bottom',
                    selectedMode:'single',
                    orient: 'vertical',
                    left:20,
                    top:65,
                    data:['患者分布','病历分布'],
                    textStyle: {
                        color: '#575d6a',
                        fontSize:14
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        normal:{
                            position:'inside',
                            show:true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    roam: true,
                    scaleLimit:{
                        min:1
                    },
                    itemStyle: {
                        normal: {
                            formatter:'{b}',
                            color:'#9397A2',
                            areaColor: '#CFDAE2',
                            borderColor: '#fff'
                        },
                        emphasis: {
                            areaColor: '#93abbc'
                        }
                    },
                    aspectScale:0.8
                    // regions:provinceList
                },
                series : [
                    {
                        name: '患者分布',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(dataArr,true),
                        symbolSize: function (val) {
                            return val[2] / 2; /// 10
                        },
                        // showEffectOn: 'render',
                        // rippleEffect: {
                        //     brushType: 'stroke'
                        // },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: '#20A0FF',
                                shadowBlur: 10,
                                shadowColor: '#20A0FF'
                            }
                        },
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    },
                    {
                        name: '病历分布',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(dataArr,false),
                        symbolSize: function (val) {
                            return val[2] / 2;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        
                        itemStyle: {
                            normal: {
                                color: '#F7BA2A',
                                shadowBlur: 10,
                                shadowColor: '#F7BA2A'
                            }
                        },
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }
                ],
                animationEasing:'sinusoidalOut',
                animationDuration:function(idx){
                    return idx * 5;
                },
                animationEasingUpdate:'bounceOut',
                animationDelayUpdate:function(idx){
                    return idx * 5;
                }
            };
        };
        
        // socket
        if($scope.user.userType == 4){
            homeService.init();
        }
        $scope.$on('RaiseMessageEvent', (evt,obj) => {
            $scope.dataArr = JSON.parse(obj);
            $scope.$apply();
            mapConfig($scope.dataArr);
            $scope.$broadcast('resizeMap',{option:$scope.optionEarthMap,loadNum:$scope.loadNum});
        });

        $scope.$on('$destroy',(evt,obj) => {
            if($scope.user.userType == 4){
                $rootScope.sockets.close(1000,'正常关闭连接！');
            }
        });
    }
}

HomeMainCtrl.$inject = ['$rootScope','$scope', '$state', 'toastr', '$timeout', '$cookies', 'homeService','$ocLazyLoad'];

module.exports = (ngMold) => {
    require.ensure(['../service/home-service'], (require) => {
        require('../service/home-service')(ngMold);
    }, './home/home-service');
    // require.ensure(['../service/socketIo-service'], (require) => {
    //     require('../service/socketIo-service')(ngMold);
    // }, './home/socketio-service');
    require('../directive/echarts-ui-directive')(ngMold);
    ngMold.controller('homeMainCtrl', HomeMainCtrl);
}