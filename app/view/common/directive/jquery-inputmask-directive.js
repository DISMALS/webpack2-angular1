//手机号input输入框
require('../../../../node_modules/inputmask/dist/inputmask/jquery.inputmask.js');
let InputMask = ($timeout, $cookies,toastr) => {
	return {
		restrict: 'A',
		link:function($scope, element, attrs){
			var $element =$(element);
			$element.inputmask({mask: attrs.inputMask,greedy: false});
		}
	}
}

InputMask.$inject = ['$timeout', '$cookies','toastr'];
module.exports = (ngMold) => {
    ngMold.directive('inputMask', InputMask);
};