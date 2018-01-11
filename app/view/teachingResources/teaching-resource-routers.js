module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
            .state('dryad.teaching-resources', { //患教资源
                abstract: true,
                url: '/teaching-resources',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/teaching-resources.html'], (require) => {
                        let tpl = require('./html/teaching-resources.html');
                        deferred.resolve(tpl);
                    }, './teachingResources/teaching-resources-tpl');
                    return deferred.promise;
                }
            })
            .state('dryad.teaching-resources.list', { //患教资源列表
                url: '/list',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/teaching-resources-list.html'], (require) => {
                        let tpl = require('./html/teaching-resources-list.html');
                        deferred.resolve(tpl);
                    }, './teachingResources/teaching-resources-list-tpl');
                    return deferred.promise;
                },
                controller: 'teachingResourcesListCtrl',
                controllerAs: 'teachingResourcesListVm',
                resolve: {
                    'teachingResourcesListCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/teaching-resources-list-controller'], (require) => {
                            let ctrl = require('./controller/teaching-resources-list-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './teachingResources/teaching-resources-list-ctrl');
                        return deferred.promise;
                    }
                }
            });
        }
    ]).name;
}