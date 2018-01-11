// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.data-applications', { //数据应用
                    abstract: true,
                    url: '/data-application',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/data-application.html'], (require) => {
                            const template = require('./html/data-application.html');
                            deferred.resolve(template);
                        }, './dataApplications/data-application-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataApplicationCtrl',
                    controllerAs: 'dataApplicationvm',
                    resolve: {
                        'dataApplicationCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/data-application-controller'], (require) => {
                                const ctrl = require('./controller/data-application-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/data-application-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.search', { //数据查询
                    url: '/search',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/data-application-search.html'], (require) => {
                            const template = require('./html/data-application-search.html');
                            deferred.resolve(template);
                        }, './dataApplications/data-application-search-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataApplicationSearchCtrl',
                    controllerAs: 'dataApplicationSearchVm',
                    resolve: {
                        'dataApplicationSearchCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/data-application-search-controller'], (require) => {
                                const ctrl = require('./controller/data-application-search-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/data-application-search-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details', { //数据详情
                    url: '/details/{rid}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/data-application-details.html'], (require) => {
                            const template = require('./html/data-application-details.html');
                            deferred.resolve(template);
                        }, './dataApplications/data-application-details-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataApplicationDeailsCtrl',
                    controllerAs: 'dataApplicationDeailsVm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataApplicationDeailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/data-application-details-controller'], (require) => {
                                const ctrl = require('./controller/data-application-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/data-application-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details.baseinfo', { //基本信息
                    url: '/baseinfo',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/data-baseinfo.html'], (require) => {
                            const template = require('./html/data-baseinfo.html');
                            deferred.resolve(template);
                        }, './dataApplications/data-baseinfo-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataBaseinfoCtrl',
                    controllerAs: 'databaseinfovm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataBaseinfoCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/data-baseinfo-controller'], (require) => {
                                const ctrl = require('./controller/data-baseinfo-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/data-baseinfo-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details.clinical-information', { //临床信息
                    url: '/clinical-information',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/clinical-information.html'], (require) => {
                            const template = require('./html/clinical-information.html');
                            deferred.resolve(template);
                        }, './dataApplications/clinical-information-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataClinicalInformationCtrl',
                    controllerAs: 'dataclinicalInformationvm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataClinicalInformationCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/clinical-information-controller'], (require) => {
                                const ctrl = require('./controller/clinical-information-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/clinical-information-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details.laboratory-inspection', { //实验室检查
                    url: '/laboratory-inspection',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/laboratory-inspection.html'], (require) => {
                            const template = require('./html/laboratory-inspection.html');
                            deferred.resolve(template);
                        }, './dataApplications/laboratory-inspection-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataLaboratoryInspectionCtrl',
                    controllerAs: 'laboratoryInspectionvm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataLaboratoryInspectionCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/laboratory-inspection-controller'], (require) => {
                                const ctrl = require('./controller/laboratory-inspection-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/laboratory-inspection-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details.diagnosis', { //诊断
                    url: '/diagnosis',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/data-diagnosis.html'], (require) => {
                            const template = require('./html/data-diagnosis.html');
                            deferred.resolve(template);
                        }, './dataApplications/data-diagnosis-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataDiagnosisCtrl',
                    controllerAs: 'dataDiagnosisvm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataDiagnosisCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/data-diagnosis-controller'], (require) => {
                                const ctrl = require('./controller/data-diagnosis-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/data-diagnosis-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details.treatment-regimen', { //治疗方案
                    url: '/treatment-regimen',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/treatment-regimen.html'], (require) => {
                            const template = require('./html/treatment-regimen.html');
                            deferred.resolve(template);
                        }, './dataApplications/treatment-regimen-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataTreatmentRegimenCtrl',
                    controllerAs: 'dataTreatmentRegimenvm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataTreatmentRegimenCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/treatment-regimen-controller'], (require) => {
                                const ctrl = require('./controller/treatment-regimen-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/treatment-regimen-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.data-applications.details.special-asthma', { //特殊哮喘记录
                    url: '/special-asthma',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/special-asthma.html'], (require) => {
                            const template = require('./html/special-asthma.html');
                            deferred.resolve(template);
                        }, './dataApplications/special-asthma-tpl');
                        return deferred.promise;
                    },
                    controller: 'dataSpecialAsthmaCtrl',
                    controllerAs: 'dataSpecialAsthmavm',
                    params: {
                        rid: null,
                        pid:null
                    },
                    resolve: {
                        'dataSpecialAsthmaCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/special-asthma-controller'], (require) => {
                                const ctrl = require('./controller/special-asthma-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './dataApplications/special-asthma-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}