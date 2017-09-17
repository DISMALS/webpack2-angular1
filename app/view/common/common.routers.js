const commonMod = angular.module('lkApp.common',[]);

module.exports = commonMod.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
            .state('sys.common', {
                url: '/common',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/common.html'], (require) => {
                        const template = require('./html/common.html');
                        // const uiTreeCss = require('../node_modules/angular-ui-tree/dist/angular-ui-tree.min.css');
                        deferred.resolve(template);
                    }, 'common-tpl');
                    return deferred.promise;
                },
                controller: 'commonCtrl',
                controllerAs: 'commonvm',
                resolve: {
                    'commonCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/common-controller'], (require) => {
                            const mod = require('./controller/common-controller')(commonMod);
                            $ocLazyLoad.load({
                                name: 'lkApp.common'
                            });
                            deferred.resolve(mod);
                        }, 'common-ctrl');
                        return deferred.promise;
                    }
                }
            })
        }
    ]).name;