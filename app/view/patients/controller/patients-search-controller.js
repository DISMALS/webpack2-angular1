require('../../../../images/user-man.png');
require('../../../../images/user-woman.png');
class PatientsSearchCtrl {
    constructor($scope, $uibModal, $state,$timeout, PatientsService,$cookies,toastr,mainService) {
        $scope.user = JSON.parse($cookies.get('user'));

        let sessionStorageObj = window.sessionStorage; //使用sessionStorage存储数据，仅在当前会话有用
        let patientSearchAccount = sessionStorageObj.getItem('patientSearchAccount') || 0; //判断用哪种搜索1普通搜索，2高级搜索
        let searchPatientsCondition = sessionStorageObj.getItem('searchPatientsCondition') || ''; //搜索的缓存数据
        
        $scope.objs = {
            cleanFlag:true
        };
		$scope.relkeyword = '';
        //普通查询患者
        if(patientSearchAccount && patientSearchAccount == '1'){
            // console.log(searchPatientsCondition);
            $scope.keyword = searchPatientsCondition;
            $scope.selectKeyword = searchPatientsCondition;
        }else{
            $scope.keyword = '';
        }
        
        $scope.searchKeyword = () => {
        		$scope.seachObj = '';//清空缓存条件对分页函数的影响
        		$scope.relkeyword = $scope.keyword;
        		if($scope.pagination){
            		$scope.pagination.currentPage = 1;
            }
            init(1,10);
            $scope.screenList = [];
            $scope.objs.hisObj = null;
            sessionStorageObj.setItem('searchPatientsCondition',$scope.relkeyword);
            sessionStorageObj.setItem('patientSearchAccount','1');
        };
        $scope.enterFn = (evt) => {
            if(evt.keyCode == 13){
                $scope.searchKeyword();
            }
        };

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        }

