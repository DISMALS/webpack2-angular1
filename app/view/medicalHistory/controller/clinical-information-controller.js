class ClinicalInformationCtrl {
    constructor($scope, $stateParams,$location,$anchorScroll, medicalService,toastr,$cookies,$uibModal,$rootScope,$state,conmmonService) {
        console.log('this is clinical information for medical history!');
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        // console.log(self.activeTab)
        // console.log($stateParams)
        self.goNextTab=false;
       
        //锚点，切换tab
        self.navs = [
            {name:"一般情况",id:"general-condition"},
            {name:"哮喘症状",id:"asthma-symptoms"},
            {name:"既往病史",id:"medical-history"},
            {name:"控制情况",id:"control-situation"}
        ]
		$scope.controlOneList={0:'已控制',1:'部分控制',2:'部分控制',3:'未控制',4:'未控制'}
        self.scrollTo=function (m,i) {
            self.activeIndex = i
            $('.slide-bar').animate({left:i*85+20+'px'},200)
            document.getElementById(m).scrollIntoView()
        }
         self.initInfo =  {
            "generalCondition": {
                "br": "",
                "hr": "",
                "bp": "",
                "bp2": "",
                "SpO2":""
            },
            "asthmaSymptoms": {
                "status":null,
                "symptoms": [
                    {
                        "type": "a",
                        "name": "喘息",
                        "state": 0,
                        "isMain": 0
                    },
                    {
                        "type": "b",
                        "name": "气急",
                        "state": 0,
                        "isMain": 0
                    },
                    {
                        "type": "c",
                        "name": "胸闷",
                        "state": 0,
                        "isMain": 0
                    }
                    ,
                    {
                        "type": "d",
                        "name": "咳嗽",
                        "state": 0,
                        "isMain": 0,
                         "details": {
                            "times": {
                                "type":1,
                                "list":[
                                    {"name":"1-10次"},
                                    {"name":"10-30次"},
                                    {"name":"30次以上"}
                                ]
                            },
                            "color":{
                                "type":1,
                                "list":[
                                    {"name":"黄"},
                                    {"name": "黄白"},
                                    {"name": "白"},
                                    {"name": "其他"}
                                ]
                            },
                            "character": {
                                "type":1,
                                "list":[
                                    {"name":"粘"},
                                    {"name":"稀"}
                                ]
                            },
                            "coughtype":{
                         		"type":1,
                                "list":[
                                    {"name":"干咳"},
                                    {"name":"有痰"}
                                ]
                         	}
                        }
                    }
                ],
                "routineTime": {
                    "type":null,
                    "list":[
                        {"name":"日间"},
                        {"name":"夜间"},
                        {"name":"清晨"},
                        {"name":"不确定"}
                    ]
                },
                "morbidityDays": '',
                "morbidityDaysUnit": '天',
                "morbidityFactors":{
                    "values":[],
                    "list":[
                        {"id":1,"name":"感冒"},
                        {"id":2,"name":"刺激性气体"},
                        {"id":3,"name":"花粉、宠物或其它变应原刺激"},
                        {"id":4,"name":"运动"},
                        {"id":5,"name":"冷空气"},
                        {"id":6,"name":"大气污染加重"},
                        {"id":7,"name":"月经"},
                        {"id":8,"name":"不清楚"}
                    ]
                }
            },
            "medicalHistory": {
                "firstTime": "",
                "timesTypes": ["1次","2次","3次及以上","常年"],
                "acuteCondition": [
                    {
                        "type": "a",
                        "name": "住院史",
                        "state": null,
                        "times": 1
                    },
                    {
                        "type": "b",
                        "name": "门急诊就诊",
                        "state": null,
                        "times": 1
                    },
                    {
                        "type": "c",
                        "name": "全身激素口服或静脉使用",
                        "state": null,
                        "times": 1
                    }
                ],
                "comorbidity":{
                    "timesTypes":["常年","季节性","偶尔"],
                    "diseaseTypes":[
                        {"id":1,"name":"鼻窦炎"},
                        {"id":2,"name":"鼻息肉"},
                        {"id":3,"name":"睡眠呼吸暂停综合症(OSAHS)"},
                        {"id":4,"name":"胃食管反流(GRED)"},
                        {"id":5,"name":"肺结核"},
                        {"id":6,"name":"高血压"},
                        {"id":7,"name":"冠心病"},
                        {"id":8,"name":"脑血管病"},
                        {"id":9,"name":"糖尿病"},
                        {"id":10,"name":"支气管扩张"},
                        {"id":11,"name":"抑郁症"},
                        {"id":12,"name":"焦虑症"},
                        {"id":13,"name":"COPD"},
                        {"id":14,"name":"骨质疏松"},
                        {"id":999,"name":"其它",'value':''}
                    ],
                    "fruitTypes":[
                        {"id":1,"name":"河海鲜"},
                        {"id":2,"name":"蔬果"},
                        {"id":3,"name":"奶制品"},
                        {"id":4,"name":"豆制品"},
                        {"id":5,"name":"肉制品"},
                        {"id":6,"name":"坚果类"},
                        {"id":7,"name":"禽食"},
                        {"id":8,"name":"酒精"},
                        {"id":999,"name":"其它",'value':''}
                    ],
                    "data": [
                        {
                            "type": "a",
                            "name": "慢性阻塞性肺疾病（COPD）",
                            "state": null,
                            "firstTime": ""
                        },
                        {
                            "type": "b",
                            "name": "过敏性鼻炎",
                            "state": null,
                            "times": 0
                        },
                        {
                            "type": "c",
                            "name": "湿疹（皮肤过敏）",
                            "state": null,
                            "times": 1
                        },
                        {
                            "type": "d",
                            "name": "食物过敏",
                            "state": null,
                            "values":[],
                            "others":""
                        },
                        {
                            "type": "e",
                            "name": "其它疾病史",
                            "state": null,
                            "values":[],
                            "others":""
                        }
                    ]
                },
                "familyHistory": [
                    {
                        "type": "a",
                        "name": "哮喘家族史",
                        "state": null
                    },
                    {
                        "type": "b",
                        "name": "湿疹（皮肤过敏家族史）",
                        "state": null
                    },
                    {
                        "type": "c",
                        "name": "过敏性鼻炎家族史",
                        "state": null
                    }
                ],
                "smokeHistory":{
                    "state":null,
                    "options":[
                        {
                            "type":1,
                            "name":"不吸烟"
                        },
                        {
                            "type":2,
                            "name":"吸烟",
                             "number":0,
                             "years":0
                        },
                        {
                            "type":3,
                            "name":"曾经吸烟",
                            "number":0,
                            "nosmokeyears":0,
                            "smokeyears":0
                        },
                        {
                            "type":4,
                            "name":"被动吸烟",
                            "number":0,
                            "years":0
                        }
                    ]
                },
                "workHistory":{
                    "status":null,
                    "list":[
                        {
                            "type":"a",
                            "name":"吸入或接触过敏史",
                            "state":0,
                            "form":"",
                            "years":0
                        },
                        {
                            "type":"b",
                            "name":"职业性接触有害气体",
                            "state":0,
                            "form":"",
                            "years":0
                        },
                        {
                            "type":"c",
                            "name":"职业性接触粉尘",
                            "state":0,
                            "form":"",
                            "years":0
                        },
                        {
                            "type":"d",
                            "name":"经常暴露于生物燃料烟雾",
                            "state":0,
                            "form":"",
                            "years":0
                        },
                        {
                            "type":"e",
                            "name":"药物过敏史",
                            "state":0,
                            "form":""
                        }
                    ]
                }
            },
            "controlSituation":{
                "gina":{
                    "level":'',
                    "list":[
                        {
                            "type":"a",
                            "name":"日间哮喘症状>2次/周",
                            "state":null
                        },
                        {
                            "type":"b",
                            "name":"夜间因哮喘憋醒",
                            "state":null
                        },
                        {
                            "type":"c",
                            "name":"使用缓解药物次数>2次/周",
                            "state":null
                        },
                        {
                            "type":"d",
                            "name":"哮喘引起的活动受限",
                            "state":null
                        }
                    ]
                },
                "act":{
                    "score":'',
                    "level":'',

                    "list":[
                        {
                            "type":"a",
                            "name":"在过去的4周内，在工作、学习或家中，有多少时候哮喘妨碍您进行日常活动？",
                            "state":null,
                            "options":[
                                {
                                    "value":1,
                                    "name":"所有时间"
                                },
                                {
                                    "value":2,
                                    "name":"大多数时间"
                                },
                                {
                                    "value":3,
                                    "name":"有些时候"
                                },
                                {
                                    "value":4,
                                    "name":"很少时候"
                                },
                                {
                                    "value":5,
                                    "name":"没有"
                                }
                            ]
                        },
                        {
                            "type":"b",
                            "name":"在过去的4周内，您有多少次呼吸困难？",
                            "state":null,
                            "options":[
                                {
                                    "value":1,
                                    "name":"每天不止一次"
                                },
                                {
                                    "value":2,
                                    "name":"每天一次"
                                },
                                {
                                    "value":3,
                                    "name":"每周３－６次"
                                },
                                {
                                    "value":4,
                                    "name":"每周１－２次"
                                },
                                {
                                    "value":5,
                                    "name":"完全没有"
                                }
                            ]
                        },
                        {
                            "type":"c",
                            "name":"在过去4周内，因为哮喘症状（喘息、咳嗽、呼吸困难），您有多少次在夜间醒来或早上比平时早醒？",
                            "state":null,
                            "options":[
                                {
                                    "value":1,
                                    "name":"每周四晚或更多"
                                },
                                {
                                    "value":2,
                                    "name":"每周２－３晚"
                                },
                                {
                                    "value":3,
                                    "name":"每周３－６次"
                                },
                                {
                                    "value":4,
                                    "name":"每周１－２次"
                                },
                                {
                                    "value":5,
                                    "name":"完全没有"
                                }
                            ]
                        },
                        {
                            "type":"d",
                            "name":"在过去4周内，您有多少次使用急救药物治疗（如沙丁胺醇）？",
                            "state":null,
                            "options":[
                                {
                                    "value":1,
                                    "name":"每天三次以上"
                                },
                                {
                                    "value":2,
                                    "name":"每天１－２次"
                                },
                                {
                                    "value":3,
                                    "name":"每周２－３次"
                                },
                                {
                                    "value":4,
                                    "name":"每周１次或更少"
                                },
                                {
                                    "value":5,
                                    "name":"没有"
                                }
                            ]
                        },
                        {
                            "type":"e",
                            "name":"您如何评价过去4周内，您的哮喘控制情况？",
                            "state":null,
                            "options":[
                                {
                                    "value":1,
                                    "name":"没有控制"
                                },
                                {
                                    "value":2,
                                    "name":"控制很差"
                                },
                                {
                                    "value":3,
                                    "name":"有所控制"
                                },
                                {
                                    "value":4,
                                    "name":"控制很好"
                                },
                                {
                                    "value":5,
                                    "name":"完全控制"
                                }
                            ]
                        }
                    ]
                }
            }
        }
        //本次发病因素
        self.selected = [];
        self.selectedTags = [];

        //食物过敏
        self.selectedFoods = []
        self.selectedFoodsName = []
        //其他疾病史
        self.selectedCaseHistory = []
        self.selectedCaseHistoryName = [];
        //初始化数据
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
		 self.info=function(){
            conmmonService.getCourseOfTreatmentList().then((res)=>{
                self.morbidityDaysUnitList=res.data;
            })
        	medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid, self.activeTab.params.rid,'clinicinfo').then(function (res) {
             if(res.status==200){
                // console.log(self.initInfo.asthmaSymptoms.morbidityDaysUnit)
             	if(res.data.clinicInfo!=null){
                     self.initInfo=res.data.clinicInfo;
                     self.initInfoCopy=angular.copy(self.initInfo)
             	}
             }else{
             	toastr.error(res.errorMessage);
             }
            })
        }
        self.initInfoCopy=angular.copy(self.initInfo)
        self.info();
        //路由相关变化
        var numbers=0;
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
            // console.log('切换路由')
            // console.log(JSON.parse($cookies.get('historytabs')))
            if(fromState.name=='dryad.medicalhistory.details.clinical-information'){
                numbers++;
                if(numbers==1){
                    _.each($scope.tabData,function(a,i){
                        if(a.route==toState.name){
                            self.initInfoCopy2=angular.copy(self.initInfo);
                            if(self.initInfoCopy2.medicalHistory.firstTime){
                                self.initInfoCopy2.medicalHistory.firstTime= moment(self.initInfoCopy2.medicalHistory.firstTime).format('YYYY-MM-DD')
                            }
                            // console.log(self.initInfoCopy2)
                            // console.log(self.self.initInfoCopy)
                           if(!(JSON.stringify(self.initInfoCopy2)==JSON.stringify(self.initInfoCopy))){
                                // console.log(self.goNextTab)
                                if(self.goNextTab==false){
                                event.preventDefault(); 
                                //删除确认弹窗
                                 $scope.deleteModal('当前信息还未保存，是否保存？',i)
                                 
                               }
                            } 
                           
                        }
                    })
                   
                }
               
            }
        });
       //删除确认弹窗
       $scope.deleteModal = (patinet,index) => {
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
                        patinet:patinet || null,
                        content: patinet
                    };
                },
                deleteModalCtrl: ($q, $ocLazyLoad) => {
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
           if(result=='noSave'){
            $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
           }else if(result=='cancle'){
            $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
            $('.clinical-info-content table tr:eq(1) td:eq(1) input').focus()
            $scope.tabData.active=1;
            numbers=0;
           }else if(result=='save'){
            self.saveData(true,index);
           }
        });
    };
   
    // console.log($('.clinical-info-content table tr:eq(1) td:eq(2) input'))
        //实际操作数组的方法
        var updateSelected = function (action, id, name,numarr,namearr) {
            if (action == 'add' && numarr.indexOf(id) == -1) {
                numarr.push(id);
                namearr.push(name);
            }
            if (action == 'remove' && numarr.indexOf(id) != -1) {
                var idx = numarr.indexOf(id);
                numarr.splice(idx, 1);
                namearr.splice(idx, 1);
            }
        };

        //根据传入的动作和要操作的id更新Array
        self.updateSelection = function ($event, id, numarr, namearr) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id, checkbox.name, numarr, namearr);
        };

        //返回true false
       self.isSelected = function (id,numarr) {
            return numarr.indexOf(id) >= 0;
        };
		//更新过去四周控制水平
		self.changeOneType=function(){
			let level=0;
			angular.forEach(self.initInfo.controlSituation.gina.list,function(a,i){
				if(a.state==1){
					level++;
				}
				if(a.state!=null){
					$scope.ginaindex = -1;
				}
			})
			self.initInfo.controlSituation.gina.level=$scope.controlOneList[level];
		}
		//取消哮喘症状提示框
		self.changebordertip=function(){
			$scope.asthmabtn = false;
		}
		//更新ACT测试量表测试水平
		self.changeTwoType=function(){
			let Score=0;
			angular.forEach(self.initInfo.controlSituation.act.list,function(a,i){
				if(a.state!=null){
					Score+=a.options[a.state].value;
					$scope.actindex = -1;
				}
			})
 			self.initInfo.controlSituation.act.score=Score;
 			if(Score<20){
 				self.initInfo.controlSituation.act.level='未控制'
 			}else if(Score<25){
 				self.initInfo.controlSituation.act.level='部分控制'
 			}else{
 				self.initInfo.controlSituation.act.level='已控制'
 			}
		}
        self.saveData = function (flag,index) {
            if(self.initInfo.asthmaSymptoms.status==null){
            		$scope.asthmabtn = true;
                toastr.warning('请填写哮喘症状');
                if(self.activeIndex!=1){
                    self.scrollTo('asthma-symptoms',1);
                }
                if(flag){
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.clinical-info-content table tr:eq(1) td:eq(1) input').focus()
                    $scope.tabData.active=1;
                    numbers=0;
                }
                return false;
            }
            let isControlSituationGinaTrue=true;
            let ginabtn = -1;
            _.each(self.initInfo.controlSituation.gina.list,function(a){
            	 	ginabtn++;
                if(a.state==null){
                		$scope.ginaindex = ginabtn;
                    toastr.warning('请填完整的哮喘控制情况');
                    isControlSituationGinaTrue=false;
                    if(self.activeIndex!=3){
                        self.scrollTo('control-situation',3);
                    }
                    if(flag){
                        $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                        $('.clinical-info-content table tr:eq(1) td:eq(1) input').focus()
                        $scope.tabData.active=1;
                        numbers=0;
                    }
                    return false;
                }
            })
            if(!isControlSituationGinaTrue){
                return false;
            }

            let isControlSituationActTrue=true;
            let actbtn = -1;
            _.each(self.initInfo.controlSituation.act.list,function(a){
            		$scope.ginaindex = -1;
            		actbtn++;
                if(a.state==null){
                		$scope.actindex = actbtn;
                    toastr.warning('请填完整的哮喘控制情况');
                    isControlSituationActTrue=false;
                    if(self.activeIndex!=3){
                        self.scrollTo('control-situation',3);
                    }
                    if(flag){
                        $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                        $('.clinical-info-content table tr:eq(1) td:eq(1) input').focus()
                        $scope.tabData.active=1;
                        numbers=0;
                    }
                    return false;
                }
            })
            if(!isControlSituationActTrue){
                return false;
            }
            var dataList={}
            dataList.medicalRecordId=$stateParams.rid;
            if(self.initInfo.medicalHistory.firstTime){
                self.initInfo.medicalHistory.firstTime= moment(self.initInfo.medicalHistory.firstTime).format('YYYY-MM-DD')
            }
            dataList.medicalRecordInfo=self.initInfo;
            medicalService.savePatientMedicalRecordDetailPart('ClinicInfo',dataList).then(function(data){
            	if(data.status==200){
                    self.goNextTab=true;
            			toastr.success('保存成功');
            			$scope.ginaindex = -1;
            			$scope.actindex = -1;
                    self.$emit('index',{index:2,rid:data.data});
                    if(flag){
                        $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
                     }
            	}else{
            		toastr.error(data.errorMessage);
            	}
            })
        }
        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='kang123']").popover({
            trigger:'hover',
            html:true
        });
    }
}
ClinicalInformationCtrl.$inject = ['$scope', '$stateParams','$location','$anchorScroll', 'medicalService','toastr','$cookies','$uibModal','$rootScope','$state','conmmonService'];

module.exports = (ngMold) => {
    require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('clinicalInformationCtrl', ClinicalInformationCtrl);
}