require('../../../../images/user-man.png');
require('../../../../images/user-woman.png');
class AddEditCtrl {
    constructor($scope, items, $uibModalInstance,$timeout,$interval) {
        $scope.items = items;
        $scope.type=items.type;

        $scope.man = 'images/user-man.png';
        $scope.woman = 'images/user-woman.png';

        $scope.obj={
            patientId:1,
            departmentId:1,
            doctorId:1,
            sex:'F',
            dayDate:moment().format('YYYY-MM-DD'),
            timeLong:15,
            interval:15,
        };

        //患者列表
        $scope.patientArr = [
            {
                name:'患者一',
                id:1
            },{
                name:'患者二',
                id:2
            },{
                name:'患者三',
                id:3
            }
        ];

        //科室列表
        $scope.jobArr = [
            {
                name:'科室一',
                id:1
            },{
                name:'科室二',
                id:2
            },{
                name:'科室三',
                id:3
            }
        ];

        //医生列表
        $scope.doctorArr = [
            {
                name:'医生一',
                id:1
            },{
                name:'医生二',
                id:2
            },{
                name:'医生三',
                id:3
            }
        ];

        //日期配置项
        $scope.optionObj = {
            locale: 'zh-cn',
            format: "YYYY-MM-DD HH:mm",
            dayViewHeaderFormat:"YYYY-MM",
            stepping:15,
            allowInputToggle:true,
            sideBySide:true,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'bottom'
             },
             allowInputToggle:true
        };
        
        //医生预约视图------------------------------------------
        // console.log(Scheduler.getSchedulerInstance());
        // scheduler初始化函数
        let sectionList = [];
        var schedulerDataInit = () => {
            // 初始化日历格式数据
            scheduler.config.first_hour = 8;
            scheduler.config.last_hour = 24;
            // scheduler.config.full_day = true; //将事件的持续时间设置为全天
            scheduler.config.time_step = 15;
            scheduler.config.hour_size_px = 176;
            scheduler.xy.min_event_height = 44;
            scheduler.xy.menu_width = 0;
            scheduler.config.multi_day = false;
            scheduler.config.delay_render = 200;
            scheduler.config.collision_limit = 5;
            scheduler.config.use_select_menu_space = false;
            scheduler.config.mark_now = false; //当前时间的红线
            scheduler.xy.scale_height = 0;
            scheduler.xy.nav_height = 30;
            
        
            scheduler.config.details_on_create = false; //双击或者拖拽创建事件
            scheduler.config.details_on_dblclick = false; // 双击弹出编辑窗口
            scheduler.config.drag_create = false; //拖拽、拉伸创建事件
        
        
            // 日期显示格式配置
            scheduler.config.default_date = '%Y年%m月%d日';
            scheduler.config.month_date = '%Y年%m月';
            scheduler.config.day_date = '%m月%d日 %l';
            scheduler.config.xml_date = "%Y年%m月%d日 %H:%i";
            scheduler.config.unit_date = "%Y年%m月%d日 %H:%i";
        
            sectionList = [
                {
                    key:1, 
                    label:"Section A",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 11, minute: 0}
                    },{
                        start: {hour: 13, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                }
            ];
            scheduler.createUnitsView({
                name:"unit",
                property:"section_id", 
                list:sectionList,
                size:1,                                     
                step:1
            });
            
            // scheduler.createUnitsView("unit", "section_id", sectionList);
            scheduler.init('scheduler_here_pop',new Date(),'unit');
            scheduler.parse([
                {
                    id:1, 
                    text:"Task1", 
                    start_date:new Date(2018,0,2,9), 
                    end_date:new Date(2018,0,2,10),
                    color:'#ff0', 
                    section_id:1,
                    _ev_status_bd_bg:"#F7BA2A",
                    _ev_type_bg:"#20A0FF",
                    _ev_type_text:"查",
                    _inner:false,
                    _sday:4,
                    _sorder:0,
                    _timed:true,
                    _count:1,
                    services:[
                        {
                            name:'测试展示多余信息' 
                        }
                    ]
                }
            ],"json");


            cal_curr_timeLine(true);
            $('#dhx_cal_data_pop')[0].onscroll = dhx_cal_data_scroll;

            // 注册scheduler事件
            scheduler_attachEvent();
        };

