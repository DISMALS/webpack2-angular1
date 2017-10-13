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
                .state('dryad.system.medical-organization', { //医疗机构管理
                    abstract: true,
                    url: '/medical-organization',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-medical-organization.html'], (require) => {
                            let tpl = require('./html/system-medical-organization.html');
                            deferred.resolve(tpl);
                        }, './system/system-medical-organization-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemMedicalOrganizationCtrl',
                    controllerAs: 'systemmedicalorganizationCtrlVm',
                    resolve: {
                        'systemMedicalOrganizationCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-medical-organization-controller'], (require) => {
                                let ctrl = require('./controller/system-medical-organization-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-medical-organization-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.medicine', { //常用药品字典
                    abstract: true,
                    url: '/medicine',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-medicine.html'], (require) => {
                            let tpl = require('./html/system-medicine.html');
                            deferred.resolve(tpl);
                        }, './system/system-medicine-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemMedicineCtrl',
                    controllerAs: 'systemmedicineVm',
                    resolve: {
                        'systemMedicineCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-medicine-controller'], (require) => {
                                let ctrl = require('./controller/system-medicine-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-medicine-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.system.data', { //数据使用管理
                    abstract: true,
                    url: '/data',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/system-data.html'], (require) => {
                            let tpl = require('./html/system-data.html');
                            deferred.resolve(tpl);
                        }, './system/system-data-tpl');
                        return deferred.promise;
                    },
                    controller: 'systemDataCtrl',
                    controllerAs: 'systemdataVm',
                    resolve: {
                        'systemDataCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/system-data-controller'], (require) => {
                                let ctrl = require('./controller/system-data-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './system/system-data-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}