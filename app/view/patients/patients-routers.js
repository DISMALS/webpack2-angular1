// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.patients', { //患者管理
                    abstract: true,
                    url: '/patients',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/patients.html'], (require) => {
                            let tpl = require('./html/patients.html');
                            deferred.resolve(tpl);
                        }, './patients/patients-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientCtrl',
                    controllerAs: 'patientVm',
                    resolve: {
                        'patientCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/patient-controller'], (require) => {
                                let ctrl = require('./controller/patient-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './patients/patients-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.patients.search', { //患者查询
                    url: '/search',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/patients-search.html'], (require) => {
                            let tpl = require('./html/patients-search.html');
                            deferred.resolve(tpl);
                        }, './patients/patients-search-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientsSearchCtrl',
                    controllerAs: 'patientsSearchVm',
                    resolve: {
                        'patientsSearchCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/patients-search-controller'], (require) => {
                                let ctrl = require('./controller/patients-search-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './patients/patients-search-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}