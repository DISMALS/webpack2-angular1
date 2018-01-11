class ApptListCtrl {
    constructor($rootScope, $scope, $uibModal, $timeout, $cookies, APP_CONFIG,$state,toastr,$interval) {
        $scope.obj={
            periodOfTime:1,
            doctorId:1,
            dateStart:moment().format('YYYY-MM-DD'),
            dateEnd:moment().format('YYYY-MM-DD')
        };
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        };

        

        //时间段列表
        $scope.periodOfTimeArr = [
            {
                name:'本日',
                id:1
            },{
                name:'本周',
                id:2
            },{
                name:'本月',
                id:3
            },{
                name:'最近半年',
                id:4
            },{
                name:'自定义',
                id:5
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
        
        $timeout(function(){
            $scope.apptList = [
                {
                    name:'斩三',
                    phon:'15138991340',
                    apptTime:'2018-01-02 12:45',
                    apptDoctor:'站医生',
                    mark:'这是备注信息'
                },
                {
                    name:'里斯',
                    phon:'15138991340',
                    apptTime:'2018-01-02 12:45',
                    apptDoctor:'站医生',
                    mark:'这是备注信息'
                },
                {
                    name:'网闸',
                    phon:'15138991340',
                    apptTime:'2018-01-02 12:45',
                    apptDoctor:'站医生',
                    mark:'这是备注信息'
                },
                {
                    name:'社么',
                    phon:'15138991340',
                    apptTime:'2018-01-02 12:45',
                    apptDoctor:'站医生',
                    mark:'这是备注信息'
                },
                {
                    name:'慕容美雪',
                    phon:'15138991340',
                    apptTime:'2018-01-02 12:45',
                    apptDoctor:'站医生',
                    mark:'这是备注信息'
                },
                {
                    name:'黄埔66期',
                    phon:'15138991340',
                    apptTime:'2018-01-02 12:45',
                    apptDoctor:'站医生',
                    mark:'这是备注信息'
                }
            ];
    
            $scope.$broadcast('dataList',{data:$scope.apptList});
        },20);

        //layui
        $scope.tableOptions ={
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[{ field: "name",title: '姓名',width: '15%',fixed:'left',align: 'center',unresize:true},
                 { field: "phon", title: '手机', type: "text",width:'20%',align: 'center'},
                { field: "apptTime", title: '预约时间', type: "text",align: 'center',unresize:true },
                { field: "apptDoctor", title: '预约医生', type: "text", unresize:true,align: 'center' },
                { field: "mark", title: '备注', type: "text", unresize:true,align: 'center' },
                {
                    title: '操作',  
                    fixed:'right',
                    align: 'center',
                    unresize:true,
                    toolbar:`<div>
                    <a class="grid-delete resourceOperation look" lay-event="cancle" data-title="取消预约"></a>
                    <a class="grid-edit resourceOperation look" lay-event="edit" data-title="编辑预约"></a>
                    <a class="common_btn send-message-icon resourceOperation look" lay-event="send" data-title="发送短信"></a></div>
                     </div>`
                }
            ]]
        };
     
        //监听table事件
        layui.table.on('tool(layuiTable)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'edit'){
            	  $('.hidetip').hide();
            	  $timeout(function(){
            	  	$scope.createAppointment(data);
            	  },10)
            }
            if(layEvent === 'cancle'){
            	    $('.hidetip').hide();
            	    $timeout(function(){
            	  		$scope.cancleAppt(data);
            	  },10)
            }
            if(layEvent === 'send'){
                $scope.sendMessage(data)
            }
        });

        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            // let row = $scope.medicalRecordList[parseInt(obj.index)];
            // $scope.openDetails(row);
        });

        //取消预约
        $scope.cancleAppt = function(data){
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../common/html/delete-modal.html'),
                controller: 'deleteModalCtrl',
                controllerAs: 'deleteModalCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '取消预约',
                            item: data,
                            content: '取消后不可恢复，确定要取消预约么？',
                            patinet:true
                        };
                    },
                    deleteModalCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../common/controller/delete-modal-controller'], (require) => {
                            const ctrl = require('../../common/controller/delete-modal-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './common/delete-modal-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
                console.log(result);
            });
        };

        //发送短信
        $scope.sendMessage = (data) => {
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
                            title: '发送短信',
                            type:'SEND',
                            content:'功能正在开发中,敬请期待~'
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

        //编辑预约
        $scope.createAppointment = (obj) => {
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
                            title: '预约明细',
                            type:'DETAILS_APPT',
                            event_obj:obj
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
                console.log(result);
            });
        };

        $scope.pageConfig.pageCount = 100;
        
        // 分页函数-----------------------------------------------
        $scope.pagination = {
            pageCount: 0,
            pageSize:10,
            currentPage: 1,
            goToPage: '',
            items:[],
            goto: function(pageNum) {
                if ($scope.pageConfig.pageCount > $scope.pageConfig.pageSize) {
                    if (parseInt(pageNum) > $scope.pagination.pageCount) {
                        toastr.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数', null, 3000);
                        $scope.pagination.goToPage = '';
                        return;
                    };
                    $scope.pagination.currentPage = parseInt(pageNum);
                }
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            previousPage: function() {
                $scope.pagination.currentPage--;
                $scope.initPageBar($scope.pageConfig.pageCount);
            },
            nextPage: function() {
                $scope.pagination.currentPage++;
                $scope.initPageBar($scope.pageConfig.pageCount);
            }
        };
        $scope.initPageBar = (pageCount, first) => {
            var maxPages = 5;
            var pageNum = $scope.pagination.currentPage;
            var totalPages = $scope.pagination.pageCount = Math.ceil(pageCount / $scope.pageConfig.pageSize);
            if (totalPages > maxPages) {
                var start, end, arr = [];
                if (parseInt(pageNum) <= Math.floor(maxPages / 2 + 1)) {
                    start = 1;
                    end = maxPages;
                } else if (parseInt(pageNum) > totalPages - Math.floor(maxPages / 2)) {
                    start = totalPages - maxPages + 1;
                    end = totalPages;
                } else {
                    start = parseInt(pageNum) - Math.floor(maxPages / 2);
                    end = parseInt(pageNum) + Math.ceil(maxPages / 2 - 1);
                }
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            } else {
                var arr = [];
                for (var i = 1; i <= totalPages; i++) {
                    arr.push(i);
                }
                $scope.pagination.items = arr;
            };
            if (!first) {
                // console.log(123)
                $scope.pageConfig.pageIndex = parseInt(pageNum);
                if($scope.seachObj&&$scope.seachObj.filterConditions.length>0){
                    $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.seachObj);
                }else{
                    $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                }
            }

        }
        $scope.jumpTo = (evt) => {
            let value = $scope.pagination.goToPage;
            let reg = /\d/g;
            if (evt.keyCode == 13) {
                if (reg.test(value)) {
                    if (value == 0) {
                        toastr.error('请输入大于' + 0 + '的正整数', null, 3000);
                        $scope.pagination.goToPage = '';
                    } else if (value > 0) {
                        $scope.pagination.goto($scope.pagination.goToPage);
                        $scope.pagination.goToPage = '';
                    }
                } else if (value == '') {
                    $scope.pagination.goto(1);
                } else {
                    toastr.error('输入的页数格式不正确，请重新输入！', null, 3000);
                    $scope.pagination.goToPage = '';
                }
            }
        }
        $scope.initPageBar($scope.pageConfig.pageCount, true);
        // 分页函数-----------------------------------------------

         //切换到日历视图
         $scope.goScheduler = () => {
            $state.go('dryad.appointment.view');
        };

        $scope.$on("$destroy", function () {
            
        });
    }
}


ApptListCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$timeout', '$cookies', 'APP_CONFIG','$state','toastr','$interval'];
module.exports = (ngMold) => {
    ngMold.controller('apptListCtrl', ApptListCtrl);
};