        // 获取患者列表数据
        let init = (pageNo,listSize,...flag) => {
            if(flag.length > 0){ //高级搜索
                let obj = flag[0];
                obj.listSize = listSize;
                obj.pageNo = pageNo;
                // 搜索
                PatientsService.queryRelPatients(obj).then(rps => {
                    if(rps.status == 200){
                        _.each(rps.data, (item, i) => {
                            item.index = ((obj.pageNo - 1) * 10) + i + 1;
                            item.sexN = item.sex == 'M' ? '男' : '女';
                            item.visitDate = item.visitDate ? moment(item.visitDate).format('YYYY-MM-DD') : '';
                            item.detail='<a class="layui-btn layui-btn-mini" lay-event="detail">'+item.name+'</a>';
                            
                        })
                        $scope.patientList = rps.data;
                        $scope.pageConfig.pageCount = rps.pager.totalCount;
                        $scope.initPageBar($scope.pageConfig.pageCount, true);
                        $scope.$broadcast('dataList',{data:$scope.patientList});
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
                if(obj.save){
                    // 保存搜索条件
                    obj.filterType = 1;
                    PatientsService.updataFilter(obj).then(rps => {
                        if(rps.status == 200){
                            if(!rps.data){
                                // $scope.$broadcast('samename',{flag:rps.data});
                                $scope.objs.cleanFlag = false;
                                toastr.warning('查询记录名称已存在！',null,1000);
                                return false;
                            }
                            toastr.success('保存查询条件成功！',null,1000);
                            $scope.relSearchHisList($scope.user.employeeId,1);
                            $scope.objs.cleanFlag = true;
                        }else{
                            toastr.error(rps.errorMessage,null,1500);
                        }
                    });
                }
                
            }else{ //普通搜索
                let obj = {
                    keyword: $scope.relkeyword,
                    listSize: listSize,
                    pageNo: pageNo,
                    doctorId:$scope.user.employeeId
                };
                PatientsService.patientsSearch( obj ).then( data => {
                    if (data.status == 200) {
                        _.each(data.data, (item, i) => {
                            item.index = ((obj.pageNo - 1) * 10) + i + 1;
                            item.sexN = item.sex == 'M' ? '男' : '女';
                            item.visitDate = item.visitDate ? moment(item.visitDate).format('YYYY-MM-DD') : '';
                            item.detail='<a class="layui-btn layui-btn-mini" lay-event="detail">'+item.name+'</a>';
                        })
                        $scope.patientList = data.data;
                        $scope.pageConfig.pageCount = data.pager.totalCount;
                        $scope.initPageBar($scope.pageConfig.pageCount, true);
                        $scope.$broadcast('dataList',{data:$scope.patientList});
                    } else {
                        toastr.error(data.errorMessage, null, 1500);
                    }
                })
            }
            
        }
        

        //layui table <a class="layui-btn layui-btn-mini" lay-event="detail">查看</a>
        $scope.tableOptions ={
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'row'
            },
            cols:[[
                { field: "index", title: '#',width: '6%',align: 'center',unresize:true},
                { field: "detail", title: '姓名', align: 'center', width: '17%',unresize:true},
                { field: "sexN", title: '性别', width: '7%', align: 'center',unresize:true},
                { field: "birthday", title: '出生日期', width: '15%', align: 'center',unresize:true},
                { field: "visitDate", title: '最近就诊日期', width: '15%', align: 'center',unresize:true},
                { field: "job", title: '职业', width: '15%', align: 'center',unresize:true},
                {
                    title: '操作', 
                    align: 'center',
                    unresize:true,
                    toolbar:`<div>
                    <a class="layui-btn layui-btn-mini patientsee resourceOperation look" lay-event="detail" data-title="查看"></a>
                    <a class="layui-btn layui-btn-mini patientcmh resourceOperation look" lay-event="creatMedicalHistory" data-title="新增病历"></a>
                    <a class="layui-btn layui-btn-mini patientcfu resourceOperation look" lay-event="creatFollowUp" data-title="新增随访"></a>
                    </div>`
                }
            ]]
        };
        
        //监听table事件
        layui.table.on('tool(layuiTable)', function(obj){
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
            if(layEvent === 'detail'){
            		$('.hidetip').hide();
                $scope.openDetails(data)
            }else if(layEvent === 'creatFollowUp'){
            		$('.hidetip').hide();
                $scope.addFollowup(data);
            }
            else if(layEvent === 'creatMedicalHistory'){
            		$('.hidetip').hide();
                let newObj={};
                newObj.patientId = data.patientId;
                newObj.doctorId = $scope.user.employeeId;
                $scope.createHis(newObj);
            }
        });
         //新增病历主函数
         $scope.createHis = (obj) => {
            mainService.createMedicalRecordByPatients(obj).then((data) => {
                if(data.status == 200){
                		$('.hidetip').hide();
                    $state.go('dryad.medicalhistory.search',{createRecord:data.data});
                }else{
                    toastr.error(data.errorMessage,null,3000);
                }
            });
        }
        $scope.addFollowup = (data) => { //增加随访
        		$('.hidetip').hide();
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../../followUp/html/addFollowup.html'),
                controller: 'addFollowupCtrl',
                controllerAs: 'addFollowupVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            phoneNo: data.phoneNo,
                            patientName: data.name,
                        };
                    },
                    addFollowupCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['../../followUp/controller/addFollowup-controller'], (require) => {
                            const ctrl = require('../../followUp/controller/addFollowup-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './followUp/addFollowup-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        }

        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.patientList[parseInt(obj.index)];
            $scope.openDetails(row);
        });

        //open page the details
        $scope.openDetails = (row) => {
        		$('.hidetip').hide();
            $scope.$emit('addTab', {
                close: true,
                sex: row.sex,
                createdate:row.createDate || '',
                title: row.name,
                data: row,
                route: 'dryad.patients.details',
                params: {
                    pid: row.patientId
                }
            });
        };


        //高级搜索---------------------------------------------------------
        $scope.searchFn = (obj) => {
            $scope.filterObj = angular.copy(obj);
            // 缓存最原始的查询条件数据
            angular.forEach(obj.filterConditions,(element,i) => {
                element.transObj = {};
                element.transObj.logicRelation = $scope.transLogicRelation(element.logicRelation) || '';
                element.transObj.filterConditionName = $scope.transValueFn(element.filterCondition) || '';
                element.transObj.filterItemName = $scope.transSubject(element.filterItem) || '';
                element.transObj.beginValueName = $scope.transValueArea(element.filterItem,element.beginValue) || '';
                element.transObj.endValueName = $scope.transValueArea(element.filterItem,element.endValue) || '';
            });
            $scope.screenList = angular.copy(obj.filterConditions);
            
            // 删除高级查询条件里的多余数据
            obj.filterConditions.forEach(element => {
                delete element.transObj;
            });
            $scope.seachObj=angular.copy(obj); //作储存，翻页使用
            // 查询数据
            init(1,10,obj);
            if($scope.pagination){
            		$scope.initPageBar($scope.pageConfig.pageCount,true);
            }
            obj.save = false;
            let storageObj = {
                obj,
                screenList:$scope.screenList
            }
            $scope.keyword = '';
            $scope.objs.hisObj = null;
            sessionStorageObj.setItem('searchPatientsCondition',JSON.stringify(storageObj)); //保存当前搜索的条件列表和当前搜索的对象
            sessionStorageObj.setItem('patientSearchAccount','2');
        };