        //watch event of the scheduler--------------------------------------------------------------
        var dragged_obj, 
            dragEvent,           // 监听拖拽前事件
            dragEventEnd,        //拖拽或者调整大小后
            clickEvent,          //监听单击事件
            dbClickEvent,        //双击事件
            viewChangeEnd,       //视图变化后
            eventEmptyEvent,     //点击空白处触发
            eventBeforeLightBox; //弹窗前
        // 添加scheduler事件监听器
        var scheduler_attachEvent = () => {
            dragEvent = scheduler.attachEvent('onBeforeDrag',function(id,mode,e){
                return false;
            });
            dragEventEnd = scheduler.attachEvent("onDragEnd", function(){});
            clickEvent = scheduler.attachEvent('onClick',function(id,e){
                return false;
            });
            dbClickEvent = scheduler.attachEvent('onDblClick',function(id,e){
                return false;
            });
            viewChangeEnd = scheduler.attachEvent('onViewChange',function(new_mode,new_date){
            });
            eventEmptyEvent = scheduler.attachEvent('onEmptyClick', function(date,e){
                return false;
            });
            eventBeforeLightBox = scheduler.attachEvent('onBeforeLightbox',function(id){
                return false;
            });
        }
        // 清除事件
        var scheduler_detachEvent = function () {
            scheduler.detachEvent(dragEvent);
            scheduler.detachEvent(dragEventEnd);
            scheduler.detachEvent(clickEvent);
            scheduler.detachEvent(dbClickEvent);

            scheduler.detachEvent(viewChangeEnd);
            scheduler.detachEvent(eventEmptyEvent);
            scheduler.detachEvent(eventBeforeLightBox);
        };
        //watch event of the scheduler--------------------------------------------------------------

        //时间轴--------------------------------------------------------------------------------------
        // 当前时间轴
        var initOffsetTop_timeline = 81; //除去顶部的高度
        var cal_curr_timeLine = function (isCalScrollTop) {
            var currTime = new Date();
            var startTime = new Date(moment().format("YYYY-MM-DD") + " 08:00");
    
            // 取值到分钟的时间差
            var durationM = (currTime.getTime() - startTime.getTime()) / 60000;
            var _durationM = Math.round(durationM * 44 / 15, 1);
    
            var apptBox = $("#dhx_cal_data_pop");
            initOffsetTop_timeline = _durationM + 81;
    
            $scope.obj.offsetTopTimeLine = Math.round(initOffsetTop_timeline - apptBox[0].scrollTop, 1);
            $('.div_curr_time_pop').css("top",$scope.obj.offsetTopTimeLine + 'px');
            // 有可能是人为拖动，不必再滚动
            if (isCalScrollTop) {
                apptBox.scrollTop(_durationM - 176); //往下偏移一个小时 -- 44 * 4
            }
        };
        
        // scheduler滚动时
        var dhx_cal_data_scroll = function (e) {
            $scope.obj.offsetTopTimeLine = Math.round(initOffsetTop_timeline - e.target.scrollTop, 1);
            $('.div_curr_time_pop').css("top",$scope.obj.offsetTopTimeLine + 'px');
            $scope.$apply();
            // cal_tooltip_y(e.target);
        };
    
        // 1分钟更新一下时间轴
        var timer_calTimeline = $interval(function () {
            cal_curr_timeLine(false);
        }, 60000);
        //时间轴--------------------------------------------------------------------------------------

        scheduler_detachEvent();
        scheduler.clearAll();
        $timeout(function(){
            schedulerDataInit();
        },20);
        //医生预约视图------------------------------------------

        
        //显示时间插件
        $scope.dateShow = function(){
            $('#datetimepicker').focus();
        };

        //时间值变化
        $scope.datechange = function(){
            let ymd = moment($scope.obj.dayDate).format('YYYY年MM月DD日');
            let hm = moment($scope.obj.dayDate).format('HH:mm');
            let week = moment($scope.obj.dayDate).weekday();
            let weekCn = week == 0 ? '一' : week == 1 ? '二' : week == 2 ? '三' :week == 3 ? '四' :week == 4 ? '五' :week == 5 ? '六' :'天';

            $scope.dateStr = `${ymd} 星期${weekCn} ${hm}`;
            scheduler.setCurrentView(new Date($scope.obj.dayDate),'unit');
        };

        var deleteUnitFn = function(){
            scheduler.clearAll();
            //清除配置,不然scroll会重复请求
            scheduler_detachEvent();

            // 移除计时器
            $interval.cancel(timer_calTimeline);
        };
        //取消
        $scope.cancle = () => {
            deleteUnitFn();
            $uibModalInstance.close('cancle');
        };
        //保存
        $scope.sure = () => {
            deleteUnitFn();
            $uibModalInstance.close('save');
        };

        $scope.$on("$destroy", function () {
            deleteUnitFn();
        });
    };
}

AddEditCtrl.$inject = ['$scope', 'items', '$uibModalInstance','$timeout','$interval'];

module.exports = (ngMold) => {
    // require.ensure(['../service/main-service'], (require) => {
    //     const service = require('../service/main-service')(ngMold);
    // }, './common/main-serve');
    ngMold.controller('addEditCtrl', AddEditCtrl);
}