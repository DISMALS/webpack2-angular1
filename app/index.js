angular.module('lkApp',[
    'ui.router',
    'oc.lazyLoad',
    require('./common/routing.js')
])
.config(['$urlRouterProvider','$locationProvider',
    ($urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise("login");
        $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');
    }
]);