require('../../../../images/user-icon.png');
let TabUi = ($timeout, $cookies, $state) => {
    return {
        restrict: 'ECMA',
        scope: {
            tabList: '=',
            tabActive: '='
        },
        transclude: true,
        replace: true,
        template: require('../../common/html/tab-ui.html'),
        controller: ['$scope', 'APP_CONFIG', ($scope, APP_CONFIG) => {
            $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
        }],
        controllerAs: 'tab',
        link: (scope, ele, attr) => {
            let eleDom = $(ele);
            //控制是否显示Tab标题
            scope.tabTitle = attr.hasOwnProperty('tabTitle') ? true : false;

            //鼠标滑过事件注册
            let timeout = () => {
                setTimeout(() => {
                    let liDom = $('.dryad-tab-list').children('li');
                    scope.mouseenterEvt = (evt, index) => {
                        if ($(liDom[index]).children('.close-tab')) {
                            $(liDom[index]).children('.close-tab').show();
                        }
                    };
                    scope.mouseleaveEvt = (evt, index) => {
                        if ($(liDom[index]).children('.close-tab')) {
                            $(liDom[index]).children('.close-tab').hide();
                        }
                    };
                });
            };
            timeout();

            //删除tab事件
            scope.closeEvt = (index, item) => {
                scope.tabs = $cookies.get('tabs') ? JSON.parse($cookies.get('tabs')) : [];
                scope.tabList.splice(index, 1);
                if (scope.tabs.length > 0) {
                    angular.forEach(scope.tabs, (i, k) => {
                        if (i.params.id == item.params.id) {
                            scope.tabs.splice(k, 1);
                        }
                    });
                    $cookies.putObject('tabs', (scope.tabs || []));
                    //scope.tabList = scope.tabList.concat(scope.tabs);
                }
                scope.tabActive = 0;
            };

            //tab选中
            scope.selectTab = (index, item) => {
                scope.tabActive = index;
            };

            // 监听tab列表变化
            scope.$watch('tabList', (newValue, oldValue) => {
                scope.tabList = newValue;
                timeout();
            }, true);

            // 监听tab选中状态变化
            scope.$watch('tabActive', (newValue, oldValue) => {
                angular.forEach(scope.tabList, (item) => {
                    item.active = false;
                }, true);
                scope.tabList[scope.tabActive]['active'] = true;
                $state.go(scope.tabList[scope.tabActive].route, scope.tabList[scope.tabActive].params);
            });

        }
    }
}
TabUi.$inject = ['$timeout', '$cookies', '$state'];

module.exports = (ngMold) => {
    ngMold.directive('tabUi', TabUi);
}