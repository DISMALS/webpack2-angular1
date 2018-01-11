// const patinetsMod = angular.module('dryadApp.patinets',[]);
module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('dryad.online-consulting', { //在线咨询
                    url: '/online-consulting',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/online-consulting.html'], (require) => {
                            let tpl = require('./html/online-consulting.html');
                            deferred.resolve(tpl);
                        }, './onlineConsulting/online-consulting-tpl');
                        return deferred.promise;
                    },
                    controller: 'onlineConsultingCtrl',
                    controllerAs: 'onlineconsultingVm',
                    resolve: {
                        'onlineConsultingCtrl': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['../../config/webim.config.js', '../../../node_modules/easemob-websdk/dist/strophe-1.2.8.min.js', './controller/online-consulting-controller'], (require) => {

                                let ctrl = require('./controller/online-consulting-controller')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './onlineConsulting/online-consulting-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
}