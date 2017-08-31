module.exports = function(ngModule){
    ngModule.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies',
        function($rootScope, $state, $stateParams, $timeout, $cookies){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // // 防止页面无故刷新
            // window.onbeforeunload = function(e) {
            //     return "You work will be lost.";

            // };

            // // 防止回退按钮
            // $rootScope.$on('$locationChangeStart', function(event, from, to) {
            //     var st = angular.copy($state.current);
            //     var stateHref = $state.href(st.name, $stateParams);
            //     //console.log('$locationChangeStart', arguments, st, stateHref);
            //     var isPageHistoryBack = st.url != '^' && -1 == from.indexOf(stateHref);
            //     if (isPageHistoryBack) {
            //         event.preventDefault();
            //     }
            //     //console.log(st);
            // });
        }
    ]).config('$urlRouterProvider','$locationProvider','$stateProvider',
        function($urlRouterProvider,$locationProvider,$stateProvider){
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('');

            $urlRouterProvider.otherwise('/');
            $stateProvider.state('main',{
                url:'/main',
                templateUrl:'./login/login.html',
                controller:'loginCtrl'
            })

        }
    )
};

