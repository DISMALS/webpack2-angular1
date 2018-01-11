module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
            .state('dryad.home', {
                abstract: true,
                url: '/home',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home.html'], (require) => {
                        const template = require('./html/home.html');
                        deferred.resolve(template);
                    }, './home/home-tpl');
                    return deferred.promise;
                }
            })
            .state('dryad.home.main', { //首页主内容
                url: '/main',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home-main.html'], (require) => {
                        const template = require('./html/home-main.html');
                        deferred.resolve(template);
                    }, './home/home-main-tpl');
                    return deferred.promise;
                },
                controller: 'homeMainCtrl',
                controllerAs: 'homMainevm',
                resolve: {
                    'homeMainCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-main-controller'], (require) => {
                            const ctrl = require('./controller/home-main-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-main-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module', {
                abstract:true,
                url: '/module',
                template:'<ui-view></ui-view>'
            })
            .state('dryad.home.module.list', {
                abstract:true,
                url: '/list',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home-list.html'], (require) => {
                        const template = require('./html/home-list.html');
                        deferred.resolve(template);
                    }, './home/home-list-tpl');
                    return deferred.promise;
                },
                controller: 'homeListCtrl',
                controllerAs: 'homListevm',
                resolve: {
                    'homeListCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-list-controller'], (require) => {
                            const ctrl = require('./controller/home-list-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-list-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.list.area', {
                url: '/area',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home-list-area.html'], (require) => {
                        const template = require('./html/home-list-area.html');
                        deferred.resolve(template);
                    }, './home/home-list-area-tpl');
                    return deferred.promise;
                },
                controller: 'homeListAreaCtrl',
                controllerAs: 'homListAreavm',
                resolve: {
                    'homeListAreaCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-list-area-controller'], (require) => {
                            const ctrl = require('./controller/home-list-area-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-list-area-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.main', {
                url: '/main',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home-list-main.html'], (require) => {
                        const template = require('./html/home-list-main.html');
                        deferred.resolve(template);
                    }, './home/home-list-main-tpl');
                    return deferred.promise;
                },
                controller: 'homeListMainCtrl',
                controllerAs: 'homeListMainvm',
                params:{
                    type:null
                },
                resolve: {
                    'homeListMainCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-list-main-controller'], (require) => {
                            const ctrl = require('./controller/home-list-main-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-list-main-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.main.patients', {
                url: '/patients',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home-list-patients.html'], (require) => {
                        const template = require('./html/home-list-patients.html');
                        deferred.resolve(template);
                    }, './home/home-list-patients-tpl');
                    return deferred.promise;
                },
                controller: 'homeListPatientsCtrl',
                controllerAs: 'homListPatientsvm',
                params:{
                    pid:null
                },
                resolve: {
                    'homeListPatientsCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-list-patients-controller'], (require) => {
                            const ctrl = require('./controller/home-list-patients-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-list-patients-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.main.details', {
                url: '/details/{pid}',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/home-details.html'], (require) => {
                        const template = require('./html/home-details.html');
                        deferred.resolve(template);
                    }, './home/home-details-tpl');
                    return deferred.promise;
                },
                controller: 'homeDeailsCtrl',
                controllerAs: 'homeDetailsvm',
                params: {
                    pid: null,
                    data: null
                },
                resolve: {
                    'homeDeailsCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-details-controller'], (require) => {
                            const ctrl = require('./controller/home-details-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp'
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-details-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.main.details.baseinfo', { //基本信息
                url: '/baseinfo',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/baseinfo.html'], (require) => {
                        const template = require('./html/baseinfo.html');
                        deferred.resolve(template);
                    }, './home/home-baseinfo-tpl');
                    return deferred.promise;
                },
                controller: 'homeBaseinfoCtrl',
                controllerAs: 'homeBaseinfovm',
                params: {
                    index: null,
                    pid: null,
                    rid: null
                },
                resolve: {
                    'homeBaseinfoCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-baseinfo-controller'], (require) => {
                            const ctrl = require('./controller/home-baseinfo-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-baseinfo-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.main.details.diagnosis', { //诊断
                url: '/diagnosis',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/diagnosis.html'], (require) => {
                        const template = require('./html/diagnosis.html');
                        deferred.resolve(template);
                    }, './home/home-diagnosis-tpl');
                    return deferred.promise;
                },
                controller: 'homeDiagnosisCtrl',
                controllerAs: 'homediagnosisvm',
                params: {
                    index: null,
                    pid: null,
                    rid: null
                },
                resolve: {
                    'homeDiagnosisCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-diagnosis-controller'], (require) => {
                            const ctrl = require('./controller/home-diagnosis-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-diagnosis-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.main.details.usemedical', { //PEF/用药/ACT
                url: '/usemedical',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/usemedical.html'], (require) => {
                        const template = require('./html/usemedical.html');
                        deferred.resolve(template);
                    }, './home/home-usemedical-tpl');
                    return deferred.promise;
                },
                controller: 'homeUsemedicalCtrl',
                controllerAs: 'homeusemedicalvm',
                params: {
                    index: null,
                    pid: null,
                    rid: null
                },
                resolve: {
                    'homeUsemedicalCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/home-usemedical-controller'], (require) => {
                            const ctrl = require('./controller/home-usemedical-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/home-usemedical-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory', { //数据应用
                abstract: true,
                url: '/medical-history',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-tpl');
                    return deferred.promise;
                },
                controller: 'dataApplicationCtrl',
                controllerAs: 'dataApplicationvm',
                resolve: {
                    'dataApplicationCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './medicalHistory/home-medicalHistory-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.list', { //数据查询
                url: '/list',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-list.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-list.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-list-tpl');
                    return deferred.promise;
                },
                controller: 'homeMedicalHistoryListCtrl',
                controllerAs: 'homeMedicalHistoryListVm',
                resolve: {
                    'homeMedicalHistoryListCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-list-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-list-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-list-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details', { //数据详情
                url: '/details/{rid}',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-details.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-details.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-details-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistoryDeailsCtrl',
                controllerAs: 'medicalHistoryDeailsVm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistoryDeailsCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-details-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-details-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-details-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details.baseinfo', { //基本信息
                url: '/baseinfo',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-baseinfo.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-baseinfo.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-baseinfo-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistoryBaseinfoCtrl',
                controllerAs: 'medicalHistorybaseinfovm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistoryBaseinfoCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-baseinfo-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-baseinfo-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-baseinfo-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details.clinical-information', { //临床信息
                url: '/clinical-information',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-clinical-information.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-clinical-information.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-clinical-information-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistoryClinicalInformationCtrl',
                controllerAs: 'medicalHistoryClinicalInformationvm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistoryClinicalInformationCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-clinical-information-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-clinical-information-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-clinical-information-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details.laboratory-inspection', { //实验室检查
                url: '/laboratory-inspection',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-laboratory-inspection.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-laboratory-inspection.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-laboratory-inspection-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistoryLaboratoryInspectionCtrl',
                controllerAs: 'medicalHistorylaboratoryInspectionvm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistoryLaboratoryInspectionCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-laboratory-inspection-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-laboratory-inspection-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-laboratory-inspection-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details.diagnosis', { //诊断
                url: '/diagnosis',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-diagnosis.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-diagnosis.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-diagnosis-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistoryDiagnosisCtrl',
                controllerAs: 'medicalHistoryDiagnosisvm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistoryDiagnosisCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-diagnosis-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-diagnosis-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-diagnosis-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details.treatment-regimen', { //治疗方案
                url: '/treatment-regimen',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-treatment-regimen.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-treatment-regimen.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-treatment-regimen-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistoryTreatmentRegimenCtrl',
                controllerAs: 'medicalHistoryTreatmentRegimenvm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistoryTreatmentRegimenCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-treatment-regimen-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-treatment-regimen-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-treatment-regimen-ctrl');
                        return deferred.promise;
                    }
                }
            })
            .state('dryad.home.module.medicalhistory.details.special-asthma', { //特殊哮喘记录
                url: '/special-asthma',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/medicalHistory/home-medicalHistory-special-asthma.html'], (require) => {
                        const template = require('./html/medicalHistory/home-medicalHistory-special-asthma.html');
                        deferred.resolve(template);
                    }, './home/medicalHistory/home-medicalHistory-special-asthma-tpl');
                    return deferred.promise;
                },
                controller: 'medicalHistorySpecialAsthmaCtrl',
                controllerAs: 'medicalHistorySpecialAsthmavm',
                params: {
                    rid: null,
                    pid:null
                },
                resolve: {
                    'medicalHistorySpecialAsthmaCtrl': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/medicalHistory/home-medicalHistory-special-asthma-controller'], (require) => {
                            const ctrl = require('./controller/medicalHistory/home-medicalHistory-special-asthma-controller')(ngMold);
                            $ocLazyLoad.inject({
                                name: 'dryadApp',
                                files: [ctrl]
                            });
                            deferred.resolve(ctrl);
                        }, './home/medicalHistory/home-medicalHistory-special-asthma-ctrl');
                        return deferred.promise;
                    }
                }
            });
        }
    ]).name;
};