const homeMod = angular.module('lkApp.home', []);
module.exports = homeMod.config(['$stateProvider',
    ($stateProvider) => {
        $stateProvider.state('sys.common.home', {
            url: '/index',
            templateProvider: ($q) => {
                const deferred = $q.defer();
                require.ensure(['./html/main.html', './less/home.less'], (require) => {
                    const template = require('./html/main.html');
                    const less = require('./less/home.less');
                    deferred.resolve([template, less]);
                }, 'home-main-tpl');
                return deferred.promise;
            },
            controller: 'homeMainCtrl',
            controllerAs: 'homMainevm',
            resolve: {
                'homeCtrl': ($q, $ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./controller/home-controller'], (require) => {
                        const ctrl = require('./controller/home-controller')(homeMod);
                        $ocLazyLoad.load({
                            name: 'lkApp.home'
                        });
                        deferred.resolve(ctrl);
                    }, 'home-main-ctrl');
                    return deferred.promise;
                }
            }
        });
    }
]).name;