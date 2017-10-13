//元素隐藏显示
let ElementShowHide = ($timeout) => {
    return {
        restrict: 'A',
        link: (scope, ele, attr) => {
            let element = $(ele);
            let elementNext = element.next();
            element.bind('click', () => {
                if (elementNext.hasClass('show')) {
                    elementNext.removeClass('show').hide();
                } else {
                    elementNext.addClass('show').show();
                }
            });
            $(window).on('click', (evt) => {
                let targets = evt.target;
                if ((targets.className !== $(element)[0].className) && element.find(targets).length == 0) {
                    if (elementNext.hasClass('show')) {
                        elementNext.removeClass('show').hide();
                    }
                }
            });
        }
    }
}
ElementShowHide.$inject = ['$timeout'];


//导航栏选中
let MenuHrefActive = ($timeout) => {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var activeMatchObj = JSON.parse(attrs['menuHrefActive']), //节点对象
                activeMatch = activeMatchObj.uiRouter, //节点路由匹配规则
                activeCls = '',
                scope = $scope;

            if (activeMatchObj.level === 1) { //一级导航
                activeCls = 'parent-active';
            } else if (activeMatchObj.level === 2) { //二级导航
                activeCls = 'node-child-active';
            } else if (activeMatchObj.level === 3) { //三级导航
                activeCls = 'child-active';
            }

            if (activeMatch) {
                update(activeMatch);
                scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    update(activeMatch);
                });
            }

            function addClass() {
                $timeout(function() {
                    var $element = $(element);
                    !$element.hasClass(activeCls) && $element.addClass(activeCls);
                }, 0, false);
            }

            function removeClass() {
                $timeout(function() {
                    var $element = $(element);
                    $element.hasClass(activeCls) && $element.removeClass(activeCls);
                }, 0, false);
            }

            function update(_activeMatch) {
                var isActive = scope.$state.includes(_activeMatch);
                if (isActive) {
                    addClass();
                } else {
                    removeClass();
                }
            }

        }
    }
};
MenuHrefActive.$inject = ['$timeout'];















module.exports = (ngMold) => {
    ngMold.directive('elementShowHide', ElementShowHide);
    ngMold.directive('menuHrefActive', MenuHrefActive);
}