class LaboratoryInspectionCtrl {
    constructor($scope, $stateParams, medicalService,$uibModal,ResourceService, toastr, $cookies,$rootScope,$state) {
        // console.log('this is medical history laboratory inspection!');
        const self = $scope;
        self.activeTab = self.$parent.activeTab;
        var isInit=false; //初始化数据标识
        var isChange=false; //变更数据标识
        //锚点，切换tab
        self.navs = [
            {name:"血常规检查",id:"bre"},
            {name:"血清总lgE检测",id:"lge"},
            {name:"肺功能检查",id:"pft"},
            {name:"变应原检测",id:"cap"},
            {name:"气道炎症检查",id:"ait"},
            {name:"影像学检查",id:"xre"},
            {name:"影像图片",id:"images-list"}
        ];

        self.medicalHistoryObj = {//实验室检查
            bre:{         //血常规检查
                checkTime:"",     //检查时间
                wbc:'',                     //白细胞总数
                eos:{                       //eos嗜酸性粒细胞
                    percent:'',               //比例
                    amount:''                  //数量
                },
                neut:''                     //中性粒细胞比例
            },
            lge:{                         //lge检测
                checkTime:'',         //检查时间
                ODAmount:'',          // OD值
                amount:'',             //浓度KIUl
                level:''             //级别
            },
            pft:{                             //肺功能检查
                checkTime:"",         //检查时间
                list:[                          //列表
                    
                    {
                        name:"FVC",
                        estimate:'',
                        amount:'',
                        percent:''
                    },
                    {
                        name:"FEV1",
                        estimate:'',                  //预测
                        amount:'',                  //实际
                        percent:''                 //比例
                    },
                    {
                        name:"FEV1/FVC",
                        estimate:'',
                        amount:'',
                        percent:''
                    },
                    {
                        name:"PEF",
                        amount:'',
                        estimate:'',
                        percent:''
                    },
                    {
                        name:"MEF25",
                        amount:'',
                        estimate:'',
                        percent:''
                    },
                    {
                        name:"MEF50",
                        estimate:'',
                        amount:'',
                        percent:''
                    },
                    {
                        name:"MEF75",
                        estimate:'',
                        amount:'',
                        percent:''
                    },
                    {
                        name:"DLCOSB",
                        estimate:'',
                        amount:'',
                        percent:''
                    }
                ],
                bdt:{           //支气管舒张试验
                    amount:'',    //数量
                    percent:'',   //比例
                    state:''       //阴性/阳性
                },
                bpt:{           //支气管舒张试验
                    type:'',        //激发试剂类型
                    result:{       //结果
                        state:'',      //阴性/阳性
                        concentration:'',   //激发浓度
                        dosage:'',          //吸入剂量
                        amount:'',          //数量
                        percent:''          //比例
                    }
                }
            },
            cap:{         //变应原检测
                ast:{       //过敏原皮试
                    checkTime:"",   //开始时间
                    result:{        //结果
                        state:'',      //阴性／阳性
                        source:[       //来源
                            {
                                value:'', //过敏源id
                                intensity:'',       //强度
                            }
                        ]
                    }
                },
                lge:{               //血清特异性IgE检测：
                    checkTime:'',   //时间
                    list:[
                        {
                            value:'', //过敏源id
                            amount:'' //lge值
                        }
                    ]
                }
            },
            ait:{               //气道炎症检查
                feno:{            //呼出气一氧化氮（FeNO）
                    checkTime:'', //时间
                    amount:''               //特异性lge
                },
                list:{
                    checkTime:'',      //时间
                    totalCount:'',             //总数
                    eos:'',                     //嗜酸性细胞比例
                    neut:'',                    //中性粒细胞比例
                    mp:'',                      //巨嗜细胞比例
                    lymr:''                     //淋巴细胞比例
                }
            },
            xre:{                         //影像学检查
                otherCheck:'',            //其它检查
                list:[
                    {
                        type:"a",
                        name:"胸部Ｘ线检查",
                        checkTime:'',     //检查时间
                        state:''                     //是否异常
                    },
                    {
                        type:"b",
                        name:"胸部CT检查",
                        checkTime:'',
                        state:''
                    },
                    {
                        type:"c",
                        name:"鼻窦CT线检查",
                        checkTime:'',
                        state:''
                    }
                ]
            },
            images:{                    //图片
                coun:'',                  //数量
                list:[]                
            }
        };
		self.imgObj={url:"",fileId:null, desc:""}

        //肺功能检查列表
        self.medicalHistoryObj=angular.copy(self.medicalHistoryObj);
        //初始化数据
        if(!(self.activeTab.params&&self.activeTab.params.pid&&self.activeTab.params.rid)){
            return false;
        }
        $scope.init=function(){
            medicalService.getPatientMedicalRecordDetailPart(self.activeTab.params.pid,self.activeTab.params.rid,'libcheck').then(function(data){
                if(data.status==200){
                    if(data.data&&data.data.labInspection){
                       self.medicalHistoryObj=data.data.labInspection;
                       console.log(self.medicalHistoryObj.pft.list[0].amount)
                       if(self.medicalHistoryObj.images.list.length){
                           _.each(self.medicalHistoryObj.images.list,function(a,i){
                                if(a.fileId){
                                    medicalService.getImageUrl(a.fileId).then((data)=>{
                                        a.url=data.data.filePath;
                                    })
                                }else{
                                    self.medicalHistoryObj.images.list.splice(i)
                                }
                           })
                       }
                       self.medicalHistoryObjCopy=angular.copy(self.medicalHistoryObj);
                       isInit=true
                    }else{ 
                        self.medicalHistoryObjCopy
                         isInit=true
                        }
                }else{
                    toastr.error(data.errorMessage);
                }
            })
        } 
        $scope.init();
        $("[data-toggle='wmTooltip']").popover({
            trigger:'hover',
            html:true
        });
        var isNumber=0;
        $scope.$watch('medicalHistoryObj',function(a,b){
            isNumber++;   
            if(JSON.stringify(a)==JSON.stringify(b) || JSON.stringify(a)==JSON.stringify(self.medicalHistoryObjCopy)){
                return false;
            }else if(isInit&&isNumber>(3+self.medicalHistoryObj.images.list.length+1)){
                isChange=true;
            }else{
                self.medicalHistoryObjCopy=angular.copy(a)
            }
        },true)
        //路由相关变化
        var numbers=0;
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
           if(fromState.name=='dryad.medicalhistory.details.laboratory-inspection'){
                numbers++; 
                if(numbers==1){
                    _.each($scope.tabData,function(a,i){
                        if(a.route==toState.name){   //找到路由切换
                           if(isChange){
                                event.preventDefault(); 
                                 $scope.deleteModal('当前信息还未保存，是否保存？',i)
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
            $('.medical-lab-main .tr-row:eq(1) .segment .segment-content .user-input').focus()
            $scope.tabData.active=2;
            numbers=0;
           }else if(result=='save'){
            self.saveData(true,index)
           }
        });
    };
    // console.log($('.medical-lab-main .tr-row:eq(1) .segment .segment-content .user-input'))
        self.saveData = (flag,index) => {
            if (self.medicalHistoryObj.cap.ast.result.state && !self.medicalHistoryObj.cap.ast.checkTime) {
                $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                $('.medical-lab-main .tr-row:eq(1) .segment .segment-content .user-input').focus()
                $scope.tabData.active=2;
                numbers=0;
              return  toastr.error('请填写过敏源皮试时间!', null, 1500);
            }
            if (self.medicalHistoryObj.cap.lge.list[0].value && !self.medicalHistoryObj.cap.lge.checkTime) {
                $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                $('.medical-lab-main .tr-row:eq(1) .segment .segment-content .user-input').focus()
                $scope.tabData.active=2;
                numbers=0;
              return  toastr.error('请填写过敏源皮试时间!', null, 1500);
            }
            if (self.medicalHistoryObj.cap.ast.result.state == 1) {
                let flage = true;
                _.each(self.medicalHistoryObj.cap.ast.result.source, (item) => {
                    if (!item.value || !item.intensity ) {
                        flage = false;
                        return
                    }
                })
                if (!flage) {
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.medical-lab-main .tr-row:eq(1) .segment .segment-content .user-input').focus()
                    $scope.tabData.active=2;
                    numbers=0;
                    return toastr.error('请填写过敏源皮试信息!', null, 1500);
                }
            }
            if (self.medicalHistoryObj.cap.lge.checkTime) {
                let flage = true;
                _.each(self.medicalHistoryObj.cap.lge.list, (item) => {
                    if (!item.value || !item.amount ) {
                        flage = false;
                        return
                    }
                })
                if (!flage) {
                    $('.ng-isolate-scope .tab-container ul li:eq('+index+')').removeClass("active");
                    $('.medical-lab-main .tr-row:eq(1) .segment .segment-content .user-input').focus()
                    $scope.tabData.active=2;
                    numbers=0;
                    return toastr.error('请填写血清特异性lgE信息!', null, 1500);
                }
            }
            
            let ossFileList=angular.copy(self.medicalHistoryObj.images.list)
            _.each(ossFileList,function(a,i){
                if(a.fileId==undefined){
                    ossFileList.splice(i,1)
                }
            })
            let obj = {
                medicalRecordId: $stateParams.rid,
                medicalRecordInfo: self.medicalHistoryObj,
                ossFile:ossFileList
            }
            $scope.$watch('medicalHistoryObj.bre.checkTime');
            // console.log($scope.medicalHistoryObj.bre.checkTime);
            medicalService.getSaveMedicalRecordLabInspection( obj ).then(function(data){
                if(data.status==200){
                    toastr.success('保存成功!')
                    isChange=false;
                    isNumber=0;
                    self.$emit('index',{index:3,item:self.baseInfo});
                    if(flag){
                        $state.go($scope.tabData[index]['route'], $scope.tabData[index]['params']);
                    }
                 }else{
                    toastr.error(data.errorMessage);
                }
            })

        }
        self.onDeleteImg = ( index ) => {
            self.medicalHistoryObj.images.list.splice(index, 1);
        }


        //查看图片详情
        self.viewPictureDetails = (picture) => {
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                template: require('../html/view-picture.html'),
                controller: 'viewPictureCtrl',
                controllerAs: 'viewPictureCtrlVm',
                size: 'width-65',
                resolve: {
                    items: function() {
                        return {
                            picture,
                            action: 'VIEW'
                        };
                    },
                    viewPictureCtrl: ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./view-picture-controller'], (require) => {
                            const ctrl = require('./view-picture-controller')(require('../../../common/module'));
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './medicalHistory/check-ctrl');
                        return deferred.promise;
                    }
                }
            }).result.then(function(result) {
            });
        };

        //上传图片
        $scope.pictureSrc = '';
        self.serviceFunc = (files) => {
            if(files.length){
                medicalService.SaveMedicalRecordLabInspectionFile(JSON.parse($cookies.get('user')).employeeId,$stateParams.pid,$stateParams.rid,files).then( (res) => {
                    if(res.status==200){
                        medicalService.getImageUrl(res.data).then((data)=>{
                            self.medicalHistoryObj.images.list.push({url:data.data.filePath,fileId:data.data.fileId,desc:''})
                        })
                    }else{
                        toastr.error(res.errorMessage);
                    }
                })
            }
        }
       
        self.dataObj = {
            checkDate:''
        };

        self.scrollTo=function (m,i) {
            self.activeIndex = i
            $('.slide-bar').animate({left:i*115+'px'},200)
            document.getElementById(m).scrollIntoView()
        };

        //pageConfig
        $scope.pageConfig = {
            pageIndex: 1,
            pageSize: 10,
            pageCount: 500
        };

        //to watch the pageindex,to load data
        $scope.$watch('pageConfig', (newValue, oldValue) => {
            if (newValue != oldValue) {
                // console.log($scope.pageConfig);
            }
        }, true);
        
        self.$watch('medicalHistoryObj.pft.list[0].amount',function(){
           if($scope.medicalHistoryObj.pft.list[0].amount&&$scope.medicalHistoryObj.pft.list[1].amount&&$scope.medicalHistoryObj.pft.list[0].amount!=''&&$scope.medicalHistoryObj.pft.list[1].amount!=''){
        	let fevfvc=(parseFloat($scope.medicalHistoryObj.pft.list[1].amount)*100/parseFloat($scope.medicalHistoryObj.pft.list[0].amount)).toFixed(2)
                $scope.medicalHistoryObj.pft.list[2].percent= fevfvc!=NaN&&fevfvc!=Infinity?fevfvc:'';
                if(isNaN($scope.medicalHistoryObj.pft.list[2].percent)){
                		$scope.medicalHistoryObj.pft.list[2].percent = '';
                }
        	}else{
                $scope.medicalHistoryObj.pft.list[2].percent = '';
        	}
        })
        
        self.$watch('medicalHistoryObj.pft.list[1].amount',function(a,b){
           if($scope.medicalHistoryObj.pft.list[0].amount&&$scope.medicalHistoryObj.pft.list[1].amount&&$scope.medicalHistoryObj.pft.list[0].amount!=''&&$scope.medicalHistoryObj.pft.list[1].amount!=''){
           	
        	let fevfvc=(parseFloat($scope.medicalHistoryObj.pft.list[1].amount)*100/parseFloat($scope.medicalHistoryObj.pft.list[0].amount)).toFixed(2)
                $scope.medicalHistoryObj.pft.list[2].percent= fevfvc!=NaN&&fevfvc!=Infinity?fevfvc:'--';
                if(isNaN($scope.medicalHistoryObj.pft.list[2].percent)){
                		$scope.medicalHistoryObj.pft.list[2].percent = '';
                }
        	}else{
                $scope.medicalHistoryObj.pft.list[2].percent = '';
        	}
        })
        $("[data-toggle='feno']").popover({
            trigger:'hover',
            html:true
        });
    }
}
LaboratoryInspectionCtrl.$inject = ['$scope', '$stateParams', 'medicalService',"$uibModal", 'ResourceService', 'toastr', '$cookies','$rootScope','$state'];

module.exports = (ngMold) => {
    require.ensure(['../../resource/service/resource-service'], (require) => {
        require('../../resource/service/resource-service')(ngMold);
    }, '../../resource/resource/resource-service');
    require.ensure(['../directive/lab-check-directive'],(require) => {
        require('../directive/lab-check-directive')(ngMold);
    },'./medicalHistory/lab-directive');
    require.ensure(['../service/medical-history-service'], (require) => {
        require('../service/medical-history-service')(ngMold);
    }, './medicalHistory/medical-history-service');
    ngMold.controller('laboratoryInspectionCtrl', LaboratoryInspectionCtrl);
}