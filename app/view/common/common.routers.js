const commonMod = angular.module('lkApp.common', []);

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
                            const ctrl = require('./controller/common-controller')(commonMod);
                            const service = require('./service/common-service')(commonMod);
                            $ocLazyLoad.load({
                                name: 'lkApp.common',
                                files: [ctrl, service]
                            });
                            deferred.resolve(ctrl);
                        }, 'common-ctrl');
                        return deferred.promise;
                    }
                }
            })
    }
]).name;