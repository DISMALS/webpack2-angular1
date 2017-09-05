module.exports = angular.module('lkApp.home',[]).config(['$stateProvider',
    ($stateProvider) => {
        $stateProvider.state('home.main',{
             url:'/main',
            templateProvider:($q) => {
                const deferred = $q.defer();
                require.ensure(['./html/main.html'],(require) => {
                    const template = require('./html/main.html');
                    deferred.resolve(template);
                },'home-main-tpl');
                return deferred.promise;
            },
            controller:'homeMainCtrl',
            controllerAs:'homMainevm',
            resolve:{
                'lkApp.home':($q,$ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./controller/main-controller.js'],(require) => {
                        const mod = require('./controller/main-controller.js');
                        $ocLazyLoad.load({
                            name:'lkApp.home'
                        });
                        deferred.resolve(mod.controller);
                    },'home-main-ctrl');
                    return deferred.promise;
                }
            }
        });
    }
]).name;