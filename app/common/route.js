module.exports = ngModule => {
    console.log(ngModule);
    ngModule.config(['$urlRouterProvider','$locationProvider','$stateProvider',
        function($urlRouterProvider,$locationProvider,$stateProvider){
            // $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('');
            
            $stateProvider
            .state({
                name: 'login',
                url: '/',
                component: 'login'
            });
            $urlRouterProvider.otherwise('/');
        }
    ]);
};

