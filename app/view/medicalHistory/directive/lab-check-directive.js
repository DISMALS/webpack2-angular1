//肺部检查
let DryadLabCheckUi = ($timeout,conmmonService, toastr) => {
    return {
        restrict: "ECMA",
        scope: {
            lungCheckList:'='
        },
        transclude: true,
        replace: true,
        template: require('../html/lab-lung-check.html'),
        controller:['$scope',($scope) => {
            // console.log($scope);
        }],
        link: (scope, ele, attr) => {
            $timeout(() => {
                $("[data-toggle='tooltip']").tooltip();
            },0,false);
            scope.changData=function(item){
                item.percent=(item.amount*100/item.estimate).toFixed(0) != 'NaN' && (item.amount*100/item.estimate).toFixed(0)!='Infinity' ? (item.amount*100/item.estimate).toFixed(2)  : ''
            }
        }
    };
};
DryadLabCheckUi.$inject = ['$timeout','$state', 'toastr'];

//过敏记录
let DryadAllergicRecord = ($timeout,$state,toastr, conmmonService) => {
    return {
        restrict: "ECMA",
        scope: {
            allergicRecordList:'='
        },
        transclude: true,
        replace: true,
        template: require('../html/allergic-record-list.html'),
        controller:['$scope',($scope) => {
            //判断输入框是否填写完整
            $scope.checkBtn = (item) => {
                let num = 0;
                for(let k in item){
                    if(item[k]){
                        num += 1;
                    }
                }
                return num;
            };
        }],
        link: (scope, ele, attr) => {
            conmmonService.getSkinResultLevelList().then( (data) => {
                scope.natureSelect = data.data;
            })
            conmmonService.getSkinSourceList().then( (data) => {
                scope.allergyList = data.data;
            })
            //删除行
            scope.deleteRow = (item,index) => {
                scope.allergicRecordList.splice(index,1);
            }
            //添加行
            scope.addRow = (index) => {
                let flage =true;
                _.each(scope.allergicRecordList, ( item ) => {
                    if ( !item.value ||!item.intensity) {
                        flage = false;
                    }
                })
                if ( !flage ) {
                    return toastr.warning('请先填写过敏原或者结果分级！',null, 1500);
                }
                let newTr = {
                    name:'',
                    intensity:'',
                };
                scope.allergicRecordList.splice(index+1,0,newTr);
                
            };
        }
    };
};
DryadAllergicRecord.$inject = ['$timeout','$state','toastr', 'conmmonService'];

//ige值
let DryadIgeValue = ($timeout,$state,toastr, conmmonService) => {
    return {
        restrict: "ECMA",
        scope: {
            igeList:'='
        },
        transclude: true,
        replace: true,
        template: require('../html/allergic-ige-list.html'),
        controller:['$scope',($scope) => {
        }],
        link: (scope, ele, attr) => {
            $timeout( () => {
                conmmonService.getSkinSourceList().then( (data) => {
                    scope.allergyList = data.data;
                })
                //删除行
                scope.deleteRow = (item,index) => {
                    scope.igeList.splice(index,1);
                }
                //添加行
                scope.addRow = (index) => {
                    let flage = true;
                    _.each(scope.igeList, ( item ) => {
                        if ( !item.value ||!item.amount) {
                            flage = false;
                        }
                    })
                    if ( !flage ) {
                     return toastr.warning('请先填写过敏原或者特异性lge值！',null, 1500);
                    }
                    let newTr = {
                        name:'',
                        intensity:''
                    };
                    scope.igeList.splice(index+1,0,newTr);
                };
                let reg = new RegExp("^\\d+(\\.\\d{1,3})?$");
                scope.changData=function(item){
                    if (!reg.test(item.amount)){
                        return item.level = '--'
                    }
                    if (item.amount < 0.35) {
                        return item.level = 0;
                    }
                    if (item.amount < 0.7) {
                        return item.level = 1;
                    }
                    if (item.amount < 3.5) {
                        return item.level = 2;
                    }
                    if (item.amount < 17.5) {
                        return item.level = 3;
                    }
                    if (item.amount < 50) {
                        return item.level = 4;
                    }
                    if (item.amount < 100) {
                        return item.level = 5;
                    }
                    item.level = 6;
                    console.log(item.level);

                }
            }, 3)
        }
    };
};
DryadIgeValue.$inject = ['$timeout','$state','toastr', 'conmmonService'];


module.exports = (ngMold) => {
    ngMold.directive('dryadLabCheckUi', DryadLabCheckUi);
    ngMold.directive('dryadAllergicRecord', DryadAllergicRecord);
    ngMold.directive('dryadIgeValue', DryadIgeValue);
}