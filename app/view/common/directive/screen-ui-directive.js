let DryadScreenUi = ($timeout,toastr,conmmonService,$cookies) => {
    return {
        restrict: "ECMA",
        scope: {
            // screenData: '=',
            searchFn: '=',
            typeData:'=',
            cleanFlag:'='
        },
        transclude: true,
        replace: true,
        template: require('../../common/html/screen-ui.html'),
        controller: ['$scope','toastr','conmmonService', ($scope,toastr,conmmonService) => {
            //初始化下拉列表数据
            $scope.informationList = {
                sexList:[], //性别
                querySubject:[], //查询主题
                conditionList:[],//查询条件
                interval:[], //区间
                logicalRelationship:[//逻辑关系
                    {
                        logicalName:'并且',
                        logicalCode:'AND'
                    }
                ], //逻辑关系
                valueArea:[]
            };
            $scope.filterTyps = $scope.typeData; //1患者，2病历
            let initFn = () => {
                // console.log(123)
                //查询主题
                conmmonService.querySubjectList($scope.filterTyps).then(rps => {
                    if(rps.status == 200){
                        // console.log(rps.data)
                        $scope.informationList.querySubject = rps.data;
                        $scope.informationList.querySubjectCopy=angular.copy($scope.informationList.querySubject);
                    }
                });
            };
            if($scope.filterTyps){initFn();}
            
            $scope.screenData = [{
                values: [], //查询域值
                endValue: null, //结束值
                beginValue: null, //开始值
                filterCondition:null, // 查询条件
                filterItem: null, //查询主题
                logicRelation: 'AND', //逻辑关系
                account:2
            }];
            $("[data-toggle='tooltip']").tooltip();
        }],
        controllerAs: 'screenVm',
        link: ($scope, ele, attr) => {
            let sessionStorageObj = window.sessionStorage; //使用sessionStorage存储数据，仅在当前会话有用
            let screenmain = $(ele);
//          let screening = $(ele).prev('a');
            let screening = $('a.screening');
            let iIcon = $(screening).find('i.ico');
            let iNeedle = $(screening).find('i.dialog-needle');
            $scope.save = false;
            $scope.obssj = {};
            $scope.obssj.filterNames = '';
            //首拼查询
            $scope.serchQuerySubject=function(value){
                var reg = /([\u4e00-\u9fa5]+)/g; //匹配中文
                if (value == '' || value == null) {
                    $scope.informationList.querySubject = $scope.informationList.querySubjectCopy;
                } else {
                    $scope.informationList.querySubject = [];
                    if (reg.test(value)) { //中文
                        $scope.informationList.querySubjectCopy.forEach(function(item) {
                            if (item.filterItem.indexOf(value) > -1) {
                                $scope.informationList.querySubject.push(item);
                            }
                        });
                    } else { //字母、数字、特殊字符
                        value = value.toUpperCase();
                        // console.log(value)
                        for (var i = 0, len = $scope.informationList.querySubjectCopy.length; i < len; i++) {
                            $scope.informationList.querySubjectCopy[i].filterItemPy=$scope.informationList.querySubjectCopy[i].filterItemPy.toUpperCase();
                            if ($scope.informationList.querySubjectCopy[i].filterItemPy.indexOf(value) > -1) {
                                $scope.informationList.querySubject.push($scope.informationList.querySubjectCopy[i]);
                            }
                        }
                        // console.log(self.address.province)
                    }
                } 
            }
            //根据查询主题显示查询条件
            $scope.queryConditionList = (selected,index) => {
                // 获取查询条件
                conmmonService.queryConditionList($scope.filterTyps,selected.filterItemEn).then(rps => {
                    if(rps.status == 200){
                        // $scope.informationList.conditionList = rps.data;
                        $scope.screenData[index].filterCondition = null;
                        $scope.screenData[index].beginValue = null;
                        $scope.screenData[index].endValue = null;
                        $scope.screenData[index].account = 2;
                        $scope.screenData[index].conditionList = rps.data;
                    }
                });
            }
            
            //根据查询条件显示查询域值的输入框类型
            /*
             *** 查询域值输入框显示数量以及类型
             ***$scope.account,默认值为2
             ***下拉框1、单文本输入框2、双文本输入框3、单日期控件4、双日期控件5
             ***
             ***
            */
            // $scope.account = 2;
            $scope.queryValueArea = (selected,index) => {
                $scope.screenData[index].beginValue = null;
                $scope.screenData[index].endValue = null;
                let subjectValue = $scope.screenData[index].filterItem; //查询主题
                let typeList=['age','fev1','fev1Percent','bmi','bloodoxydegree','smokeyears','besmokeyears','whiteCellNo','eosPercent','eos','midCellPercent','bloodlge','fvcPercent','fev1OrFvc','pefPercent','mef25Percent','mef50Percent','mef75Percent','dlcosb','feno']
                angular.forEach(typeList,(a)=>{
                    if(a==subjectValue){
                        // console.log(1234)
                        if(selected.filterConditionSymbol == 'ltgt'){ //介于
                            $scope.screenData[index].account = 3;
    
                        }else{
                            $scope.screenData[index].account = 2;
                        }
                    }
                })
                // console.log(subjectValue)
                 switch(subjectValue){
                    case 'sex': // 性别
                    case 'cpa': // 用药
                    case 'diseaseStage': // 疾病分期
                    case 'sod': // 疾病严重程度
                    case 'sodsub': // 病情严重程度
                    case 'allergens': // 过敏原
                    case 'cs': // 控制程度
                    case 'occupation': // 职业
                    case 'dryadStatus': // 哮喘症状
                    case 'mostTimeOccr': // 症状高发时间
                    case 'thisTimeCause': // 本次发病因素
                    case 'suddenOccrStatus': // 急性发作情况
                    case 'comp': // 合并症
                    case 'familyhis': // 合并症
                    case 'smokehis': // 吸烟史
                    case 'occupORlifeHis': // 吸烟史
                        $scope.screenData[index].account = 1;
                        if(subjectValue == 'sex'){
                            //获取性别字典
                            conmmonService.getSexList().then((rps) => {
                                // console.log(rps);
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                }
                            });
                        }else if(subjectValue == 'cpa'){
                            //获取药品列表
                            conmmonService.getDrugDictList().then((rps) => {
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                    // console.log($scope.screenData[index].valueArea);
                                }
                            });
                        }else if(subjectValue == 'diseaseStage'){
                            //获取疾病分期
                            conmmonService.getDiseaseStageList().then((rps) => {
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                }
                            });
                        }else if(subjectValue == 'sod'){
                            //获取疾病严重程度
                            conmmonService.getDiseaseLevelStatusList().then((rps) => {
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                }
                            });
                        }else if(subjectValue == 'sodsub'){
                            //获取病情严重程度
                            conmmonService.getIllnessStageList().then((rps) => {
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                }
                            });
                        }else if(subjectValue == 'allergens'){
                            // console.log('过敏源')
                            //获取过敏原
                            conmmonService.getSkinSourceList().then((rps) => {
                                // console.log(rps);
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                }
                            });
                        }else if(subjectValue == 'cs'){
                            //控制水平
                                 $scope.screenData[index].valueArea = [{dictItemValue:0,dictItemName:'未控制'},{dictItemValue:1,dictItemName:'部分控制'},{dictItemValue:2,dictItemName:'已控制'}];
                        }else if(subjectValue == 'occupation'){
                            //职业
                            // console.log('职业')
                            conmmonService.getOccupationList().then((rps) => {
                                // console.log(rps)
                                // console.log(rps);
                                if(rps.status == 200){
                                    $scope.screenData[index].valueArea = rps.data;
                                }
                            });
                        }else if(subjectValue == 'dryadStatus'){
                            //哮喘症状
                                $scope.screenData[index].valueArea =[
                                    {"dictItemValue": "a","dictItemName": "喘息"},
                                    {"dictItemValue": "b","dictItemName": "气急"},
                                    {"dictItemValue": "c","dictItemName": "胸闷"},
                                    {"dictItemValue": "d","dictItemName": "咳嗽"}
                                ];
                         }else if(subjectValue == 'mostTimeOccr'){
                            //症状高发时间
                                $scope.screenData[index].valueArea =[
                                    {dictItemValue:0,"dictItemName":"日间"},
                                    {dictItemValue:1,"dictItemName":"夜间"},
                                    {dictItemValue:2,"dictItemName":"清晨"},
                                    {dictItemValue:3,"dictItemName":"不确定"}
                                ]
                         }else if(subjectValue == 'thisTimeCause'){
                            //本次发病因素
                                $scope.screenData[index].valueArea =[
                                    {"dictItemValue":1,"dictItemName":"感冒"},
                                    {"dictItemValue":2,"dictItemName":"刺激性气体"},
                                    {"dictItemValue":3,"dictItemName":"花粉、宠物或其它变应原刺激"},
                                    {"dictItemValue":4,"dictItemName":"运动"},
                                    {"dictItemValue":5,"dictItemName":"冷空气"},
                                    {"dictItemValue":6,"dictItemName":"大气污染加重"},
                                    {"dictItemValue":7,"dictItemName":"月经"},
                                    {"dictItemValue":8,"dictItemName":"不清楚"}
                                ]
                         }else if(subjectValue == 'suddenOccrStatus'){
                            //急性发作情况
                                $scope.screenData[index].valueArea =[
                                    {"dictItemValue": "a", "dictItemName": "住院史" },
                                    {"dictItemValue": "b","dictItemName": "门急诊就诊"},
                                    {"dictItemValue": "c", "dictItemName": "全身激素口服或静脉使用"}
                                ]
                         }else if(subjectValue == 'comp'){
                            //合并症
                                $scope.screenData[index].valueArea = [
                                    { "dictItemValue": "a", "dictItemName": "慢性阻塞性肺疾病（COPD）"},
                                    { "dictItemValue": "b", "dictItemName": "过敏性鼻炎"},
                                    {"dictItemValue": "c","dictItemName": "湿疹（皮肤过敏）"},
                                    {"dictItemValue": "d","dictItemName": "食物过敏"},
                                    {"dictItemValue": "e","dictItemName": "其它疾病史"}]
                         }else if(subjectValue == 'familyhis'){
                            //家族史
                                $scope.screenData[index].valueArea =[
                                    {"dictItemValue": "a","dictItemName": "哮喘家族史"},
                                    {"dictItemValue": "b","dictItemName": "湿疹（皮肤过敏家族史）"},
                                    {"dictItemValue": "c", "dictItemName": "过敏性鼻炎家族史"}
                                ]
                         }else if(subjectValue == 'smokehis'){
                            //吸烟史
                                $scope.screenData[index].valueArea =[
                                    {"dictItemValue":1,"dictItemName":"不吸烟"},
                                    {"dictItemValue":2,"dictItemName":"吸烟"},
                                    {"dictItemValue":3, "dictItemName":"曾经吸烟"},
                                    {"dictItemValue":4,"dictItemName":"被动吸烟"}
                                ]
                         }else if(subjectValue == 'occupORlifeHis'){
                            //职业/生活史
                                $scope.screenData[index].valueArea =[
                                    {"dictItemValue":"a","dictItemName":"吸入或接触过敏史"},
                                    { "dictItemValue":"b","dictItemName":"职业性接触有害气体"},
                                    {"dictItemValue":"c","dictItemName":"职业性接触粉尘"},
                                    {"dictItemValue":"d","dictItemName":"经常暴露于生物燃料烟雾"},
                                    {"dictItemValue":"e","dictItemName":"药物过敏史"}
                                ]
                         }
                         
                        // }
                        break;
                    case 'visitDate': //就诊日期
                        if(selected.filterConditionSymbol == 'ltgt'){
                            $scope.screenData[index].account = 5;
                        }else{
                            $scope.screenData[index].account = 4;
                        }
                        break;
                    case 'firstTimeOccrDate': //首次发病时间
                        if(selected.filterConditionSymbol == 'ltgt'){
                            $scope.screenData[index].account = 5;
                        }else{
                            $scope.screenData[index].account = 4;
                        }
                        break;
                    default:
                        // $scope.screenData[index].account = 2;
                        // toastr.warning('没有匹配到查询主题！',null,1500);
                 }
                 
            }
            //screen box show and hide
            let showHide = () => {
                if (screenmain.hasClass('show')) {
                    $(iNeedle).removeClass('show').hide(500);
                    screenmain.removeClass('show').hide(500);
                    $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                } else {
                    if($scope.filterTyps){
                        conmmonService.querySubjectList($scope.filterTyps).then(rps => {
                            if(rps.status == 200){
                                $scope.informationList.querySubject = rps.data;
                                $scope.informationList.querySubjectCopy=angular.copy($scope.informationList.querySubject);
                            }
                        });
                    }
                    if ($scope.screenData.length == 0) {
                        $scope.screenData.push({
                            values: [], //查询域值
                            endValue: null, //结束值
                            beginValue: null, //开始值
                            filterCondition:null, // 查询条件
                            filterItem: null, //查询主题
                            logicRelation: 'AND', //逻辑关系
                            account:2
                        });
                    }
                    $(iIcon).removeClass('full-selectdown').addClass('full-selectup');
                    $(iNeedle).addClass('show').show(500);
                    screenmain.addClass('show').show(500);
                }
            };

            $(screening).bind('click', () => {
                showHide();
            });

            //check int value
            $scope.checkIntValue = (index,preperty) => {
                let elem = $scope.screenData[index];
                if(elem.filterItem == 'fev1' || elem.filterItem == 'fev1Percent'|| elem.filterItem == 'bmi'){
                    let reg = /^\d+\.?\d*$/g;
                    if(!reg.test(elem.beginValue)){
                        $scope.screenData[index][preperty] = null;
                        toastr.warning('输入的数值格式不正确！',null,3000);
                    }
                }else{
                    let reg = /^\d*$/ig;
                    if(!reg.test($scope.screenData[index][preperty])){
                        $scope.screenData[index][preperty] = null;
                        toastr.warning('输入的数值格式不正确！',null,3000);
                    }
                }
            };

            //add row
            $scope.addRow = (index) => {
                let rowData = {
                    values: [], //查询域值
                    endValue: null, //结束值
                    beginValue: null, //开始值
                    filterCondition:null, // 查询条件
                    filterItem: null, //查询主题
                    logicRelation: 'AND', //逻辑关系
                    account:2
                };
                $scope.screenData.splice(index + 1, 0, rowData);
            };

            //delete row 
            $scope.deleteRow = (index) => {
                $scope.screenData.splice(index, 1);
            };

            //close screen
            $scope.closeScreen = () => {
                $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                $(iNeedle).removeClass('show').hide(500);
                screenmain.removeClass('show').hide(500);
            };

            //search screen
            $scope.searchScreen = () => {
                $scope.user = JSON.parse($cookies.get('user'));
                let erro = 0;
                let formatValue = 0;
                let numberErro=0;
                if ($scope.save && !$scope.obssj.filterNames) {
                    return toastr.error('请输入查询模板名称!', null, 2000);
                }
                // 验证搜索框是否全部填写
                $scope.screenData.forEach((element,i) => {
                    if(!element.filterCondition){
                        erro += 1;
                    }
                    if(element.account == 1 || element.account == 2 || element.account == 4){ //单域值
                        if(!element.beginValue &&element.beginValue!=0){
                            erro += 1;
                        }
                    }else if(element.account == 3 || element.account == 5){ //双域值
                        if(!(element.beginValue && element.endValue)){
                            erro += 1;
                        }
                    }
                });
                if(erro > 0){
                    return toastr.warning('搜索条件不完整！',null,2000);
                }
                let regObjAge = /^\d*$/ig;
                let resobj    = /^\d+\.?\d*$/g;
                // 判断输入内容是否正确
                $scope.screenData.forEach((element,i) => {
                    if(element.account == 2){ //单域值
                        if(element.filterItem=='age'){
                            if(!(/^\d*$/ig).test(element.beginValue)){
                                numberErro += 1;
                            }
                        }else{
                            if((!(/^\d+\.?\d*$/g).test(element.beginValue))){
                                numberErro += 1;
                            }
                        }
                    }else if(element.account == 3){ //双域值
                        if(element.filterItem=='age'){
                            if(!(/^\d*$/ig).test(element.beginValue)){
                                numberErro += 1;
                            };
                            if(!(/^\d*$/ig).test(element.endValue)){
                                numberErro += 1;
                            };
                        }else{
                            if(!(/^\d+\.?\d*$/g).test(element.beginValue)){
                                numberErro += 1;
                            };
                            if(!(/^\d+\.?\d*$/g).test(element.endValue)){
                                numberErro += 1;
                            };
                        }
                    }
                });
                if(numberErro > 0){
                    return toastr.warning('搜索条件输入格式错误！',null,2000);
                }
                // 删除高级查询条件里的多余数据
                $scope.copyScreenData = angular.copy($scope.screenData);
                $scope.copyScreenData.forEach((element,i) => {
                    if(i == 0){
                        element.logicRelation = null;
                    }
                    // if(element.account == 4){
                    //     element.beginValue = moment(element.beginValue).format('YYYY-MM-DD');
                    // }else if(element.account == 5){
                    //     element.beginValue = moment(element.beginValue).format('YYYY-MM-DD');
                    //     element.endValue = moment(element.endValue).format('YYYY-MM-DD');
                    // }
                    delete element.account;
                    // if(element.valueArea){delete element.valueArea;}
                    // if(element.conditionList){delete element.conditionList;}
                });
                let obj = {
                    filterType: '',
                    save: $scope.save,
                    filterName: $scope.obssj.filterNames,
                    doctorId:$scope.user.employeeId,
                    filterConditions: angular.copy($scope.copyScreenData),
                    existFlg:$scope.existFlg || ''
                }
//              $(iNeedle).removeClass('show').hide(500);
//              screenmain.removeClass('show').hide(500);
//              $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
                $scope.searchFn(obj);
                // $scope.$on('samename',(evt,obj) => {
                //     if(obj.flag){return false;}
                // });
            };

            $scope.$watch('cleanFlag',(newValue,oldValue) => {
                if($scope.cleanFlag){
                    $scope.resetScreen(); //清空筛选条件
                    $scope.save = false;
                    $scope.obssj.filterNames = null;
                }
            });

            //reset screen
            $scope.resetScreen = () => {
                $scope.screenData = [];
                let obj = {
                    values: [], //查询域值
                    endValue: null, //结束值
                    beginValue: null, //开始值
                    filterCondition:null, // 查询条件
                    filterItem: null, //查询主题
                    logicRelation: null, //逻辑关系
                    account:2
                };
                $scope.screenData.push(obj);
            };

            //reception data
            $scope.$on('edite', (evt, obj) => {
                angular.forEach(obj.screenData,(element,i) => {
                    // 获取查询条件列表
                    conmmonService.queryConditionList($scope.filterTyps,element.filterItem).then(rps => {
                        if(rps.status == 200){
                            obj.screenData[i].conditionList = rps.data;
                        }
                    });
                    // console.log(element)
                    if(element.filterItem == 'age' || element.filterItem == 'fev1' || element.filterItem == 'fev1Percent' ||element.filterItem == 'bmi'
                    ||element.filterItem == 'bloodoxydegree'||element.filterItem == 'smokeyears'||element.filterItem == 'besmokeyears'||element.filterItem == 'whiteCellNo'
                    ||element.filterItem == 'eosPercent' ||element.filterItem == 'eos'||element.filterItem == 'midCellPercent'||element.filterItem == 'bloodlge'||element.filterItem == 'fvcPercent'
                    ||element.filterItem == 'fev1OrFvc' ||element.filterItem == 'pefPercent'||element.filterItem == 'mef25Percent'||element.filterItem == 'mef50Percent'||element.filterItem == 'mef75Percent'||element.filterItem == 'dlcosb'||element.filterItem == 'feno'){ //年龄、FEV1、FEV1（pred）bmi 血氧饱和度
                        // console.log(element)
                        if(element.filterCondition == 'ltgt'){ //介于 
                            element.account = 3;
                        }else{
                            element.account = 2;
                        }
                    }else if(element.filterItem == 'sex'){ //性别
                        element.account = 1;
                        //获取性别字典
                        conmmonService.getSexList().then((rps) => {
                            // console.log(rps);
                            if(rps.status == 200){
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'cpa'){ //用药
                        element.account = 1;
                        //获取药品列表
                        conmmonService.getDrugDictList().then((rps) => {
                            if(rps.status == 200){
                                obj.screenData[i].beginValue=parseInt(obj.screenData[i].beginValue);
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'diseaseStage'){ //疾病分期
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        //获取疾病严重程度
                        conmmonService.getDiseaseStageList().then((rps) => {
                            if(rps.status == 200){
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'sod'){ //疾病严重程度
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        //获取疾病严重程度
                        conmmonService.getDiseaseLevelStatusList().then((rps) => {
                            if(rps.status == 200){
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'sodsub'){ //病情严重程度
                        element.beginValue=parseInt(element.beginValue);
                        element.account = 1;
                        //获取病情严重程度
                        conmmonService.getIllnessStageList().then((rps) => {
                            if(rps.status == 200){
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'allergens'){ //过敏原
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        //获取过敏原
                        conmmonService.getSkinSourceList().then((rps) => {
                            if(rps.status == 200){
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'visitDate'){
                        if(element.filterCondition == 'ltgt'){
                            element.account= 5;
                        }else{
                            element.account = 4;
                        }
                    }else if(element.filterItem == 'cs'){ //控制情况
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        obj.screenData[i].valueArea= [{dictItemValue:0,dictItemName:'未控制'},{dictItemValue:1,dictItemName:'部分控制'},{dictItemValue:2,dictItemName:'已控制'}];
                    }else if(element.filterItem == 'occupation'){ //职业
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        //获取职业
                        conmmonService.getOccupationList().then((rps) => {
                            if(rps.status == 200){
                                obj.screenData[i].valueArea = rps.data;
                            }
                        });
                    }else if(element.filterItem == 'dryadStatus'){ //哮喘症状
                        element.account = 1;
                        obj.screenData[i].valueArea=[
                            {"dictItemValue": "a","dictItemName": "喘息"},
                            {"dictItemValue": "b","dictItemName": "气急"},
                            {"dictItemValue": "c","dictItemName": "胸闷"},
                            {"dictItemValue": "d","dictItemName": "咳嗽"}
                        ];
                    }else if(element.filterItem == 'mostTimeOccr'){ //症状高发时间
                        // console.log(element)
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        obj.screenData[i].valueArea=  [
                            {dictItemValue:0,"dictItemName":"日间"},
                            {dictItemValue:1,"dictItemName":"夜间"},
                            {dictItemValue:2,"dictItemName":"清晨"},
                            {dictItemValue:3,"dictItemName":"不确定"}
                        ];
                    }else if(element.filterItem == 'thisTimeCause'){ //本次发病因素
                        // console.log(element)
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        obj.screenData[i].valueArea= [
                            {"dictItemValue":1,"dictItemName":"感冒"},
                            {"dictItemValue":2,"dictItemName":"刺激性气体"},
                            {"dictItemValue":3,"dictItemName":"花粉、宠物或其它变应原刺激"},
                            {"dictItemValue":4,"dictItemName":"运动"},
                            {"dictItemValue":5,"dictItemName":"冷空气"},
                            {"dictItemValue":6,"dictItemName":"大气污染加重"},
                            {"dictItemValue":7,"dictItemName":"月经"},
                            {"dictItemValue":8,"dictItemName":"不清楚"}
                        ]
                    }else if(element.filterItem == 'firstTimeOccrDate'){ //首次发病时间
                        if(element.filterCondition == 'ltgt'){
                            element.account= 5;
                        }else{
                            element.account = 4;
                        }
                    }else if(element.filterItem == 'suddenOccrStatus'){ //急性发作情况
                        element.account = 1;
                        obj.screenData[i].valueArea= [
                            {"dictItemValue": "a", "dictItemName": "住院史" },
                            {"dictItemValue": "b","dictItemName": "门急诊就诊"},
                            {"dictItemValue": "c", "dictItemName": "全身激素口服或静脉使用"}
                        ]
                    }else if(element.filterItem == 'comp'){ //合并症
                        element.account = 1;
                        obj.screenData[i].valueArea=[
                            { "dictItemValue": "a", "dictItemName": "慢性阻塞性肺疾病（COPD）"},
                            { "dictItemValue": "b", "dictItemName": "过敏性鼻炎"},
                            {"dictItemValue": "c","dictItemName": "湿疹（皮肤过敏）"},
                            {"dictItemValue": "d","dictItemName": "食物过敏"},
                            {"dictItemValue": "e","dictItemName": "其它疾病史"}]
                    }else if(element.filterItem == 'familyhis'){ //家族史
                        element.account = 1;
                        obj.screenData[i].valueArea=[
                            {"dictItemValue": "a","dictItemName": "哮喘家族史"},
                            {"dictItemValue": "b","dictItemName": "湿疹（皮肤过敏家族史）"},
                            {"dictItemValue": "c", "dictItemName": "过敏性鼻炎家族史"}
                        ]
                    }else if(element.filterItem == 'smokehis'){ //吸烟史
                        element.account = 1;
                        element.beginValue=parseInt(element.beginValue);
                        obj.screenData[i].valueArea= [
                            {"dictItemValue":1,"dictItemName":"不吸烟"},
                            {"dictItemValue":2,"dictItemName":"吸烟"},
                            {"dictItemValue":3, "dictItemName":"曾经吸烟"},
                            {"dictItemValue":4,"dictItemName":"被动吸烟"}
                        ]
                    }else if(element.filterItem == 'occupORlifeHis'){ //职业/生活史
                        element.account = 1;
                        obj.screenData[i].valueArea=[
                            {"dictItemValue":"a","dictItemName":"吸入或接触过敏史"},
                            { "dictItemValue":"b","dictItemName":"职业性接触有害气体"},
                            {"dictItemValue":"c","dictItemName":"职业性接触粉尘"},
                            {"dictItemValue":"d","dictItemName":"经常暴露于生物燃料烟雾"},
                            {"dictItemValue":"e","dictItemName":"药物过敏史"}
                        ]
                    }
                });
                $scope.screenData = obj.screenData;
                $scope.save = obj.save;
                $scope.obssj.filterNames = obj.filterName;
                $scope.existFlg = obj.existFlg || '';
                showHide();
                // console.log($scope.screenData )
            });
            //点击空白处关闭弹窗
            // $(window).on('click', (evt) => {
            //     let targets = evt.target;
            //     if ((targets.className !== screenmain[0].className) && (screenmain.find(targets).length == 0) && targets.className != 'screening' && targets.className != 'full-selectdown') {
            //         if (screenmain.hasClass('show')) {
            //             $(iNeedle).removeClass('show').hide(500);
            //             screenmain.removeClass('show').hide();
            //             $(iIcon).removeClass('full-selectup').addClass('full-selectdown');
            //         }
            //     }
            // });
        }
    };
};
DryadScreenUi.$inject = ['$timeout','toastr','conmmonService','$cookies'];

module.exports = (ngMold) => {
    ngMold.directive('dryadScreenUi', DryadScreenUi);
}