/*import '../../../config/umeditor.config.js'*/
/*import { UM } from 'umeditor'*!/*/
let EditText = ($timeout) => {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        template: '<div id="editor"></div>',
        link: function(scope, elem, attrs) {
            $timeout(function() {
              //let um =  UM.getEditor('editor')
            });
        }
    }
}
EditText.$inject = ['$timeout'];

module.exports = (ngMold) => {
    ngMold.directive('editText', EditText);
}