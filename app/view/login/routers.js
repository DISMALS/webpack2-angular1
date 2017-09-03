module.exports = angular.module('lkApp.login',[]).config(['$urlRouterProvider','$locationProvider','$stateProvider',
    ($urlRouterProvider,$locationProvider,$stateProvider) => {
        $stateProvider.state('login',{
            url:'/login',
            templateProvider:($q) => {
                const deferred = $q.defer();
                require.ensure(['./login.html'],(require) => {
                    const template = require('./login.html');
                    deferred.resolve(template);
                },'login-tpl');
                return deferred.promise;
            },
            controller:'loginCtrl',
            controllerAs:'loginvm',
            resolve:{
                'lkApp.login':($q,$ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./login-controller.js'],(require) => {
                        const mod = require('./login-controller.js');
                        $ocLazyLoad.load({
                            name:'lkApp.login'
                        });
                        deferred.resolve(mod.controller);
                    },'login-ctrl');
                    return deferred.promise;
                }
            }
        });
    }
]).name;