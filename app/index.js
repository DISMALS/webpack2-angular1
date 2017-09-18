require('../less/ui.less');
const lkApp = angular.module('lkApp', [
        'ui.router',
        'oc.lazyLoad',
        'ngCookies',
        'ui.tree',
        require('./common/routing.js'),
        require('./common/service.js')
])

lkApp.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies',
        ($rootScope, $state, $stateParams, $timeout, $cookies) => {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.user = {
                name:'wangyong',
                age:23
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
    ])
    .config(['$urlRouterProvider', '$locationProvider','$stateProvider','$controllerProvider','$compileProvider','$filterProvider','$provide',
        ($urlRouterProvider, $locationProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) => {
            lkApp.controller = $controllerProvider.register;
            lkApp.directive = $compileProvider.register;
            lkApp.filter = $filterProvider.register;
            lkApp.factory = $provide.factory;
            lkApp.service = $provide.service;
            lkApp.constant = $provide.constant;


            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            $stateProvider.state('sys',{
                abstract:true,
                url:'/sys',
                template:'<div ui-view class="sys"></div>'
            });

            $urlRouterProvider.otherwise("/login");
        }
    ]).name;