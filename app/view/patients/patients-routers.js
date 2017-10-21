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
                .state('dryad.patients.details', { //患者详情
                    abstract: true,
                    url: '/details',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/patients-details.html'], (require) => {
                            const template = require('./html/patients-details.html');
                            deferred.resolve(template);
                        }, './patients/patients-details-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientsDeailsCtrl',
                    controllerAs: 'patientsdetailsvm',
                    resolve: {
                        'patientsDeailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/patients-details-controller'], (require) => {
                                const ctrl = require('./controller/patients-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './patients/patients-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.patients.details.baseinfo', { //基本信息
                    url: '/baseinfo',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/baseinfo.html'], (require) => {
                            const template = require('./html/baseinfo.html');
                            deferred.resolve(template);
                        }, './patients/baseinfo-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientsBaseinfoCtrl',
                    controllerAs: 'patientsbaseinfovm',
                    params: {
                        index: null,
                        id: null
                    },
                    resolve: {
                        'patientsBaseinfoCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/baseinfo-controller'], (require) => {
                                const ctrl = require('./controller/baseinfo-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './patients/baseinfo-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.patients.details.diagnosis', { //诊断
                    url: '/diagnosis',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/diagnosis.html'], (require) => {
                            const template = require('./html/diagnosis.html');
                            deferred.resolve(template);
                        }, './patients/diagnosis-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientsDiagnosisCtrl',
                    controllerAs: 'patientsdiagnosisvm',
                    params: {
                        index: null,
                        id: null
                    },
                    resolve: {
                        'patientsDiagnosisCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/diagnosis-controller'], (require) => {
                                const ctrl = require('./controller/diagnosis-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './patients/diagnosis-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.patients.details.usemedical', { //PEF/用药/ACT
                    url: '/usemedical',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/usemedical.html'], (require) => {
                            const template = require('./html/usemedical.html');
                            deferred.resolve(template);
                        }, './patients/usemedical-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientsUsemedicalCtrl',
                    controllerAs: 'patientsusemedicalvm',
                    params: {
                        index: null,
                        id: null
                    },
                    resolve: {
                        'patientsUsemedicalCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/usemedical-controller'], (require) => {
                                const ctrl = require('./controller/usemedical-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './patients/usemedical-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.patients.details.health-records', { //健康档案
                    url: '/health-records',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/health-records.html'], (require) => {
                            const template = require('./html/health-records.html');
                            deferred.resolve(template);
                        }, './patients/health-records-tpl');
                        return deferred.promise;
                    },
                    controller: 'patientsHealthRecordsCtrl',
                    controllerAs: 'patientshealthrecordsvm',
                    params: {
                        index: null,
                        id: null
                    },
                    resolve: {
                        'patientsHealthRecordsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/health-records-controller'], (require) => {
                                const ctrl = require('./controller/health-records-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './patients/health-records-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}