// const patinetsMod = angular.module('dryadApp.patinets',[]);

module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.appointment', { //预约管理
                    abstract: true,
                    url: '/appointment',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/appointment.html'], (require) => {
                            const template = require('./html/appointment.html');
                            deferred.resolve(template);
                        }, './appointment/appointment-tpl');
                        return deferred.promise;
                    }
                })
                .state('dryad.appointment.view', { //预约视图
                    url: '/view',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/appt-view.html'], (require) => {
                            const template = require('./html/appt-view.html');
                            deferred.resolve(template);
                        }, './appointment/appt-tpl');
                        return deferred.promise;
                    },
                    controller: 'apptViewCtrl',
                    controllerAs: 'apptViewvm',
                    resolve: {
                        'apptViewCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/appt-view-controller','../../common/src/scheduler/v4.1/dhtmlxscheduler.js','../../common/src/scheduler/codebase/ext/dhtmlxscheduler_agenda_view.js','../../common/src/scheduler/v4.1/dhtmlxscheduler_units.js','../../common/src/scheduler/codebase/locale/locale_cn.js','../../common/src/scheduler/codebase/ext/dhtmlxscheduler_limit.js'], (require) => {
                                const ctrl = require('./controller/appt-view-controller')(ngMold);
                                require('../../common/src/scheduler/codebase/dhtmlxscheduler4.1.css');
                                require('../../common/src/scheduler/v4.1/dhtmlxscheduler.js');
                                // require('../../common/src/scheduler/codebase/ext/dhtmlxscheduler_agenda_view.js');
                                require('../../common/src/scheduler/v4.1/dhtmlxscheduler_units.js');
                                require('../../common/src/scheduler/codebase/locale/locale_cn.js');
                                require('./directive/appt-unit-directive.js')(ngMold);
                                // require('../../common/src/scheduler/codebase/ext/dhtmlxscheduler_limit.js');
                                
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './appointment/appt-view-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('dryad.appointment.list', { //预约列表
                    url: '/list',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/appt-list.html'], (require) => {
                            const template = require('./html/appt-list.html');
                            deferred.resolve(template);
                        }, './appointment/appt-list-tpl');
                        return deferred.promise;
                    },
                    controller: 'apptListCtrl',
                    controllerAs: 'apptListvm',
                    resolve: {
                        'apptListCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/appt-list-controller','../../common/src/scheduler/v4.1/dhtmlxscheduler.js','../../common/src/scheduler/codebase/ext/dhtmlxscheduler_agenda_view.js','../../common/src/scheduler/v4.1/dhtmlxscheduler_units.js','../../common/src/scheduler/codebase/locale/locale_cn.js','../../common/src/scheduler/codebase/ext/dhtmlxscheduler_limit.js'], (require) => {
                                const ctrl = require('./controller/appt-list-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp',
                                    files: [ctrl]
                                });
                                deferred.resolve(ctrl);
                            }, './appointment/appt-list-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}