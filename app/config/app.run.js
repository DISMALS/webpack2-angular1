module.exports = function(ngModule){
    ngModule.run(['$rootScope', '$state', '$stateParams', '$timeout', '$cookies',
        function($rootScope, $state, $stateParams, $timeout, $cookies){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
}