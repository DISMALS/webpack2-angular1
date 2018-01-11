// import '../../../../node_modules/umeditor/dist/umeditor';
// import '../../../../node_modules/umeditor/dist/dialogs/formula/formula';
// import '../../../../node_modules/umeditor/dist/lang/zh-cn/zh-cn.js';
// import '../../../../node_modules/umeditor/dist/themes/default/css/umeditor.min.css';

/*
import { UM } from 'umeditor'
*/
let UmeditorDirective = ($timeout) => {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            getInnerHTML: '@',
            getHtml:'=',
            innerHTML:'=innerHtml',
            cover: '@',
            source: '@',
        },
        template: '<div>' +
        '<script type="text/plain" id="myEditor"></script>' +
        '</div>',

        link: function(scope, elem, attrs) {
            $timeout( () =>{
                var um = UM.getEditor('myEditor',{
                    toolbars: [
                    'fullscreen', 'source', '|',
                    'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'strikethrough', 'removeformat', '|',
                    'forecolor', 'backcolor', '|',
                    'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
                    'paragraph', 'fontfamily', 'fontsize', '|',
                    'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                    'link', '|',
                    'simpleupload', 'emotion', 'insertvideo', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'
                ]
                ,initialFrameWidth:999 //初始化编辑器宽度,默认500
                ,autoHeight:true //高度自适应
                ,allowDivTransToP: false//组织div标签自动转化未P
                // ,initialFrameHeight:300  //初始化编辑器高度,默认500
                });
                $(".edui-body-container").css("width", "98%");
                $(".edui-body-container img").css("width", "400px");
                if(scope.innerHTML){
                    um.ready(function() {
                        UM.getEditor('myEditor').setContent(scope.innerHTML); //初始化写入html
                        });
                }
            }, 1200)
            //监听checkbox变化
            scope.$on('goUmeditor',(evt,obj) => {
                if(obj.type){
                    scope.innerHTML=UM.getEditor('myEditor').getContent(); //获取文本标签内容
                    scope.$emit('giveHTML',{html:scope.innerHTML,type:obj.type})
                }
            },true);
        }
    }
}
UmeditorDirective.$inject = ['$timeout'];

module.exports = (ngMold) => {
    ngMold.directive('umeditorDirective', UmeditorDirective);
}