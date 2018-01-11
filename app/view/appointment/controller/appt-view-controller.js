require('../../../../images/user-man.png');
require('../../../../images/user-woman.png');
class ApptViewCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG,$state,toastr,$interval) {
        $scope.man = 'images/user-man.png';
        $scope.woman = 'images/user-woman.png';
        // 初始化页面其它基础数据
        $scope.obj = {
            department:1,
            dayDate:moment().format('YYYY-MM-DD'),
            viewTypes:'unit',
            isShowApptDetails:false
        };

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

        // 详情信息
        $scope.apptDetails = {
            startStr:moment(374598349579).format("HH:mm"),
            endStr:moment().format("HH:mm"),
            doctorName:'王医生',
            patientName:'小胖子',
            birthday:'24岁',
            note:'这是备注信息！',
            gender:'http://em-demo.linkedcare.cn/img/customer/customer-man.png',
            sex:'M'
        };

        //日期配置项
        $scope.optionObj = {
            locale: 'zh-cn',
            format: "YYYY-MM-DD",
            dayViewHeaderFormat:"YYYY-MM",
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'bottom'
             },
             allowInputToggle:true
        };


        // scheduler初始化函数
        // console.log(scheduler);
        let sections = [];
        var schedulerDataInit = () => {
            // 初始化日历格式数据
            scheduler.config.first_hour = 8;
            scheduler.config.last_hour = 24;
            // scheduler.config.full_day = true; //将事件的持续时间设置为全天
            scheduler.config.time_step = 15;
            scheduler.config.hour_size_px = 176;
            scheduler.xy.min_event_height = 44;
            scheduler.xy.menu_width = 0;
            scheduler.config.multi_day = true;
            scheduler.config.delay_render = 200;
            scheduler.config.collision_limit = 5;
            scheduler.config.use_select_menu_space = false;
            scheduler.config.mark_now = false; //当前时间的红线
            scheduler.xy.scale_height = 20;
            scheduler.xy.nav_height = 59;
            
        
            scheduler.config.details_on_create = true; //双击或者拖拽创建事件
            scheduler.config.details_on_dblclick = true; // 双击弹出编辑窗口
            scheduler.config.drag_create = true; //拖拽、拉伸创建事件
        
        
            // 日期显示格式配置
            scheduler.config.default_date = '%Y年%m月%d日 %H:%i';
            scheduler.config.month_date = '%Y年%m月';
            scheduler.config.day_date = '%m月%d日 %l';
            scheduler.config.xml_date = "%Y年%m月%d日 %H:%i";
        
            sections = [
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
                },
                {
                    key:22, 
                    label:"Section B",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:3, 
                    label:"Section C",
                    schedules: [{
                        start: {hour: 15, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:4, 
                    label:"Section D",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:5, 
                    label:"Section 55",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:6, 
                    label:"Section 66",
                    schedules: [{
                        start: {hour: 15, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:7, 
                    label:"Section 77",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:8, 
                    label:"Section 88",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:9, 
                    label:"Section 99",
                    schedules: [{
                        start: {hour: 15, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:10, 
                    label:"Section 10",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                },
                {
                    key:11, 
                    label:"Section 11",
                    schedules: [{
                        start: {hour: 8, minute: 0},
                        end: {hour: 22, minute: 0}
                    }]
                } 
            ];
            scheduler.createUnitsView({
                name:"unit",
                property:"section_id", 
                list:sections,
                size:8,                                     
                step:8
            });
            
            // scheduler.createUnitsView("unit", "section_id", sections);
            scheduler.init('scheduler_here',new Date(),'unit');
            scheduler.parse([
                {
                    id:1, 
                    text:"Task1", 
                    start_date:new Date(2017,11,26,9), 
                    end_date:new Date(2017,11,26,10),
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
                },
                {
                    id:2, 
                    text:"Task2", 
                    start_date:new Date(2017,11,26,11), 
                    end_date:new Date(2017,11,26,12), 
                    section_id:3,
                    _ev_status_bd_bg:"#F7BA2A",
                    _ev_type_bg:"#20A0FF"
                },
                {
                    id:3, text:"Task3", 
                    start_date:new Date(2017,11,26,15), 
                    end_date:new Date(2017,11,26,18), 
                    section_id:2,
                    _ev_status_bd_bg:"#F7BA2A",
                    _ev_type_bg:"#20A0FF"
                }
            ],"json");


            cal_curr_timeLine(true);
            $('#dhx_cal_data')[0].onscroll = dhx_cal_data_scroll;

            // 注册scheduler事件
            scheduler_attachEvent();
        };

        //无效时间
        // scheduler.addMarkedTimespan({ // blocks 4th July,2012 (this is Wednesday).
        //     days:  new Date(),
        //     zones: [9*60,10*60,12*60,15*60], 
        //     sections:{
        //         unit:2
        //     },
        //     type:  "dhx_time_block",
        //     css:   "red_section" // the name of applied CSS class
        // });
        // scheduler.updateView();
    
        // 切换视图类型
        $scope.changeView = function(viewType){
            if(viewType == 'unit'){
                $scope.obj.dayDate = moment().format('YYYY-MM-DD');
            }
            $scope.obj.viewTypes = viewType;
            scheduler.setCurrentView(new Date($scope.obj.dayDate),$scope.obj.viewTypes);
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
                $(".vertical-check-content").css('display','none');
                dragged_obj = {
                    dragged_event:scheduler.getEvent(id),
                    mode,
                    id
                }
                console.log('拖拽：',id,mode,e);
                return true;
            });
            dragEventEnd = scheduler.attachEvent("onDragEnd", function(){
                console.log(dragged_obj);
                if(dragged_obj.mode == 'resize'){
                    $scope.createAppointment(dragged_obj);
                }
                if(dragged_obj.mode == 'move'){
                    console.log('移动时间块!');
                    $scope.moveAppt(dragged_obj);
                }
                $(".vertical-check-content").css('display','none');
            });
            clickEvent = scheduler.attachEvent('onClick',function(id,e){
                console.log('单击：',id,e);
                if(!id){
                    $(".vertical-check-content").css('display','none');
                    return false;
                }
                show_ev_details(id,e);
                return false;
            });
            dbClickEvent = scheduler.attachEvent('onDblClick',function(id,e){
                dragged_obj = {
                    dragged_event:scheduler.getEvent(id),
                    mode:'dblClick',
                    id
                }
                console.log(dragged_obj);
                $scope.createAppointment(dragged_obj);
                $(".vertical-check-content").css('display','none');
            });
            // cellClickEvent = scheduler.attachEvent('onCellClick',function(x_ind, y_ind, x_val, y_val, e){
            //     console.log('cell单击：',x_ind,y_ind,x_val,y_val,e);
            //     $(".vertical-check-content").css('display','none');
            //     return false;
            // });
            // viewChangeEvent = scheduler.attachEvent('onBeforeViewChange',function(old_mode,old_date,mode,date){
            //     console.log('视图类型：',old_mode,old_date,mode,date);
            //     $(".vertical-check-content").css('display','none');
            //     return false;
            // });
            viewChangeEnd = scheduler.attachEvent('onViewChange',function(new_mode,new_date){
                console.log('点击修改时间：',new_mode,new_date);
                $(".vertical-check-content").css('display','none');
                if(new_mode == 'unit'){
                    $scope.obj.dayDate = moment(new_date).format('YYYY-MM-DD');
                    $scope.$applyAsync();
                }
            });
            eventEmptyEvent = scheduler.attachEvent('onEmptyClick', function(date,e){
                console.log('点击了空白处：',date,e);
                $(".vertical-check-content").css('display','none');
                return false;
            });
            eventBeforeLightBox = scheduler.attachEvent('onBeforeLightbox',function(id){
                console.log('弹窗：',id);
                dragged_obj.dragged_event=scheduler.getEvent(id);
                dragged_obj.id = id;
                $scope.createAppointment(dragged_obj);
                $(".vertical-check-content").css('display','none');
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
    
            var apptBox = $("#dhx_cal_data");
            initOffsetTop_timeline = _durationM + 81;
    
            $scope.obj.offsetTopTimeLine = Math.round(initOffsetTop_timeline - apptBox[0].scrollTop, 1);
            $('.div_curr_time').css("top",$scope.obj.offsetTopTimeLine + 'px');
            console.log($scope.obj.offsetTopTimeLine);
            // 有可能是人为拖动，不必再滚动
            if (isCalScrollTop) {
                apptBox.scrollTop(_durationM - 176); //往下偏移一个小时 -- 44 * 4
            }
        };
        
        // scheduler滚动时
        var dhx_cal_data_scroll = function (e) {
            $scope.obj.offsetTopTimeLine = Math.round(initOffsetTop_timeline - e.target.scrollTop, 1);
            $('.div_curr_time').css("top",$scope.obj.offsetTopTimeLine + 'px');
            $scope.$apply();
            cal_tooltip_y(e.target);
        };
    
        // 1分钟更新一下时间轴
        var timer_calTimeline = $interval(function () {
            cal_curr_timeLine(false);
        }, 60000);
        //时间轴--------------------------------------------------------------------------------------

        //新建预约/修改预约
        $scope.createAppointment = (obj) => {
            scheduler_detachEvent();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/add-edit-appt.html'),
                controller: 'addEditCtrl',
                controllerAs: 'addEditVm',
                size: 'width-850',
                resolve: {
                    items: function() {
                        return {
                            title: obj.mode == "dblClick" ? '预约明细' : '新建预约',
                            type:obj.mode == "dblClick" ? 'DETAILS_APPT' : 'NEW_ADD',
                            event_obj:obj || null
                        };
                    },
                    addEditCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./add-edit-appt-controller'], (require) => {
                            const ctrl = require('./add-edit-appt-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './appointment/add-edit-appt-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                schedulerDataInit();
            });
        };

        //发送短信/取消预约
        $scope.sendMessage = (account) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/send-message-cancle.html'),
                controller: 'sendMessageCancleCtrl',
                controllerAs: 'sendMessageCancleCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: account == 'CANCLE' ? '取消预约' : '发送短信',
                            type:account,
                            content:account == 'CANCLE' ? null : '功能正在开发中,敬请期待~'
                        };
                    },
                    sendMessageCancleCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./send-message-cancle'], (require) => {
                            const ctrl = require('./send-message-cancle')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './appointment/send-message-cancle');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
             
            });
        };

        //移动时间块
        $scope.moveAppt = (obj) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/send-message-cancle.html'),
                controller: 'sendMessageCancleCtrl',
                controllerAs: 'sendMessageCancleCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            type:'MOVE',
                            content:'确认修改预约时间?'
                        };
                    },
                    sendMessageCancleCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./send-message-cancle'], (require) => {
                            const ctrl = require('./send-message-cancle')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './appointment/send-message-cancle');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
             
            });
        };

        // 点击显示预约详情----------------------------------------------------------------------
        var evDiv_offsetTop = 0;
        var evDiv_bb = 0; // 往上微调
        var isOnUp = false;
        var show_ev_details = function (id, e) {
            var ev = scheduler.getEvent(id);
            // 计算x、y偏移
            var evDiv = e.srcElement.parentElement;
            var evDiv_p = evDiv.parentElement; // 该ev的section
            var evDiv_box = evDiv_p.parentElement;  // 放section 的box

            var max_w = evDiv_box.clientWidth; // 判断显示在左边还是右边
            var max_h = evDiv_box.clientHeight;

            var detail_w = 200;
            var detail_h = 205;

            var x = evDiv_p.offsetLeft + evDiv.offsetLeft + evDiv.clientWidth + detail_w;
            var selectorText = "";
            if (x > max_w) {
                x = evDiv_p.offsetLeft + evDiv.offsetLeft - detail_w - 14; // 左边
                $(".vertical-check-content").removeClass("onr").addClass("onl").css('display','block');
                selectorText = ".vertical-check-content.onl::before";
            } else {
                x = x - detail_w + 2;
                $(".vertical-check-content").removeClass("onl").addClass("onr").css('display','block');
                selectorText = ".vertical-check-content.onr::before";
            }

            var y = 0;
            evDiv_offsetTop = evDiv.offsetTop;

            var max_t_h = Math.max(evDiv.offsetTop - evDiv_box.scrollTop, 0); //ev的上边距
            var max_t_b = max_h - max_t_h;//ev的下边距+自身高度

            if (detail_h < max_t_b) {
                y = evDiv_box.offsetTop + Math.max(evDiv.offsetTop - evDiv_box.scrollTop, 0);
                $(".vertical-check-content").addClass("onb");
            } else {
                isOnUp = true;
                evDiv_bb = 10;
                while (detail_h > max_t_b) {
                    detail_h -= 10;
                    evDiv_bb += 10;
                }

                y = evDiv_box.offsetTop + Math.max(evDiv.offsetTop - evDiv_box.scrollTop, 0) - evDiv_bb;//+evDiv_box.scrollTop;//evDiv_box.offsetTop+evDiv.offsetTop-
                $(".vertical-check-content").removeClass("onb");
            }

            // 定位到三角箭头
            var cssRules = document.styleSheets[document.styleSheets.length - 1].cssRules;
            for (var ci in cssRules) {
                if (cssRules[ci].selectorText == selectorText) {
                    if(!$(evDiv).hasClass('dhx_cal_event')){
                        $(".vertical-check-content").css('display','none');
                        return false;
                    }
                    var bg = $(evDiv.firstChild.firstChild).css("background-color");
                    

                    if (selectorText.indexOf("onl") > -1)
                        cssRules[ci].style.borderLeftColor = bg;
                    else
                        cssRules[ci].style.borderRightColor = bg;

                    $(".div_appt_check_content").css({
                        "border-color": bg,
                        "box-shadow": ("0px 0px 6px rgba(0,0,0,0.3)")
                    });

                    if (isOnUp)
                        cssRules[ci].style.top = (10 + evDiv_bb) + "px";

                    break;
                }
            }

            if (sections.length < 2) {
                x += detail_w + 30;
            }

            var margin = y + "px 0 0 " + x + "px";
            $(".div_appt_check").css("margin", margin);
            // $scope.obj.isShowApptDetails = true;
            // $scope.$apply();
        };
        // 滚动时详情框位置调整
        var cal_tooltip_y = function (evDiv_box) {
            if (!$(".vertical-check-content").css('display') == 'block') return;

            var y = 0;
            if (isOnUp) {
                y = evDiv_box.offsetTop + (evDiv_offsetTop - evDiv_box.scrollTop) - evDiv_bb;//evDiv_box.offsetTop + Math.max(evDiv_offsetTop - evDiv_box.scrollTop, 0) - evDiv_bb;
            } else {
                y = evDiv_box.offsetTop + (evDiv_offsetTop - evDiv_box.scrollTop);//evDiv_box.offsetTop + Math.max(evDiv_offsetTop - evDiv_box.scrollTop, 0);
                //y = evDiv_box.offsetTop + evDiv_offsetTop - evDiv_box.scrollTop;
            }
            if(y <= 81){
                $(".vertical-check-content").css('display','none');
                return false;
            }
            $(".div_appt_check").css("margin-top", (y + "px"));
        };
        // 点击显示预约详情----------------------------------------------------------------------

        //切换到预约列表
        $scope.goList = () => {
            $state.go('dryad.appointment.list');
        };

        //显示时间插件
        $scope.dateShow = function(){
            $('#datetimepicker').focus();
        };

        $timeout(function () {
            schedulerDataInit();
        }, 20);

        //时间值变化
        $scope.datechange = function(){
            console.log($scope.obj.dayDate);
        };
        $scope.$on("$destroy", function () {
            //清除配置,不然scroll会重复请求
            scheduler_detachEvent();

            // 移除计时器
            $interval.cancel(timer_calTimeline);
        });
    }
}


ApptViewCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$timeout', '$cookies', 'APP_CONFIG','$state','toastr','$interval'];
module.exports = (ngMold) => {
    ngMold.controller('apptViewCtrl', ApptViewCtrl);
};