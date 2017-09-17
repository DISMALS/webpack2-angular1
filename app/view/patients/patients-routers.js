const patinetsMod = angular.module('lkApp.patinets',[]);

module.exports = patinetsMod.config(['$stateProvider',
    ($stateProvider) => {
        $stateProvider.state('sys.common.patients',{
            url:'/patients',
            templateProvider:($q) => {
                const deferred = $q.defer();
                require.ensure(['./html/patients.html'],(require) => {
                    let tpl = require('./html/patients.html');
                    deferred.resolve(tpl);
                },'patients-tpl');
                return deferred.promise;
            },
            controller:'patientCtrl',
            controllerAs:'patientVm',
            resolve:{
                'patientCtrl':($q,$ocLazyLoad) => {
                    const deferred = $q.defer();
                    require.ensure(['./controller/patient-controller'],(require) => {
                        let ctrl = require('./controller/patient-controller')(patinetsMod);
                        $ocLazyLoad.load({
                            name:'lkApp.patinets'
                        });
                        deferred.resolve(ctrl);
                    },'patients-ctrl');
                    return deferred.promise;
                }
            }
        })
    }
]).name;