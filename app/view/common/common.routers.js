module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad', {
                    url: '/dryad',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/main.html'], (require) => {
                            const template = require('./html/main.html');
                            deferred.resolve(template);
                        }, './common/main-tpl');
                        return deferred.promise;
                    },
                    controller: 'mainCtrl',
                    controllerAs: 'mainvm',
                    resolve: {
                        'mainCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/main-controller'], (require) => {
                                const ctrl = require('./controller/main-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './common/main-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
};