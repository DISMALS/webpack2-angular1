require('../node_modules/angular-ui-tree/dist/angular-ui-tree.min.css');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
// require('../node_modules/ui-select/dist/select.min.css');
require('../node_modules/angular-block-ui/dist/angular-block-ui.min.css');
require('../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');
require('../node_modules/jsgrid/dist/jsgrid-theme.css');
require('../node_modules/jsgrid/dist/jsgrid.min.css');
require('../node_modules/angular-timeline/dist/angular-timeline.css');


require('../less/ui.less');
const dryadApp = require('./common/module');

//集中加载路由文件以及公共服务
require('./common/routing.js')(dryadApp);
require('./common/service.js')(dryadApp);
require('./common/directive.js')(dryadApp);

dryadApp.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'blockUIConfig', 'treeConfig', 'toastrConfig', '$cookiesProvider',
    ($urlRouterProvider, $locationProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, blockUIConfig, treeConfig, toastrConfig, $cookiesProvider) => {
        dryadApp.controller = $controllerProvider.register;
        dryadApp.directive = $compileProvider.directive;
        dryadApp.filter = $filterProvider.register;
        dryadApp.factory = $provide.factory;
        dryadApp.service = $provide.service;
        dryadApp.constant = $provide.constant;

        // $ocLazyLoadProvider.config({
        //     loadedModules: ["oc.lazyLoad","ui.router"],//主模块名,和ng.bootstrap(document, ['monitorApp'])相同
        //     //jsLoader: requirejs, //使用requirejs去加载文件
        //     //files: ['modules/summary','modules/appEngine','modules/alarm','modules/database'], //主模块需要的资源，这里主要子模块的声明文件
        //     debug: true
        // });
        //设置cookies过期时间
        let date = new Date();
        $cookiesProvider.expires = date.setDate(date.getDate() + 1);


        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise("/authorize/login");

        // 允许跨域调用Web API
        $httpProvider.defaults.withCredentials = true;

        //注册依赖 请求拦截器
        $httpProvider.interceptors.push('interceptorService');

        //弹窗锁屏配置
        blockUIConfig.message = '请稍等，让数据飞一会儿...';

        //tree默认配置
        treeConfig.defaultCollapsed = true; //默认不展开 

        //操作信息提示框配置
        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            positionClass: 'toast-top-center',
            timeOut: 1500,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            extendedTimeOut: 1500,
            maxOpened: 0,
            target: 'body'
        });
    }
]);

dryadApp.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies', '$templateCache',
    ($rootScope, $state, $stateParams, $timeout, $cookies, $templateCache) => {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.user = {
            password: '123456',
            username: '15138991340', //15618385088
        };

        //禁用浏览器后退按钮
        $rootScope.$on('$locationChangeStart', function(event, from, to) {
            var st = angular.copy($state.current);
            var stateHref = $state.href(st.name, $stateParams);
            var isPageHistoryBack = st.url != '^' && -1 == from.indexOf(stateHref);
            if (isPageHistoryBack) {
                event.preventDefault();
            }
        });
        // $state.includes(stateOrName,params,options);
        //路由相关变化
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            console.log('变化开始！');
        });
        $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
            console.log('变化出错了！');
            $state.go('dryad.home');
        });
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            console.log('变化结束了！');
        });

        //导航模板缓存
        $templateCache.put('common/html/tree.html', `
        <div dryad-permission-check="node.permissions">
            <div ui-tree-handle class="tree-node" ng-click="toggles(this,node)" style="background:none;">
                <a data-ng-class="{'node-contents':node.iconfont,'node-child-contents':!node.iconfont}" menu-href-active={{node}}>
                    <b class="left-colorm"></b>
                    <i ng-if="node.iconfont" class="menu-icon" data-ng-class="node.iconfont" data-nodrag></i>
                    <span class="tree-title" data-ng-bind="node.title"></span>
                    <i class="unfurled-packup-menu" data-ng-if="node.child.length > 0" data-ng-class="{'unfurled-icon':!this.collapsed,'pack-up-icon':this.collapsed}"></i>
                </a>
                <!-- ng-click="(node.size == 0 ? editItem(node) : '')"-->
            </div>
            <ol ui-tree-nodes ng-model="node.child" ng-class="{hidden: this.collapsed}">
                <li ng-repeat="node in node.child" ui-tree-node ng-include="'common/html/tree.html'"></li>
            </ol>
        </div>`);
    }
]);

// 系统根控制器
class DryadCtrl {
    constructor($rootScope, $scope, $uiBlock, APP_CONFIG, $injector, blockUI) {
        var scope = $scope;
        var _http = _http || $injector.get('$http');

        // scope.ASSETS_URL = APP_CONFIG.ASSETS_URL;

        //响应成功时
        scope.$on('$responseSuccess', function(e, data) {
            var isMask = data['config'].isMask;
            //if (isMask) {
            if (_http.pendingRequests.length < 1) {
                blockUI.stop();
            }
        });
        //请求失败
        scope.$on('$requestError', function(e, data) {
            //console.log('$requestError', data);
            //var isMask = data['config'].isMask || false;
            var isMask = data['isMask'];
            // if (isMask) {
            if (_http.pendingRequests.length < 1) {
                blockUI.stop();
            }
        });

        //响应刚刚开始时,做处理 加一个加载中
        scope.$on('$requestStart', function(e, data) {
            var isMask = data['isMask'];
            var disableButton = data['disableButton'];
            if (isMask) {
                if (disableButton) {
                    blockUI.start("disableButton");
                } else {
                    blockUI.start();
                }
            }
        });

        // 相应失败
        scope.$on('$responseError', function(e, data) {
            try {
                var isMask = data.config['isMask'];
                // if (isMask) {
                if ((_http.pendingRequests.length < 1)) {
                    blockUI.stop();
                }
                //自动消息/自动消息
                var isAutoMsg = data.config['isAutoMsg'];
                // if (isAutoMsg) {
                //     var err = data.data;
                //     if (_.isObject(err)) {
                //         var message = err.message;
                //         if (message) {
                //             if (_.isArray(message)) {
                //                 _.each(message, function(msg) {
                //                     $uiNoty.error(msg, 3000);
                //                 });
                //             } else {
                //                 $uiNoty.error(message, 3000);
                //             }
                //         }

                //     }
                // }
            } catch (e) {
                blockUI.stop();
            }

        });

        //失效时 使用
        scope.$on('$timeout', function(e, data) {
            //var isMask = data['config'].isMask || false;
            var isMask = data['isMask'];
            if (isMask) {
                blockUI.stop();
            }
        });
    }
}
DryadCtrl.$inject = ['$rootScope', '$scope', '$uiBlock', 'APP_CONFIG', '$injector', 'blockUI'];

dryadApp.controller('dryadCtrl', DryadCtrl);