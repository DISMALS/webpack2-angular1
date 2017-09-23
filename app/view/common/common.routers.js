module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('common', {
                    url: '/common',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/common.html'], (require) => {
                            const template = require('./html/common.html');
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
                                const ctrl = require('./controller/common-controller')(ngMold);
                                // const service = require('./service/common-service')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'lkApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, 'common-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
};