//日期组件(选择年月日)
// import { controller } from './../../../../build/js/vendor';
require('eonasdan-bootstrap-datetimepicker');
let DryadDateTimePicker = ($timeout, $cookies,toastr,_) => {
    return {
        restrict: 'EA',
        scope:{
            options:'=',
            dateData:'=',
            dateFormat:'=',
            maxDataTrue:'=',
            valueChangeFn:'='
        },
        template:`
            <div>
                <input class="date-input" id="datetimepicker" datetimepicker options="optionObj" ng-change="datechange()" data-ng-model="dateData" placeholder="____-__-__"/>
                <i class="date-icon date-time"></i>
            </div>
        `,
        // controller:['scope',function(scope){
            
        // }],
        link: function(scope, element, attrs) {
            scope.dateFormat_ = scope.dateFormat || "YYYY-MM-DD";
            scope.optionObj = scope.options || {
                locale: 'zh-cn',
                format: scope.dateFormat_,
                dayViewHeaderFormat:"YYYY-MM",
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                 },
                 allowInputToggle:true
            };
            var $element = $(element);
            $element.find('i.date-time').on('click', function() {
                let this_ = this;
                $($(this_).prev()[0]).focus();
            });
            scope.datechange = () => {
                if(_.isFunction(scope.valueChangeFn)){
                    scope.valueChangeFn(scope.dateData);
                }else{
                    scope.changeFn = (e,d) => {
                        let chooiseTime = new Date(scope.dateData).getTime();
                        let nowTime = new Date().getTime();
                        if(!scope.maxDataTrue){
                            if(chooiseTime > nowTime){
                                toastr.warning('选择的时间不能大于当前时间！');
                                scope.dateData = moment(new Date()).format('YYYY-MM-DD');
                                return false;
                            }
                        }
                        scope.$emit('updateDate',{date:moment(scope.dateData).format('YYYY-MM-DD')});
                    };
                    scope.changeFn();
                }
            };
        }
    }
};
DryadDateTimePicker.$inject = ['$timeout', '$cookies','toastr','_'];
module.exports = (ngMold) => {
    ngMold.directive('dryadDateTimePicker', DryadDateTimePicker);
};