class MedicalHistorySearchCtrl {
    constructor($rootScope,$scope, $uibModal, $state, $stateParams,$timeout,medicalService,conmmonService,toastr,$cookies,_,$q) {
        $scope.user = JSON.parse($cookies.get('user'));
        $scope.objs = {
            cleanFlag:true
        };
		$scope.relkeyword = '';
        let sessionStorageObj = window.sessionStorage; //使用sessionStorage存储数据，仅在当前会话有用
        let medicalRecordSearchAccount = sessionStorageObj.getItem('medicalRecordSearchAccount') || 0; //判断用哪种搜索1普通搜索，2高级搜索
        let searchmedicalRecordCondition = sessionStorageObj.getItem('searchmedicalRecordCondition') || ''; //搜索的缓存数据

        //普通查询患者
        if(medicalRecordSearchAccount && medicalRecordSearchAccount == '1'){
            $scope.keyword = searchmedicalRecordCondition;
        }else{
            $scope.keyword = '';
        }
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10
        };
     
        // 初始化数据
        $scope.init=function(pageIndex,pageSize,...flag){
//             console.log('高级搜索初始化')
            if(flag.length > 0){ //高级搜索
                let obj = flag[0];
                obj.listSize = pageSize;
                obj.pageNo = pageIndex;
                // 搜索
                medicalService.queryRelMedicalRecord(obj).then(rps => {
                    if(rps.status == 200){
                        _.each(rps.data, (item, i) => {
                            item.detail='<a class="layui-btn layui-btn-mini" lay-event="detail">'+item.name+'</a>';
                            item.index = ((obj.pageNo - 1) * 10) + i + 1;
                            item.sex = item.sex == 'M' ||item.sex == '男'? '男' : '女';
                            item.first = item.first ? '初诊' : '复诊';
                            item.visitDate = item.visitDate ? moment(item.visitDate).format('YYYY-MM-DD') : '';
                        })
                        $scope.medicalRecordList = rps.data;
                        $scope.pageConfig.pageCount = rps.pager.totalCount;
                        $scope.initPageBar($scope.pageConfig.pageCount, true);
                        $scope.$broadcast('dataList',{data:$scope.medicalRecordList});
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
                if(obj.save){
                    // console.log(obj)
                    // 保存搜索条件
                    obj.filterType = 2;
                    medicalService.updataFilter(obj).then(rps => {
                        if(rps.status == 200){
                            if(!rps.data){
                                $scope.objs.cleanFlag = false;
                                toastr.warning('查询记录名称已存在！',null,1000);
                                return false;
                            }
                            toastr.success('保存查询条件成功！',null,1000);
                            $scope.relSearchHisList($scope.user.employeeId,2);
                            $scope.objs.cleanFlag = true;
                        }else{
                            toastr.error(rps.errorMessage,null,1500);
                        }
                    });
                }
                
            }else{ //普通搜索
                let obj = {
                    doctorId:$scope.user.employeeId,
                    pageNo:pageIndex,
                    listSize:pageSize,
                    keyword:$scope.relkeyword 
                };
                
                medicalService.searchMedicalRecordList(obj).then(function(data){
                    if(data.status==200){
                        _.each(data.data, (item, i) => {
                            item.detail='<a class="layui-btn layui-btn-mini" lay-event="detail">'+item.name+'</a>';
                            item.index = ((obj.pageNo - 1) * 10) + i + 1;
                            item.first = item.first ? '初诊' : '复诊';
                            item.sex =item.sex == 'M' ||item.sex == '男'? '男' : '女';
                            item.visitDate = item.visitDate ? moment(item.visitDate).format('YYYY-MM-DD') : '';
                        })
                        $scope.medicalRecordList = data.data;
                        $scope.pageConfig.pageCount = data.pager.totalCount;
                        $scope.initPageBar($scope.pageConfig.pageCount, true);
                        $scope.$broadcast('dataList',{data:$scope.medicalRecordList});
                    }else{
                        toastr.warning(data.errorMessage,null,3000);
                    }
                });
            }
        }
        // $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);

        //搜索
        $scope.seach=(data)=>{
        	$scope.seachObj = '';//清空缓存条件对分页函数的影响
        	$scope.relkeyword = $scope.keyword;
	        	if($scope.pagination){
	            	$scope.pagination.currentPage = 1;
	         }
            $scope.init(1,10);
            
            $scope.screenList = [];
            $scope.objs.hisObj = null;
            sessionStorageObj.setItem('searchmedicalRecordCondition',$scope.relkeyword);
            sessionStorageObj.setItem('medicalRecordSearchAccount','1');
        }
        $scope.enterFn = (evt) => {
            if(evt.keyCode == 13){
                $scope.seach();
            }
        };

        //layui
        $scope.tableOptions ={
            elem:'#layuiTable',
            skin:{
                even:true,
                size:'sm', //lg
                skin:'line'
            },
            cols:[[{ field: "index",title: '#',width: '6%',fixed:'left',align: 'center',unresize:true},
                 { field: "detail", title: '患者姓名', type: "text",width:'20%',align: 'center'},
                { field: "sex", title: '性别', type: "text",align: 'center',unresize:true },
                { field: "birthday", title: '出生日期', type: "text", unresize:true,align: 'center' },
                { field: "createDate", title: '病历创建日期', type: "text", unresize:true,align: 'center' },
                { field: "first", title: '就诊类型', type: "text",unresize:true,width: '15%',align: 'center'},
                {
                    title: '操作',  
                    fixed:'right',
                    align: 'center',
                    unresize:true,
                    toolbar:`<div>
                    <a class="grid-preview resourceOperation mr-0-1 look" lay-event="see" data-title="查看"></a>
                    <a class="grid-edit resourceOperation mr-0-1 look" lay-event="detail" data-title="编辑"></a>
                    <a class="grid-delete resourceOperation mr-0-1 look" lay-event="delete" data-title="删除"></a></div>
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
            	  $timeout(function(){
            	  	$scope.openDetails(data);
            	  },10)
            }
            if(layEvent === 'see'){
            	    $('.hidetip').hide();
            	    $timeout(function(){
            	  		$scope.caseOverview(data);
            	  },10)
            }
            if(layEvent === 'delete'){
                $scope.deleteItem(data)
            }
        });

        //双击行选中
        $scope.$on('dblclickRow',(evt,obj) => {
            let row = $scope.medicalRecordList[parseInt(obj.index)];
            $scope.openDetails(row);
        });
        //病例预览
        $scope.caseOverview=function(data){
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/medical-history-details-case.html'),
                controller: 'medicalHistoryDetailsCaseCtrl',
                controllerAs: 'medicalHistoryDetailsCaseCtrlVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            action: 'ADD',
                            rid:data.medicalRecordId,
                            pid:data.medicalPatientId,
                        };
                    },
                    medicalHistoryDetailsCaseCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./medical-history-details-case-controller'], (require) => {
                            const ctrl = require('./medical-history-details-case-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './medicalHistory/medical-history-details-case-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
           
        }
        $scope.deleteItem=(obj)=>{
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/medicalhistory-delete.html'),
                controller: 'delectMedicalhistoryCtrl',
                controllerAs: 'delectMedicalhistoryCtrlVm',
                size: 'width-400',
                resolve: {
                    items: function() {
                        return {
                            title: '提示',
                            type:'DELETE',
                            patinet: null,
                            content: '删除后不可恢复，确定要删除该病例么？'
                        };
                    },
                    delectMedicalhistoryCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./medicalhistory-delete-controller'], (require) => {
                            const ctrl = require('./medicalhistory-delete-controller')(require('../../../common/module'));
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
                if(result!='cancle'){ //没有搜索到患者时，新增病历
                   medicalService.deleteMedicalRecord(obj.medicalRecordId).then(res=>{
                        if(res.status==200){
                            toastr.success('删除成功', null, 2000);
                            $scope.seach();
                            $scope.$emit('deleteTab',obj) //删除右侧tab
                        }
                    })
                }
            });
            
        }
        //open page the details
        $scope.openDetails = (row) => {
            // console.log(row)
            $scope.$emit('addTab', {
                title: row.name,
                createdate:row.createDate,
                sex:row.sex,
                close: true,
                data:row,
                route: 'dryad.medicalhistory.details.baseinfo',
                params: {
                    pid:row.medicalPatientId,
                    rid:row.medicalRecordId,
                    first:row.first

                }
            });
        }; 


        //高级搜索---------------------------------------------------------
        $scope.searchFn = (obj) => {
            $scope.pageConfig.pageIndex=1;	
            if($scope.pagination&&$scope.pagination.currentPage){
                $scope.pagination.currentPage = 1;
            }
            $scope.filterObj = angular.copy(obj);
            // console.log(obj)
            // 缓存最原始的查询条件数据
            angular.forEach(obj.filterConditions,(element,i) => {
                element.transObj = {};
                // console.log(element)
                // 时间转换
                if((element.filterItem=='visitDate' ||element.filterItem=='firstTimeOccrDate' )&&element.beginValue){
                    element.beginValue=moment(element.beginValue).format('YYYY-MM-DD');
                }
                if((element.filterItem=='visitDate' ||element.filterItem=='firstTimeOccrDate' )&&element.endValue){
                    element.endValue=moment(element.endValue).format('YYYY-MM-DD');
                }
                //疾病分期id转name
                if(element.filterItem=='cpa' ||element.filterItem=='diseaseStage'||element.filterItem=='sod'||element.filterItem=='sodsub'||element.filterItem=='allergens'||element.filterItem=='cs' 
                    ||element.filterItem=='occupation' ||element.filterItem=='dryadStatus'||element.filterItem=='mostTimeOccr'||element.filterItem=='thisTimeCause'||element.filterItem=='suddenOccrStatus'
                    ||element.filterItem=='comp'||element.filterItem=='familyhis'||element.filterItem=='smokehis'||element.filterItem=='occupORlifeHis'){
                    if(element.filterItem=='cpa'){
                        if(element.valueArea){
                            _.each(element.valueArea,function(a,i){
                                if(a.drugId==element.beginValue){
                                    element.transObj.beginValueNameCn = a.drugName||'';
                                    element.valuestr=[element.transObj.beginValueNameCn];
                                }
                            })
                        }else{
                            if(element.valuestr&&element.valuestr.length){
                                element.transObj.beginValueNameCn =element.valuestr[0];
                            }
                        }
                        
                    }else{
                        if(element.valueArea){
                            _.each(element.valueArea,function(a,i){
                                if(a.dictItemValue==element.beginValue){
                                    element.transObj.beginValueNameCn = a.dictItemName||'';
                                    element.valuestr=[element.transObj.beginValueNameCn];
                                }
                            })
                        }else{
                            if(element.valuestr&&element.valuestr.length){
                                element.transObj.beginValueNameCn =element.valuestr[0];
                            }
                        }
                    }
                      
                }
                element.transObj.logicRelation = $scope.transLogicRelation(element.logicRelation) || '';
                element.transObj.filterConditionName = $scope.transValueFn(element.filterCondition) || '';
                element.transObj.filterItemName = $scope.transSubject(element.filterItem) || '';
                element.transObj.beginValueName = $scope.transValueArea(element.filterItem,element.beginValue)|| '';
                element.transObj.endValueName = $scope.transValueArea(element.filterItem,element.endValue) || '';
                // if(element.valueArea){delete element.valueArea;}
                // if(element.conditionList){delete element.conditionList;}
            });
            $scope.screenList = angular.copy(obj.filterConditions);
            
            // 删除高级查询条件里的多余数据
            obj.filterConditions.forEach(element => {
                delete element.transObj;
            });
            $scope.seachObj=angular.copy(obj); //作储存，翻页使用
            // 查询数据
            $scope.init($scope.pageConfig.pageIndex,10,obj);
            if($scope.pagination){
                    $scope.initPageBar($scope.pageConfig.pageCount,true);
                    // $scope.pagination.goto(1);
            }
            obj.save = false;
            let storageObj = {
                obj,
                screenList:$scope.screenList
            }
            $scope.keyword = '';
            $scope.objs.hisObj = null;
            sessionStorageObj.setItem('searchmedicalRecordCondition',JSON.stringify(storageObj)); //保存当前搜索的条件列表和当前搜索的对象
            sessionStorageObj.setItem('medicalRecordSearchAccount','2');
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
                case 'visitDate': //就诊日期
                    transValue = '就诊日期';
                    break;
                case 'cpa': //用药
                    transValue = '用药';
                    break;
                case 'diseaseStage': //疾病分期
                    transValue = '疾病分期';
                    break;
                case 'sod': //疾病严重程度
                    transValue = '疾病严重程度';
                    break;
                case 'sodsub': //病情严重程度
                    transValue = '病情严重程度';
                    break;
                case 'allergens': //过敏原
                    transValue = '过敏原';
                    break;
                case 'fev1': //FEV1
                    transValue = 'FEV1';
                    break;
                case 'fev1Percent': //FEV1(%pred)
                    transValue = 'FEV1(%pred)';
                    break;
                case 'cs': //备注更改
                    transValue = '哮喘控制水平';
                    break;
                case 'bmi': //备注更改
                    transValue = 'BMI指数';
                    break;
                case 'occupation': //备注更改
                    transValue = '职业';
                    break;
                case 'bloodoxydegree': //备注更改
                    transValue = '血氧饱和度(SpO2)';
                    break;
                case 'dryadStatus': //备注更改
                    transValue = '哮喘症状';
                    break;
                case 'mostTimeOccr': //备注更改
                    transValue = '症状高发时间';
                    break;
                case 'thisTimeCause': //备注更改
                    transValue = '本次发病因素';
                    break;
                case 'firstTimeOccrDate': //备注更改
                    transValue = '首次发病时间';
                    break;
                 case 'suddenOccrStatus': //备注更改
                    transValue = '急性发作情况';
                    break;
                case 'comp': //备注更改
                    transValue = '合并症';
                    break;
                case 'familyhis': //备注更改
                    transValue = '家族史';
                    break;
                case 'smokehis': //备注更改
                    transValue = '吸烟史';
                    break;
                case 'smokeyears': //备注更改
                    transValue = '吸烟年数';
                    break;
                case 'besmokeyears': //备注更改
                    transValue = '被动吸烟年数';
                    break;
                case 'occupORlifeHis': //备注更改
                    transValue = '职业/生活史';
                    break;
                case 'whiteCellNo': //备注更改
                    transValue = '白细胞总数(WBC)';
                    break;
                case 'eosPercent': //备注更改
                    transValue = '嗜酸性粒细胞(EOS)比例';
                    break;
                case 'eos': //备注更改
                    transValue = '嗜酸性粒细胞(EOS)';
                    break;
                case 'midCellPercent': //备注更改
                    transValue = '中性粒细胞比例(NEUT%)';
                    break;
                case 'bloodlge': //备注更改
                    transValue = '血清总IgE';
                    break;
                case 'fvcPercent': //备注更改
                    transValue = 'FVC(%pred)';
                    break;
                    case 'fev1OrFvc': //备注更改
                    transValue = 'FEV1/FVC';
                    break;
                    case 'pefPercent': //备注更改
                    transValue = 'PEF(%pred)';
                    break;
                    case 'mef25Percent': //备注更改
                    transValue = 'MEF25(%pred)';
                    break;
                    case 'mef50Percent': //备注更改
                    transValue = 'MEF50(%pred)';
                    break;
                    case 'mef75Percent': //备注更改
                    transValue = 'MEF75(%pred)';
                    break;
                    case 'dlcosb': //备注更改
                    transValue = 'DLCOSB(%pred)';
                    break;
                    case 'feno': //备注更改
                    transValue = '呼出气一氧化氮(FeNO)';
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
            //获取过敏源强度字典
            let promis = [];
            let transValue;
            if(subject=='diseaseStage'){
                conmmonService.getDiseaseLevelStatusList().then((res) => {
                    if(res.status == 200){
                      return res.data;
                    }
                });
            }
                if(!valueArea){return false;}
                switch(subject){
                    case 'age': //年龄
                        transValue = valueArea + '岁';
                        break;
                    case 'sex': //性别
                        transValue = (valueArea == 'M' ? '男' : valueArea == 'F' ? '女' : '未知');
                        break;
                    case 'visitDate': //就诊日期
                        transValue = moment(valueArea).format('YYYY-MM-DD');
                        break;
                    case 'fev1': //FEV1
                        transValue = valueArea + 'L';
                        break;
                    // case 'fev1Percent': //FEV1(%pred)
                    //     transValue = valueArea + '%';
                    //     break;  
                    case 'smokeyears': //FEV1(%pred)
                        transValue = valueArea + '年';
                        break;
                    case 'besmokeyears': //FEV1(%pred)
                        transValue = valueArea + '年';
                        break;
                    case 'whiteCellNo': //FEV1(%pred)
                        transValue = valueArea + ' 10^9/L';
                        break;
                    case 'eos': //FEV1(%pred)
                        transValue = valueArea + ' 10^9/L';
                        break;
                    case 'bloodlge': //FEV1(%pred)
                        transValue = valueArea + 'IU/ml';
                        break;
                    case 'feno': //FEV1(%pred)
                        transValue = valueArea + 'ppb';
                        break;
                    default:
                        //do somthing 
                        transValue = valueArea;
                }
                let valueAreaTypeList=['fev1Percent','bloodoxydegree','eosPercent','midCellPercent','fvcPercent','fev1OrFvc','pefPercent','mef25Percent','mef50Percent','mef75Percent','dlcosb'];
              
                angular.forEach(valueAreaTypeList,function(a){
                    if(a==subject){
                        transValue = valueArea + '%';
                    }
                })
                return transValue;
        };

        //delete filter item
        $scope.deleteFilter = (index) => {
            let searchmedicalRecordCondition = sessionStorageObj.getItem('searchmedicalRecordCondition');
            let relQueryObj = JSON.parse(searchmedicalRecordCondition);
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
            sessionStorageObj.setItem('searchmedicalRecordCondition',JSON.stringify(relQueryObj));
            sessionStorageObj.setItem('medicalRecordSearchAccount','2');
            // 查询数据
            relQueryObj.obj.save = false;
            if(relQueryObj.obj.filterConditions && relQueryObj.obj.filterConditions.length > 0){
                $scope.init(1,10,relQueryObj.obj);
            }else{
                $scope.seach();
            }
            
        };

        //clear filter
        $scope.clearFilter = () => {
            $scope.screenList = [];
            $scope.seachObj='';
            $scope.objs.hisObj = null;
            sessionStorageObj.removeItem('searchmedicalRecordCondition');
            sessionStorageObj.setItem('medicalRecordSearchAccount','1');
            // console.log('清除记录')
            $scope.seach();

        };

        //edite filter
        $scope.editFilter = () => {
            let obj = {
                screenData: $scope.screenList,
                save: $scope.filterObj.save,
                filterName: $scope.filterObj.filterName
            }
            // console.log(obj)
            $scope.$broadcast('edite', obj);
        };


        //高级搜索历史记录列表
        $scope.relSearchHisList = (doctorId,filterType) => {
            medicalService.getRelHistoryList(doctorId,filterType).then(rps => {
                if(rps.status == 200){
                    $scope.relSearchHisLists = rps.data;
                }else{
                    toastr.error(rps.errorMessage,null,1500);
                }
            });
        };
        $scope.relSearchHisList($scope.user.employeeId,2);
        //选中历史记录，搜索
        $scope.selectHisList = (evt,obj) => {
            let targetEle = evt.target;
            if(targetEle.className == 'delete-icon'){ //删除查询条件记录
                medicalService.deleteRelHistoryList($scope.user.employeeId,obj.name).then(rps => {
                    if(rps.status == 200){
                        toastr.success('删除成功！',null,1000);
                        $scope.objs.hisObj = null;
                        $scope.relSearchHisList($scope.user.employeeId,2);
                    }else{
                        toastr.error(rps.errorMessage,null,1500);
                    }
                });
            }else{ //直接按照历史记录查询或者修改查询条件
                // 查询筛选条件详情
                medicalService.getRelHistroyListDetails(2,$scope.user.employeeId,obj.name).then(rps => {
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
        if(medicalRecordSearchAccount){
            if(medicalRecordSearchAccount == '1'){ //普通搜索
                $scope.seach();
            }else if(medicalRecordSearchAccount == '2'){ //高级搜索
                let relQueryObj = JSON.parse(searchmedicalRecordCondition);
                // console.log(relQueryObj.obj)
                $scope.searchFn(relQueryObj.obj);
                $scope.screenList = relQueryObj.screenList;
            }
        }else{ //默认搜索
            $scope.init($scope.pageConfig.pageIndex,$scope.pageConfig.pageSize);
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
        // 分页函数-----------------------------------------------
        
        // 新增病历
        $scope.$watch('$stateParams.createRecord',(newValue,oldValue) => {
            if(newValue){
                // console.log($medicalData)
                let $medicalData = angular.copy(newValue);
                // let $info = $stateParams.info ? angular.copy($stateParams.info) : null;
                // $cookies.putObject('newCreateMedicalRecord',{info:$info,medicalData:$medicalData});
                //判断是否是顶部添加的病历
                $scope.$emit('addTab', {
                    title: $medicalData.baseInfo ? $medicalData.baseInfo.patientName : $medicalData.name,
                    createdate:$medicalData.baseInfo ? $medicalData.baseInfo.createDate : ($medicalData.createDate || ''),
                    sex: $medicalData.baseInfo ? $medicalData.baseInfo.sex : $medicalData.sex,
                    data:$medicalData || $medicalData,
                    close: true,
                    route: 'dryad.medicalhistory.details',
                    params: {
                        pid:$medicalData.medicalPatientId || $medicalData.patientId,
                        rid:$medicalData.medicalRecordId || 0
                    },
                    from:'head'
                });

                //向cookies添加一个新建病历中的标识
                $cookies.put('createAccount',$medicalData.medicalRecordId);
            }
        });
    };

}
MedicalHistorySearchCtrl.$inject = ['$rootScope','$scope', '$uibModal', '$state','$stateParams','$timeout','medicalService','conmmonService','toastr','$cookies','_','$q'];




module.exports = (ngMold) => {
	 require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('medicalHistorySearchCtrl', MedicalHistorySearchCtrl);
}