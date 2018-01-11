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
                        require.ensure(['./html/institutional/system-institutional-management.html'], (require) => {
                            let tpl = require('./html/institutional/system-institutional-management.html');
                            deferred.resolve(tpl);
                        }, './system/system-institutional-management-tpl');
                        return deferred.promise;
                    }
                })
                .state('dryad.system.institutional-management.list', { //机构管理列表
                    abstract: true,
                    url: '/list',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/institutional/system-institutional-management-list.html'], (require) => {
                            let tpl = require('./html/institutional/system-institutional-management-list.html');
                            deferred.resolve(tpl);
                        }, './system/system-institutional-management-list-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemInstitutionalListCtrl',
                    controllerAs: 'systemInstitutionalListCtrlVm',
                    resolve: {
                        'systemInstitutionalListCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/institutional/system-institutional-management-list-controller'], (require) => {
                                let ctrl = require('./controller/institutional/system-institutional-management-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-institutional-management-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.list.department', { //科室管理
                    url: '/department',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/institutional/system-department.html'], (require) => {
                            let tpl = require('./html/institutional/system-department.html');
                            deferred.resolve(tpl);
                        }, './system/system-department-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemDepartmentCtrl',
                    controllerAs: 'systemDepartmentVm',
                    resolve: {
                        'systemDepartmentCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/institutional/system-department-controller'], (require) => {
                                let ctrl = require('./controller/institutional/system-department-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-department-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.list.role', { //角色管理
                    url: '/role',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/institutional/system-role.html'], (require) => {
                            let tpl = require('./html/institutional/system-role.html');
                            deferred.resolve(tpl);
                        }, './system/system-role-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemRoleCtrl',
                    controllerAs: 'systemRoleVm',
                    resolve: {
                        'systemRoleCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/institutional/system-role-controller'], (require) => {
                                let ctrl = require('./controller/institutional/system-role-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-role-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.list.employee', { //员工管理
                    url: '/employee/{pageindex}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/institutional/system-employee.html'], (require) => {
                            let tpl = require('./html/institutional/system-employee.html');
                            deferred.resolve(tpl);
                        }, './system/system-employee-tpl');
                        return deferred.promise;
                    },
                    params:{
                    		pageindex:null,
                    		searchkey:null
                    },
                    controller: 'systemEmployeeCtrl',
                    controllerAs: 'systemEmployeeVm',
                    resolve: {
                        'systemEmployeeCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/institutional/system-employee-controller'], (require) => {
                                let ctrl = require('./controller/institutional/system-employee-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-employee-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.details', { //员工管理详情
                    url: '/details/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/institutional/system-employee-details.html'], (require) => {
                            let tpl = require('./html/institutional/system-employee-details.html');
                            deferred.resolve(tpl);
                        }, './system/system-employee-details-tpl');
                        return deferred.promise;
                    },
                    params: {
                        id: null,
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemEmployeeDetailsCtrl',
                    controllerAs: 'systemEmployeeDetailsVm',
                    resolve: {
                        'systemEmployeeDetailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/institutional/system-employee-details-controller'], (require) => {
                                let ctrl = require('./controller/institutional/system-employee-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-employee-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.institutional-management.view', { //员工管理查看
                    url: '/view/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/institutional/system-employee-view-details.html'], (require) => {
                            let tpl = require('./html/institutional/system-employee-view-details.html');
                            deferred.resolve(tpl);
                        }, './system/system-employee-view-details-tpl');
                        return deferred.promise;
                    },
                    params: {
                        id: null,
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemEmployeeViewDetailsCtrl',
                    controllerAs: 'systemEmployeeViewDetailsVm',
                    resolve: {
                        'systemEmployeeViewDetailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/institutional/system-employee-view-details-controller'], (require) => {
                                let ctrl = require('./controller/institutional/system-employee-view-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-employee-view-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.drug-dictionary', { //药品字典
                    url: '/drug-dictionary',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/drugDictionary/system-drug-dictionary.html'], (require) => {
                            let tpl = require('./html/drugDictionary/system-drug-dictionary.html');
                            deferred.resolve(tpl);
                        }, './system/system-drug-dictionary-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemDrugDictionaryCtrl',
                    controllerAs: 'systemDrugDictionaryVm',
                    resolve: {
                        'systemDrugDictionaryCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/drugDictionary/system-drug-dictionary-controller'], (require) => {
                                let ctrl = require('./controller/drugDictionary/system-drug-dictionary-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-drug-dictionary-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.basic-configuration', { //基础配置
                    url: '/basic-configuration',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/baseConfig/system-basic-configuration.html'], (require) => {
                            let tpl = require('./html/baseConfig/system-basic-configuration.html');
                            deferred.resolve(tpl);
                        }, './system/system-basic-configuration-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemBasicConfigurationCtrl',
                    controllerAs: 'systemBasicConfigurationVm',
                    resolve: {
                        'systemBasicConfiguration': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/baseConfig/system-basic-configuration-controller'], (require) => {
                                let ctrl = require('./controller/baseConfig/system-basic-configuration-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-basic-configuration-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.programs', { //医疗单位
                    url: '/programs',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operational/system-programs.html'], (require) => {
                            let tpl = require('./html/operational/system-programs.html');
                            deferred.resolve(tpl);
                        }, './system/system-programs-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemProgramsCtrl',
                    controllerAs: 'systemProgramsVm',
                    resolve: {
                        'systemProgramsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/operational/system-programs-controller'], (require) => {
                                let ctrl = require('./controller/operational/system-programs-controller')(ngMold);
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
                        require.ensure(['./html/operational/system-operational-roles.html'], (require) => {
                            let tpl = require('./html/operational/system-operational-roles.html');
                            deferred.resolve(tpl);
                        }, './system/system-operational-roles-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemOperationalRolesCtrl',
                    controllerAs: 'systemOperationalRolesVm',
                    resolve: {
                        'systemOperationalRoles': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/operational/system-operational-roles-controller'], (require) => {
                                let ctrl = require('./controller/operational/system-operational-roles-controller')(ngMold);
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
                    abstract: true,
                    url: '/operating-account',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operational/system-operating-account.html'], (require) => {
                            let tpl = require('./html/operational/system-operating-account.html');
                            deferred.resolve(tpl);
                        }, './system/system-operating-account-tpl');
                        return deferred.promise;
                    }
                })
                .state('dryad.system.operating-account.list', { //运营账号管理列表
                    url: '/list/{pageindex}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operational/system-operating-account-list.html'], (require) => {
                            let tpl = require('./html/operational/system-operating-account-list.html');
                            deferred.resolve(tpl);
                        }, './system/system-operating-account-list-tpl');
                        return deferred.promise;
                    },
                    params:{
                    		pageindex:null,
                    		searchkey:null
                    },
                    controller: 'systemOperatingAccountCtrl',
                    controllerAs: 'systemOperatingAccountVm',
                    resolve: {
                        'systemOperatingAccount': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/operational/system-operating-account-list-controller'], (require) => {
                                let ctrl = require('./controller/operational/system-operating-account-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-operating-account-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.operating-account.details', { //运营账号详情
                    url: '/details/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operational/system-account-details.html'], (require) => {
                            let tpl = require('./html/operational/system-account-details.html');
                            deferred.resolve(tpl);
                        }, './system/system-account-details-tpl');
                        return deferred.promise;
                    },
                    params: {
                        id: null,
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemAccountDetailsCtrl',
                    controllerAs: 'systemAccountDetailsVm',
                    resolve: {
                        'systemAccountDetailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/operational/system-account-details-controller'], (require) => {
                                let ctrl = require('./controller/operational/system-account-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-account-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.operating-account.view', { //运营账号查看
                    url: '/view/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/operational/system-account-view-details.html'], (require) => {
                            let tpl = require('./html/operational/system-account-view-details.html');
                            deferred.resolve(tpl);
                        }, './system/system-account-view-details-tpl');
                        return deferred.promise;
                    },
                    params: {
                        id: null,
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemAccountViewDetailsCtrl',
                    controllerAs: 'systemAccountViewDetailsVm',
                    resolve: {
                        'systemAccountViewDetailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/operational/system-account-view-details-controller'], (require) => {
                                let ctrl = require('./controller/operational/system-account-view-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-account-view-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.regional-center', { //区域中心管理
                    url: '/regional-center',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/expert/system-regional-center.html'], (require) => {
                            let tpl = require('./html/expert/system-regional-center.html');
                            deferred.resolve(tpl);
                        }, './system/system-regional-center-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemRegionalCenterCtrl',
                    controllerAs: 'systemRegionalCenterVm',
                    resolve: {
                        'systemDataCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/expert/system-regional-center-controller'], (require) => {
                                let ctrl = require('./controller/expert/system-regional-center-controller')(ngMold);
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
                        require.ensure(['./html/expert/system-expert-role.html'], (require) => {
                            let tpl = require('./html/expert/system-expert-role.html');
                            deferred.resolve(tpl);
                        }, './system/system-expert-role-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemExpertRoleCtrl',
                    controllerAs: 'systemExpertRoleVm',
                    resolve: {
                        'systemExpertRoleCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/expert/system-expert-role-controller'], (require) => {
                                let ctrl = require('./controller/expert/system-expert-role-controller')(ngMold);
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
                    abstract: true,
                    url: '/experts-account',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/expert/system-experts-account.html'], (require) => {
                            let tpl = require('./html/expert/system-experts-account.html');
                            deferred.resolve(tpl);
                        }, './system/system-experts-account-tpl');
                        return deferred.promise;
                    },
                    
                })
                .state('dryad.system.experts-account.list', { //运营账号管理列表
                    url: '/list{pageindex}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/expert/system-experts-account-list.html'], (require) => {
                            let tpl = require('./html/expert/system-experts-account-list.html');
                            deferred.resolve(tpl);
                        }, './system/system-experts-account-list-tpl');
                        return deferred.promise;
                    },
                    params: {
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemExpertsAccountListCtrl',
                    controllerAs: 'systemExpertsAccountListVm',
                    resolve: {
                        'systemExpertsAccountListCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/expert/system-experts-account-list-controller'], (require) => {
                                let ctrl = require('./controller/expert/system-experts-account-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-experts-account-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.experts-account.details', { //运营账号详情
                    url: '/details/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/expert/system-account-details.html'], (require) => {
                            let tpl = require('./html/expert/system-account-details.html');
                            deferred.resolve(tpl);
                        }, './system/system-expert-account-details-tpl');
                        return deferred.promise;
                    },
                    params: {
                        id: null,
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemExpertAccountDetailsCtrl',
                    controllerAs: 'systemExpertAccountDetailsVm',
                    resolve: {
                        'systemExpertAccountDetailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/expert/system-account-details-controller'], (require) => {
                                let ctrl = require('./controller/expert/system-account-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-expert-account-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.experts-account.view', { //运营账号查看
                    url: '/view/{id}',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/expert/system-account-view-details.html'], (require) => {
                            let tpl = require('./html/expert/system-account-view-details.html');
                            deferred.resolve(tpl);
                        }, './system/system-expert-account-view-details-tpl');
                        return deferred.promise;
                    },
                    params: {
                        id: null,
                        pageindex:null,
                        searchkey:null
                    },
                    controller: 'systemExpertAccountViewDetailsCtrl',
                    controllerAs: 'systemExpertAccountViewDetailsVm',
                    resolve: {
                        'systemExpertAccountViewDetailsCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/expert/system-account-view-details-controller'], (require) => {
                                let ctrl = require('./controller/expert/system-account-view-details-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-expert-account-view-details-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}