//增减预约时间长度
let IncreaseOrDecreaseTime = ($timeout) => {
    return {
        restrict: "ECMA",
        scope: {
            timeInterval:'='
        },
        transclude: true,
        replace: true,
        template: require('../html/increase-decrease-time.html'),
        require: '^ngModel',
        link: (scope, ele, attr,parent) => {
            scope.value = parent.$modelValue || 15;
            scope.unit = '分钟';
            $timeout(() => {
                if(parseInt(scope.value) <= parseInt(scope.timeInterval)){
                    $('.decrease_btn').css('cursor','not-allowed');
                }else{
                    $('.decrease_btn').css('cursor','pointer');
                }
            },0,false);
            scope.increaseValue = (flag,e) =>{
                if(flag){ //加
                    scope.value += parseInt(scope.timeInterval);
                }else{ //减
                    if(parseInt(scope.value) == parseInt(scope.timeInterval)){
                        return false;
                    }
                    scope.value -= parseInt(scope.timeInterval);
                }
            }

            scope.$watch('value',(newValue,oldValue) => {
                if(newValue && (newValue != oldValue)){
                    if(parseInt(scope.value) <= parseInt(scope.timeInterval)){
                        $('.decrease_btn').css('cursor','not-allowed');
                    }else{
                        $('.decrease_btn').css('cursor','pointer');
                    }
                }
            })
        }
    };
};
IncreaseOrDecreaseTime.$inject = ['$timeout'];

module.exports = (ngMold) => {
    ngMold.directive('increaseOrDecreaseTime', IncreaseOrDecreaseTime);
}