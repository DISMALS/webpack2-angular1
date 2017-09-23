require('../node_modules/angular-ui-tree/dist/angular-ui-tree.min.css');


require('../less/ui.less');
const lkApp = angular.module('lkApp', [
    'ui.router',
    'oc.lazyLoad',
    'ngCookies',
    'ui.tree'
]);

//集中加载路由文件以及公共服务
require('./common/routing.js')(lkApp);
require('./common/service.js')(lkApp);

lkApp.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies',
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

lkApp.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    ($urlRouterProvider, $locationProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) => {
        lkApp.controller = $controllerProvider.register;
        lkApp.directive = $compileProvider.register;
        lkApp.filter = $filterProvider.register;
        lkApp.factory = $provide.factory;
        lkApp.service = $provide.service;
        lkApp.constant = $provide.constant;


        // $ocLazyLoadProvider.config({
        //     loadedModules: ["oc.lazyLoad","ui.router"],//主模块名,和ng.bootstrap(document, ['monitorApp'])相同
        //     //jsLoader: requirejs, //使用requirejs去加载文件
        //     //files: ['modules/summary','modules/appEngine','modules/alarm','modules/database'], //主模块需要的资源，这里主要子模块的声明文件
        //     debug: true
        // });


        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        // $stateProvider.state('sys', {
        //     abstract: true,
        //     url: '/sys',
        //     template: '<div ui-view class="sys"></div>'
        // });

        $urlRouterProvider.otherwise("/login");
    }
]);