        //逻辑关系
        $scope.transLogicRelation = relation => {
            if(!relation){return false;}
            let transValue;
            switch(relation){
                case 'AND': //包含
                    transValue = '且';          
                    break;
                case 'OR': //或者
                    transValue = '或者';
                    break;
                case 'NOT': //不包含
                    transValue = '不包含';
                    break;
                default:
                    //do somthing
            }
            return transValue;
        };
        //转换查询主题
        $scope.transSubject = subject => {
            let transValue;
            switch(subject){
                case 'age': //年龄
                    transValue = '年龄';          
                    break;
                case 'sex': //性别
                    transValue = '性别';
                    break;
                default:
                    //do somthing
            }
            return transValue;
        };
        //转换查询条件
        $scope.transValueFn = condition => {
            let transValue;
            switch(condition){
                case 'gt': //大于
                    transValue = '大于';
                    break;
                case 'lt': //小于
                    transValue = '小于';
                    break;
                case 'equal': //等于
                    transValue = '等于';
                    break;
                case 'ltgt': //介于
                    transValue = '介于';
                    break;
                case 'in': //包含
                    transValue = '包含';
                    break;
                case 'not in': //不包含
                    transValue = '不包含';
                    break;
                default:
                    //do somthing
            }
            return transValue;
        }
        //转换查询域值
        $scope.transValueArea = (subject,valueArea) => {
            if(!valueArea){return false;}
            let transValue;
            switch(subject){
                case 'age': //年龄
                    transValue = valueArea + '岁';
                    break;
                case 'sex': //性别
                    transValue = (valueArea == 'M' ? '男' : valueArea == 'F' ? '女' : '未知');
                    break;
                default:
                    //do somthing
                    transValue = valueArea;
            }
            return transValue;
        };

        //delete filter item
        $scope.deleteFilter = (index) => {
            let searchPatientsCondition = sessionStorageObj.getItem('searchPatientsCondition');
            let relQueryObj = JSON.parse(searchPatientsCondition);
            $scope.screenList.splice(index, 1);
            $scope.seachObj.filterConditions.splice(index, 1);
            if($scope.screenList.length < 1){
                $scope.objs.hisObj = null;
            }
            //更新sessionStroage里缓存的数据
            relQueryObj.screenList.splice(index, 1);
            relQueryObj.obj.filterConditions = angular.copy(relQueryObj.screenList);
            // 删除高级查询条件里的多余数据
            relQueryObj.obj.filterConditions.forEach(element => {
                delete element.transObj;
            });
            sessionStorageObj.setItem('searchPatientsCondition',JSON.stringify(relQueryObj));
            sessionStorageObj.setItem('patientSearchAccount','2');
            // 查询数据
            relQueryObj.obj.save = false;
            if(relQueryObj.obj.filterConditions && relQueryObj.obj.filterConditions.length > 0){
                init(1,10,relQueryObj.obj);
            }else{
                $scope.searchKeyword();
            }
            
        };

        //clear filter
        $scope.clearFilter = () => {
            $scope.screenList = [];
            $scope.seachObj='';
            sessionStorageObj.removeItem('searchPatientsCondition');
            sessionStorageObj.setItem('patientSearchAccount','1');
            $scope.searchKeyword();
        };

        //edite filter
        $scope.editFilter = () => {
            let obj = {
                screenData: $scope.screenList,
                save: $scope.filterObj.save,
                filterName: $scope.filterObj.filterName
            }
            $scope.$broadcast('edite', obj);
        };


