angular.module('lkApp',[
    'ui.router',
    'oc.lazyLoad',
    'ngCookies',
    require('./common/routing.js')
])
.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies',
    ($rootScope, $state, $stateParams, $timeout, $cookies) => {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

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
.config(['$urlRouterProvider','$locationProvider','$stateProvider',
    ($urlRouterProvider, $locationProvider,$stateProvider) => {
        $urlRouterProvider.otherwise("/authorize/login");
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $stateProvider.state('home',{
            url:'/home',
            templateProvider:($q) => {
                const deferred = $q.defer();
                require.ensure(['./view/common/html/home.html'],(require) => {
                    const template = require('./view/common/html/home.html');
                    deferred.resolve(template);
                },'home-tpl');
                return deferred.promise;
            },
            controller:'homeCtrl',
            controllerAs:'homevm',
            resolve:{
                'lkApp.home':($q,$ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./view/common/controller/home-controller.js'],(require) => {
                        const mod = require('./view/common/controller/home-controller.js');
                        $ocLazyLoad.load({
                            name:'lkApp.home'
                        });
                        deferred.resolve(mod.controller);
                    },'home-ctrl');
                    return deferred.promise;
                }
            }
        })
    }
]);