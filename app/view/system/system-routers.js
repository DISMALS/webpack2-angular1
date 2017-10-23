// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.system', { //系统管理
                    abstract: true,
                    url: '/system',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system.html'], (require) => {
                            let tpl = require('./html/system.html');
                            deferred.resolve(tpl);
                        }, './system/system-tpl');
                        return deferred.promise;
                    }
                })
                .state('dryad.system.institutional-management', { //机构管理
                    abstract: true,
                    url: '/institutional-management',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-institutional-management.html'], (require) => {
                            let tpl = require('./html/system-institutional-management.html');
                            deferred.resolve(tpl);
                        }, './system/system-institutional-management-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemInstitutionalCtrl',
                    controllerAs: 'systemInstitutionalCtrlVm',
                    resolve: {
                        'systemInstitutionalCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-institutional-management-controller'], (require) => {
                                let ctrl = require('./controller/system-institutional-management-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-institutional-management-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.department', { //科室管理
                    url: '/department',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-department.html'], (require) => {
                            let tpl = require('./html/system-department.html');
                            deferred.resolve(tpl);
                        }, './system/system-department-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemDepartmentCtrl',
                    controllerAs: 'systemDepartmentVm',
                    resolve: {
                        'systemDepartmentCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-department-controller'], (require) => {
                                let ctrl = require('./controller/system-department-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-department-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.role', { //角色管理
                    url: '/role',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-role.html'], (require) => {
                            let tpl = require('./html/system-role.html');
                            deferred.resolve(tpl);
                        }, './system/system-role-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemRoleCtrl',
                    controllerAs: 'systemRoleVm',
                    resolve: {
                        'systemRoleCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-role-controller'], (require) => {
                                let ctrl = require('./controller/system-role-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-role-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.employee', { //员工管理
                    url: '/employee',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-employee.html'], (require) => {
                            let tpl = require('./html/system-employee.html');
                            deferred.resolve(tpl);
                        }, './system/system-employee-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemEmployeeCtrl',
                    controllerAs: 'systemEmployeeVm',
                    resolve: {
                        'systemEmployeeCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-employee-controller'], (require) => {
                                let ctrl = require('./controller/system-employee-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-employee-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.drug-dictionary', { //药品字典
                    abstract: true,
                    url: '/drug-dictionary',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-drug-dictionary.html'], (require) => {
                            let tpl = require('./html/system-drug-dictionary.html');
                            deferred.resolve(tpl);
                        }, './system/system-drug-dictionary-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemDrugDictionaryCtrl',
                    controllerAs: 'systemDrugDictionaryVm',
                    resolve: {
                        'systemDrugDictionaryCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-drug-dictionary-controller'], (require) => {
                                let ctrl = require('./controller/system-drug-dictionary-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-drug-dictionary-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.drug-dictionary.controlclass', { //控制类药物
                    url: '/controlclass',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-controlclass.html'], (require) => {
                            let tpl = require('./html/system-controlclass.html');
                            deferred.resolve(tpl);
                        }, './system/system-controlclass-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemControlclassCtrl',
                    controllerAs: 'systemControlclassVm',
                    resolve: {
                        'systemControlclassCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-controlclass-controller'], (require) => {
                                let ctrl = require('./controller/system-controlclass-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-controlclass-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.drug-dictionary.easeclass', { //缓解类药物
                    url: '/easeclass',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-easeclass.html'], (require) => {
                            let tpl = require('./html/system-easeclass.html');
                            deferred.resolve(tpl);
                        }, './system/system-easeclass-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemEaseclassCtrl',
                    controllerAs: 'systemEaseclassVm',
                    resolve: {
                        'systemEaseclassCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-easeclass-controller'], (require) => {
                                let ctrl = require('./controller/system-easeclass-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-easeclass-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.drug-dictionary.unclassified', { //未分类药物
                    url: '/unclassified',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-unclassified.html'], (require) => {
                            let tpl = require('./html/system-unclassified.html');
                            deferred.resolve(tpl);
                        }, './system/system-unclassified-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemUnclassifiedCtrl',
                    controllerAs: 'systemUnclassifiedVm',
                    resolve: {
                        'systemUnclassifiedCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-unclassified-controller'], (require) => {
                                let ctrl = require('./controller/system-unclassified-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-unclassified-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.basic-configuration', { //基础配置
                    url: '/basic-configuration',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-basic-configuration.html'], (require) => {
                            let tpl = require('./html/system-basic-configuration.html');
                            deferred.resolve(tpl);
                        }, './system/system-basic-configuration-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemBasicConfigurationCtrl',
                    controllerAs: 'systemBasicConfigurationVm',
                    resolve: {
                        'systemBasicConfiguration': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-basic-configuration-controller'], (require) => {
                                let ctrl = require('./controller/system-basic-configuration-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-basic-configuration-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.programs', { //项目机构管理
                    url: '/programs',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-programs.html'], (require) => {
                            let tpl = require('./html/system-programs.html');
                            deferred.resolve(tpl);
                        }, './system/system-programs-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemProgramsCtrl',
                    controllerAs: 'systemProgramsVm',
                    resolve: {
                        'systemProgramsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-programs-controller'], (require) => {
                                let ctrl = require('./controller/system-programs-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-programs-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.operational-roles', { //运营角色管理
                    url: '/operational-roles',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-operational-roles.html'], (require) => {
                            let tpl = require('./html/system-operational-roles.html');
                            deferred.resolve(tpl);
                        }, './system/system-operational-roles-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemOperationalRolesCtrl',
                    controllerAs: 'systemOperationalRolesVm',
                    resolve: {
                        'systemOperationalRoles': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-operational-roles-controller'], (require) => {
                                let ctrl = require('./controller/system-operational-roles-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-operational-roles-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.operating-account', { //运营账号管理
                    url: '/operating-account',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-operating-account.html'], (require) => {
                            let tpl = require('./html/system-operating-account.html');
                            deferred.resolve(tpl);
                        }, './system/system-operating-account-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemOperatingAccountCtrl',
                    controllerAs: 'systemOperatingAccountVm',
                    resolve: {
                        'systemOperatingAccount': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-operating-account-controller'], (require) => {
                                let ctrl = require('./controller/system-operating-account-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-operating-account-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.regional-center', { //区域中心管理
                    url: '/regional-center',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-regional-center.html'], (require) => {
                            let tpl = require('./html/system-regional-center.html');
                            deferred.resolve(tpl);
                        }, './system/system-regional-center-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemRegionalCenterCtrl',
                    controllerAs: 'systemRegionalCenterVm',
                    resolve: {
                        'systemDataCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-regional-center-controller'], (require) => {
                                let ctrl = require('./controller/system-regional-center-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-regional-center-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.expert-role', { //专家角色管理
                    url: '/expert-role',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-expert-role.html'], (require) => {
                            let tpl = require('./html/system-expert-role.html');
                            deferred.resolve(tpl);
                        }, './system/system-expert-role-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemExpertRoleCtrl',
                    controllerAs: 'systemExpertRoleVm',
                    resolve: {
                        'systemExpertRoleCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-expert-role-controller'], (require) => {
                                let ctrl = require('./controller/system-expert-role-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-expert-role-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.experts-account', { //专家账号管理
                    url: '/experts-account',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-experts-account.html'], (require) => {
                            let tpl = require('./html/system-experts-account.html');
                            deferred.resolve(tpl);
                        }, './system/system-experts-account-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemExpertsAccountCtrl',
                    controllerAs: 'systemExpertsAccountVm',
                    resolve: {
                        'systemExpertsAccountCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-experts-account-controller'], (require) => {
                                let ctrl = require('./controller/system-experts-account-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-experts-account-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}