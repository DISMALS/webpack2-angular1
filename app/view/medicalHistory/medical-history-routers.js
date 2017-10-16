// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.medicalhistory', { //病历管理
                    abstract: true,
                    url: '/medicalhistory',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/medical-history-main.html'], (require) => {
                            const template = require('./html/medical-history-main.html');
                            deferred.resolve(template);
                        }, './medicalHistory/medicalhistory-main-tpl');
                        return deferred.promise;
                    },
                    controller: 'medicalHistoryCtrl',
                    controllerAs: 'medicalhistoryvm',
                    resolve: {
                        'medicalHistoryCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/medicalhistory-main-controller'], (require) => {
                                const ctrl = require('./controller/medicalhistory-main-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/medicalhistory-main-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.search', { //病历查询
                    url: '/search',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/medical-history-search.html'], (require) => {
                            const template = require('./html/medical-history-search.html');
                            deferred.resolve(template);
                        }, './medicalHistory/medicalhistory-search-tpl');
                        return deferred.promise;
                    },
                    controller: 'medicalHistorySearchCtrl',
                    controllerAs: 'medicalhistorysearchvm',
                    resolve: {
                        'medicalHistorySearchCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/medicalhistory-search-controller'], (require) => {
                                const ctrl = require('./controller/medicalhistory-search-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/medicalhistory-search-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.details', { //病历详情
                    url: '/details/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/medical-history-details.html'], (require) => {
                            const template = require('./html/medical-history-details.html');
                            deferred.resolve(template);
                        }, './medicalHistory/medicalhistory-details-tpl');
                        return deferred.promise;
                    },
                    controller: 'medicalHistoryDeailsCtrl',
                    controllerAs: 'medicalhistorydetailsvm',
                    resolve: {
                        'medicalHistoryDeailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/medicalhistory-details-controller'], (require) => {
                                const ctrl = require('./controller/medicalhistory-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/medicalhistory-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}