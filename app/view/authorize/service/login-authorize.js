module.exports = angular.module('lkApp.authorize', []).factory('loginAuthorize', ['$state', 'Http', '$cookies',
    ($state, Http, $cookies) => {
        const http = new Http();

        let _test = () => {
            return http.get('./app/config/data/menu.json');
        }

        return {
            test: _test
        }
    }
]);