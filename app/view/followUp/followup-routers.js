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
                .state('dryad.followup.unfinished', { //随访未完成
                    url: '/unfinished',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/followup-unfinished.html'], (require) => {
                            let tpl = require('./html/followup-unfinished.html');
                            deferred.resolve(tpl);
                        }, './followUp/followup-unfinished-tpl');
                        return deferred.promise;
                    },
                    controller: 'followupUnfinishedCtrl',
                    controllerAs: 'followupUnfinishedVm',
                    resolve: {
                        'followupUnfinishedCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/followup-unfinished-controller'], (require) => {
                                let ctrl = require('./controller/followup-unfinished-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './followUp/followup-unfinished-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}