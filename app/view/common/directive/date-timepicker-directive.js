//日期组件(选择年月日)
// class DryadDateTimePicker {
//     constructor($timeout, $cookies) {

//     }
// }
require('eonasdan-bootstrap-datetimepicker');
let DryadDateTimePicker = ($timeout, $cookies) => {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            //默认配置
            var DEFAULTOPTIONS = {
                locale: 'zh-cn',
                format: 'YYYY-MM-DD',
                dayViewHeaderFormat: 'YYYY MMMM'
            };
            $timeout(function() {
                var $element = $(element);
                if ($element.length > 0) {
                    var newOpts = attrs['dryadDateTimePicker'] || {};

                    try {
                        newOpts = JSON.parse(newOpts);
                    } catch (e) {
                        newOpts = {};
                    }
                    var opts = angular.extend({}, DEFAULTOPTIONS, newOpts);
                    $($element.prev()[0]).on('dp.change', function(e) {
                        $scope.date = e.target.value;
                    }).datetimepicker(opts);
                    $element.on('click', function() {
                        $($element.prev()[0]).focus();
                    });
                }
            }, 0, false);
        }
    }
};
DryadDateTimePicker.$inject = ['$timeout', '$cookies'];
module.exports = (ngMold) => {
    ngMold.directive('dryadDateTimePicker', DryadDateTimePicker);
};