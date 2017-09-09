module.exports = angular.module('lkApp.authorize', []).config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
    ($urlRouterProvider, $locationProvider, $stateProvider) => {
        $stateProvider.state('authorize', {
                abstract: true,
                url: '/authorize',
                templateProvider: ($q) => {
                    let deferred = $q.defer();
                    require.ensure(['./html/authorize.html', './less/login-authorize.less'], (require) => {
                        let template = require('./html/authorize.html');
                        let less = require('./less/login-authorize.less');
                        deferred.resolve([template, less]);
                    }, 'authorize-tpl');
                    return deferred.promise;
                },
                controller: 'authorizeCtrl',
                controllerAs: 'authorizevm',
                resolve: {
                    'lkApp.authorize': ($q, $ocLazyLoad) => {
                        let deferred = $q.defer();
                        require.ensure(['./controller/authorize.controller.js', './service/login-authorize.js'], (require) => {
                            let service = require('./service/login-authorize.js');
                            let mod = require('./controller/authorize.controller.js');
                            $ocLazyLoad.load({
                                name: 'lkApp.authorize'
                            });
                            deferred.resolve([mod.controller, service.factory]);
                        }, 'authorize-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('authorize.login', {
                url: '/login',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/login.html'], (require) => {
                        const template = require('./html/login.html');
                        deferred.resolve(template);
                    }, 'login-tpl');
                    return deferred.promise;
                },
                controller: 'loginCtrl',
                controllerAs: 'loginvm',
                resolve: {
                    'lkApp.authorize': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/login-controller.js'], (require) => {
                            const mod = require('./controller/login-controller.js');
                            $ocLazyLoad.load({
                                name: 'lkApp.authorize'
                            });
                            deferred.resolve(mod.controller);
                        }, 'login-ctrl');
                        return deferred.promise;
                    }
                }
            });
    }
]).name;