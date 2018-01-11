/**
 * Created by wangmu on 17/11/7.
 */
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
                        }, './resource/resource-tpl');
                        return deferred.promise;
                    },
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
                        }, './resource/resource-list-uncommitted-tpl');
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
                            }, './resource/resource-list-uncommitted-ctrl');
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
                        }, './resource/resource-list-pendingApproval-tpl');
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
                            }, './resource/resource-list-pendingApproval-ctrl');
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
                        }, './resource/resource-list-published-tpl');
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
                            }, './resource/resource-list-published-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.resource.publish', { //新增图文
                    url: '/publish',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-publish.html'], (require) => {
                            let tpl = require('./html/resource-publish.html');
                            deferred.resolve(tpl);
                        }, './resource/resource-publish-tpl');
                        return deferred.promise;
                    },
                    controller: 'resourcePublishCtrl',
                    controllerAs: 'resourcePublishVm',
                    params: {
                        operation: null,
                        activeTab: null,
                        resourceId: null
                    },
                    resolve: {
                        'resourcePublishCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-publish-controller'], (require) => {
                                let ctrl = require('./controller/resource-publish-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './resource/resource-publish-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.resource.previewText', { //图文预览
                    url: '/previewText',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/resource-previewText.html'], (require) => {
                            let tpl = require('./html/resource-previewText.html');
                            deferred.resolve(tpl);
                        }, './resource/resource-previewText-tpl');
                        return deferred.promise;
                    },
                    params: {
                        type: null,
                        data: null,
                        resourceId: null
                    },
                    controller: 'resourcePreviewTextCtrl',
                    controllerAs: 'resourcePreviewTextVm',
                    resolve: {
                        'resourcePreviewTextCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resource-previewText-controller'], (require) => {
                                let ctrl = require('./controller/resource-previewText-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './resource/resource-previewText-controller');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}