// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.operation', { //运营管理
                    abstract: true,
                    url: '/operation',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operation.html'], (require) => {
                            let tpl = require('./html/operation.html');
                            deferred.resolve(tpl);
                        }, './operation/operation-tpl');
                        return deferred.promise;
                    }
                })
                .state('dryad.operation.list', { //运营管理列表
                    url: '/list',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operation-list.html'], (require) => {
                            let tpl = require('./html/operation-list.html');
                            deferred.resolve(tpl);
                        }, './operation/operation-list-tpl');
                        return deferred.promise;
                    },
                    controller: 'operationListCtrl',
                    controllerAs: 'operationlistVm',
                    resolve: {
                        'operationListCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/operation-list-controller'], (require) => {
                                let ctrl = require('./controller/operation-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './operation/operation-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}