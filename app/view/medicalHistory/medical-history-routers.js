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
                    params:{
                        pid: null,
                        rid: null,
                        createRecord:null,
                        info:null
                    },
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
                    // abstract: true,
                    url: '/details/{rid}',
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
                    params: {
                        pid: null,
                        rid: null
                    },
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
                .state('dryad.medicalhistory.details.baseinfo', { //基本信息
                    url: '/baseinfo',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/medicalhistory-baseinfo.html'], (require) => {
                            const template = require('./html/medicalhistory-baseinfo.html');
                            deferred.resolve(template);
                        }, './medicalHistory/medicalhistory-baseinfo-tpl');
                        return deferred.promise;
                    },
                    controller: 'medicalhistoryBaseinfoCtrl',
                    controllerAs: 'medicalhistorybaseinfovm',
                    params: {
                        pid: null,
                        rid: null,
                        first:null
                    },
                    resolve: {
                        'medicalhistoryBaseinfoCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/medicalhistory-baseinfo-controller'], (require) => {
                                const ctrl = require('./controller/medicalhistory-baseinfo-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/medicalhistory-baseinfo-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.details.clinical-information', { //临床信息
                    url: '/clinical-information',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/clinical-information.html'], (require) => {
                            const template = require('./html/clinical-information.html');
                            deferred.resolve(template);
                        }, './medicalHistory/clinical-information-tpl');
                        return deferred.promise;
                    },
                    controller: 'clinicalInformationCtrl',
                    controllerAs: 'clinicalInformationvm',
                    params: {
                        pid: null,
                        rid: null
                    },
                    resolve: {
                        'clinicalInformationCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/clinical-information-controller'], (require) => {
                                const ctrl = require('./controller/clinical-information-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/clinical-information-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.details.laboratory-inspection', { //实验室检查
                    url: '/laboratory-inspection',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/laboratory-inspection.html'], (require) => {
                            const template = require('./html/laboratory-inspection.html');
                            deferred.resolve(template);
                        }, './medicalHistory/laboratory-inspection-tpl');
                        return deferred.promise;
                    },
                    controller: 'laboratoryInspectionCtrl',
                    controllerAs: 'laboratoryInspectionvm',
                    params: {
                        pid: null,
                        rid: null
                    },
                    resolve: {
                        'laboratoryInspectionCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/laboratory-inspection-controller'], (require) => {
                                const ctrl = require('./controller/laboratory-inspection-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/laboratory-inspection-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.details.diagnosis', { //诊断
                    url: '/diagnosis',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/medicalhistory-diagnosis.html'], (require) => {
                            const template = require('./html/medicalhistory-diagnosis.html');
                            deferred.resolve(template);
                        }, './medicalHistory/medicalhistory-diagnosis-tpl');
                        return deferred.promise;
                    },
                    controller: 'medicalhistoryDiagnosisCtrl',
                    controllerAs: 'medicalhistoryDiagnosisvm',
                    params: {
                        pid: null,
                        rid: null
                    },
                    resolve: {
                        'medicalhistoryDiagnosisCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/medicalhistory-diagnosis-controller'], (require) => {
                                const ctrl = require('./controller/medicalhistory-diagnosis-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/medicalhistory-diagnosis-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.details.treatment-regimen', { //治疗方案
                    url: '/treatment-regimen',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/treatment-regimen.html'], (require) => {
                            const template = require('./html/treatment-regimen.html');
                            deferred.resolve(template);
                        }, './medicalHistory/treatment-regimen-tpl');
                        return deferred.promise;
                    },
                    controller: 'treatmentRegimenCtrl',
                    controllerAs: 'treatmentRegimenvm',
                    params: {
                        pid: null,
                        rid: null
                    },
                    resolve: {
                        'treatmentRegimenCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/treatment-regimen-controller'], (require) => {
                                const ctrl = require('./controller/treatment-regimen-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/treatment-regimen-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.medicalhistory.details.special-asthma', { //特殊哮喘记录
                    url: '/special-asthma',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/special-asthma.html'], (require) => {
                            const template = require('./html/special-asthma.html');
                            deferred.resolve(template);
                        }, './medicalHistory/special-asthma-tpl');
                        return deferred.promise;
                    },
                    controller: 'specialAsthmaCtrl',
                    controllerAs: 'specialAsthmavm',
                    params: {
                        pid: null,
                        rid: null
                    },
                    resolve: {
                        'specialAsthmaCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/special-asthma-controller'], (require) => {
                                const ctrl = require('./controller/special-asthma-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './medicalHistory/special-asthma-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}