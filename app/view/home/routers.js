module.exports = angular.module('lkApp.home',[]).config(['$stateProvider',
    ($stateProvider) => {
        $stateProvider.state('home',{
            url:'/home',
            templateProvider:($q) => {
                const deferred = $q.defer();
                require.ensure(['./home.html'],(require) => {
                    const template = require('./home.html');
                    deferred.resolve(template);
                },'home-tpl');
                return deferred.promise;
            },
            controller:'homeCtrl',
            controllerAs:'homevm',
            resolve:{
                'lkApp.home':($q,$ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./home-controller.js'],(require) => {
                        const mod = require('./home-controller.js');
                        $ocLazyLoad.load({
                            name:'lkApp.home'
                        });
                        deferred.resolve(mod.controller);
                    },'home-ctrl');
                    return deferred.promise;
                }
            }
        })
        .state('home.main',{
             url:'',
            templateProvider:($q) => {
                const deferred = $q.defer();
                require.ensure(['./main.html'],(require) => {
                    const template = require('./main.html');
                    deferred.resolve(template);
                },'home-main-tpl');
                return deferred.promise;
            },
            controller:'homeMainCtrl',
            controllerAs:'homMainevm',
            resolve:{
                'lkApp.home.main':($q,$ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./main-controller.js'],(require) => {
                        const mod = require('./main-controller.js');
                        $ocLazyLoad.load({
                            name:'lkApp.home.main'
                        });
                        deferred.resolve(mod.controller);
                    },'home-main-ctrl');
                    return deferred.promise;
                }
            }
        });
    }
]).name;