        //高级搜索历史记录列表
        $scope.relSearchHisList = (doctorId,filterType) => {
            PatientsService.getRelHistoryList(doctorId,filterType).then(rps => {
                if(rps.status == 200){
                    $scope.relSearchHisLists = rps.data;
                }else{
                    toastr.error(rps.errorMessage,null,1500);
                }
            });
        };
        $scope.relSearchHisList($scope.user.employeeId,1);
        //选中历史记录，搜索
        $scope.selectHisList = (evt,obj) => {
            let targetEle = evt.target;
            if(targetEle.className == 'delete-icon'){ //删除查询条件记录
                PatientsService.deleteRelHistoryList($scope.user.employeeId,obj.name).then(rps => {
                    if(rps.status == 200){
                        toastr.success('删除成功！',null,1000);
                        $scope.objs.hisObj = null;
                        $scope.relSearchHisList($scope.user.employeeId,1);
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
            }else{ //直接按照历史记录查询或者修改查询条件
                // 查询筛选条件详情
                PatientsService.getRelHistroyListDetails(1,$scope.user.employeeId,obj.name).then(rps => {
                    if(rps.status == 200){
                        if(targetEle.className == 'change-password'){ //修改筛选条件
                            let obj = {
                                screenData: rps.data.filterConditions,
                                save: true,
                                filterName: rps.data.filterName,
                                existFlg:rps.data.existFlg
                            }
                            $scope.$broadcast('edite', obj);
                        }else{  //直接查询患者
                            let obj = rps.data;
                            $scope.searchFn(obj);
                        }
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
            }
            
        };
        // 高级搜索---------------------------------------------------------------


        //判断使用高级搜索还是普通搜索或者是默认搜索
        if(patientSearchAccount){
            if(patientSearchAccount == '1'){ //普通搜索
                $scope.searchKeyword();
            }else if(patientSearchAccount == '2'){ //高级搜索
                let relQueryObj = JSON.parse(searchPatientsCondition);
                $scope.searchFn(relQueryObj.obj);
                $scope.screenList = relQueryObj.screenList;
            }
        }else{ //默认搜索
            init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
        }


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
                        toastr.error('请输入小于' + ($scope.pagination.pageCount + 1) + '的正整数');
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
                $scope.pageConfig.pageIndex = parseInt(pageNum);
                // $scope.pageDataFn($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                if($scope.seachObj&&$scope.seachObj.filterConditions.length>0){
                    init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize,$scope.seachObj);
                }else{
                		init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
                }
                
                // $scope.$emit('changePage', { pageIndex: $scope.pageConfig.pageIndex });
            }

        }
        $scope.jumpTo = (evt) => {
            let value = $scope.pagination.goToPage;
            let reg = /\d/g;
            if (evt.keyCode == 13) {
                if (reg.test(value)) {
                    if (value == 0) {
                        toastr.error('请输入大于' + 0 + '的正整数');
                        $scope.pagination.goToPage = '';
                    } else if (value > 0) {
                        $scope.pagination.goto($scope.pagination.goToPage);
                        $scope.pagination.goToPage = '';
                    }
                } else if (value == '') {
                    $scope.pagination.goto(1);
                } else {
                    toastr.error('输入的页数格式不正确，请重新输入！', null, 2000);
                    $scope.pagination.goToPage = '';
                }
            }
        }
        // 分页函数-----------------------------------------------


        $scope.$watch('$stateParams.createPatients',(newValue,oldValue) => {
            let $patientsData = angular.copy(newValue);
            // console.log($patientsData);
            // $cookies.putObject('viewPatientsDetails',{patientsData:$patientsData});
            if(newValue){
                //判断是否是顶部查看患者
                $scope.$emit('addTab', {
                    title: $patientsData.name || '',
                    createdate:$patientsData.createDate || '',
                    sex:$patientsData.sex || '',
                    data:$patientsData,
                    close: true,
                    route: 'dryad.patients.details',
                    params: {
                        pid: $patientsData.patientId
                    },
                    from:'head'
                });
            }
        });

    };

}
PatientsSearchCtrl.$inject = ['$scope', '$uibModal', '$state','$timeout', 'PatientsService','$cookies','toastr','mainService'];


module.exports = (ngMold) => {
    require.ensure(['../service/patients-service'], (require) => {
        require('../service/patients-service')(ngMold);
    }, './patients/patients-service');
    ngMold.controller('patientsSearchCtrl', PatientsSearchCtrl);
}