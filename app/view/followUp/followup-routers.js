// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.followup', { //随访管理
                    abstract: true,
                    url: '/followup',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/followup.html'], (require) => {
                            let tpl = require('./html/followup.html');
                            deferred.resolve(tpl);
                        }, './followUp/followup-tpl');
                        return deferred.promise;
                    }
                })
                .state('dryad.followup.list', { //随访列表
                    url: '/list',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/followup-list.html'], (require) => {
                            let tpl = require('./html/followup-list.html');
                            deferred.resolve(tpl);
                        }, './followUp/followup-list-tpl');
                        return deferred.promise;
                    },
                    controller: 'followupListCtrl',
                    controllerAs: 'followupListVm',
                    resolve: {
                        'followupListCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/followup-list-controller'], (require) => {
                                let ctrl = require('./controller/followup-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './followUp/followup-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}