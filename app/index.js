require('../node_modules/angular-ui-tree/dist/angular-ui-tree.min.css');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/angular-toastr/dist/angular-toastr.min.css');
require('../node_modules/ui-select/dist/select.min.css');
require('../node_modules/angular-block-ui/dist/angular-block-ui.min.css');


require('../less/ui.less');
const dryadApp = angular.module('dryadApp', [
    'ngAnimate',
    'LocalStorageModule',
    'ui.router',
    'oc.lazyLoad',
    'ngCookies',
    'ui.tree',
    'ui.bootstrap',
    'ui.select',
    'toastr',
    'angular-echarts',
    'btford.socket-io',
    'ui.timepicker',
    'angularMoment',
    'blockUI'
]);

//集中加载路由文件以及公共服务
require('./common/routing.js')(dryadApp);
require('./common/service.js')(dryadApp);
require('./common/directive.js')(dryadApp);

dryadApp.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies',
    ($rootScope, $state, $stateParams, $timeout, $cookies) => {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.user = {
            name: 'wangyong',
            age: 23
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
    }
]);

dryadApp.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'blockUIConfig',
    ($urlRouterProvider, $locationProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, blockUIConfig) => {
        dryadApp.controller = $controllerProvider.register;
        dryadApp.directive = $compileProvider.register;
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


        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise("/authorize/login");

        // 允许跨域调用Web API
        $httpProvider.defaults.withCredentials = true;

        //注册依赖 请求拦截器
        $httpProvider.interceptors.push('interceptorService');

        //弹窗锁屏配置
        blockUIConfig.message = '请稍等，让数据飞一会儿...';

    }
]);


class DryadCtrl {
    constructor($rootScope, $scope, $uiBlock, APP_CONFIG, $injector, blockUI) {
        var scope = $scope;
        var _http = _http || $injector.get('$http');

        scope.ASSETS_URL = APP_CONFIG.ASSETS_URL;

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