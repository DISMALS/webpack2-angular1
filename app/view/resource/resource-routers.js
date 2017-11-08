
module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.resource', { //资源管理
                    abstract: true,
                    url: '/resource',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource.html'], (require) => {
                            let tpl = require('./html/resource.html');
                            deferred.resolve(tpl);
                        }, './operation/resource-tpl');
                        return deferred.promise;
                    },
/*                    controller: 'resourceCtrl',
                    controllerAs: 'resourceVm',
                    resolve: {
                        'resourceCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-controller'], (require) => {
                                let ctrl = require('./controller/resource-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './resource/resource-ctrl');
                            return deferred.promise;
                        }
                    }*/
                })
                .state('dryad.resource.list', { //资源管理列表
                    url: '/list',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-list.html'], (require) => {
                            let tpl = require('./html/resource-list.html');
                            deferred.resolve(tpl);
                        }, './resource/resource-list-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourceListCtrl',
                    controllerAs: 'resourcelistVm',
                    resolve: {
                        'resourceListCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-list-controller'], (require) => {
                                let ctrl = require('./controller/resource-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './resource/resource-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.resource.list.uncommitted', { //未提交
                    url: '/uncommitted',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-list-uncommitted.html'], (require) => {
                            let tpl = require('./html/resource-list-uncommitted.html');
                            deferred.resolve(tpl);
                        }, './resource-list-uncommitted-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourceListUncommittedCtrl',
                    controllerAs: 'resourceListUncommittedVm',
                    resolve: {
                        'resourceListUncommittedCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-list-uncommitted-controller'], (require) => {
                                let ctrl = require('./controller/resource-list-uncommitted-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, 'resource/resource-list-uncommitted-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.resource.list.pendingApproval', { //待审核
                    url: '/pendingApproval',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-list-pendingApproval.html'], (require) => {
                            let tpl = require('./html/resource-list-pendingApproval.html');
                            deferred.resolve(tpl);
                        }, './resource-list-pendingApproval-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourceListPendingApprovalCtrl',
                    controllerAs: 'resourceListPendingApprovalVm',
                    resolve: {
                        'resourceListPendingApprovalCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-list-pendingApproval-controller'], (require) => {
                                let ctrl = require('./controller/resource-list-pendingApproval-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, 'resource/resource-list-pendingApproval-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.resource.list.published', { //已发布
                    url: '/published',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-list-published.html'], (require) => {
                            let tpl = require('./html/resource-list-published.html');
                            deferred.resolve(tpl);
                        }, './resource-list-published-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourceListPublishedCtrl',
                    controllerAs: 'resourceListPublishedVm',
                    resolve: {
                        'resourceListPublishedCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-list-published-controller'], (require) => {
                                let ctrl = require('./controller/resource-list-published-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, 'resource/resource-list-published-ctrl');
                            return deferred.promise;
                        }
                    }
                })
/*                .state('dryad.resource.publish.newText', { //新增加图文
                    url: '/newText',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-newText.html'], (require) => {
                            let tpl = require('./html/resource-newText.html');
                            deferred.resolve(tpl);
                        }, './resource/resource-newText-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourceNewTextCtrl',
                    controllerAs: 'resourceNewTextVm',
                    resolve: {
                        'resourceNewTextCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-newText-controller'], (require) => {
                                let ctrl = require('./controller/resource-newText-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './resource/resource-newText-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.resource.publish.newVideo', { //资源管理列表
                    url: '/newVideo',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-newVideo.html'], (require) => {
                            let tpl = require('./html/resource-newVideo.html');
                            deferred.resolve(tpl);
                        }, './resource/resource-newVideo-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourceNewVideoCtrl',
                    controllerAs: 'resourceNewVideoVm',
                    resolve: {
                        'resourceNewTextCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-newVideo-controller'], (require) => {
                                let ctrl = require('./controller/resource-newVideo-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './resource/resource-newVideo-ctrl');
                            return deferred.promise;
                        }
                    }
                })*/
        }
    ]).name;
}