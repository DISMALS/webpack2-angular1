module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('authorize', {
                    abstract: true,
                    url: '/authorize',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/authorize.html'], (require) => {
                            const template = require('./html/authorize.html');
                            deferred.resolve(template);
                        }, './login/authorize-tpl');
                        return deferred.promise;
                    }
                })
                .state('authorize.login', { //登陆
                    url: '/login',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/login.html'], (require) => {
                            const template = require('./html/login.html');
                            deferred.resolve(template);
                        }, './login/login-tpl');
                        return deferred.promise;
                    },
                    controller: 'loginCtrl',
                    controllerAs: 'loginvm',
                    resolve: {
                        'dryadApp.login': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/login-controller.js'], (require) => {
                                const ctrl = require('./controller/login-controller.js')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './login/login-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('authorize.register', { //注册
                    url: '/register',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/register.html'], (reuqire) => {
                            const tpl = require('./html/register.html');
                            deferred.resolve(tpl);
                        }, './login/register-tpl');
                        return deferred.promise;
                    },
                    controller: 'registerCtrl',
                    controllerAs: 'registervm',
                    resolve: {
                        'dryadApp.register': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/register-controller.js'], (require) => {
                                const ctrl = require('./controller/register-controller.js')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './login/register-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('authorize.resetpassword', { //重置密码
                    url: '/resetpassword',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/reset-password.html'], (reuqire) => {
                            const tpl = require('./html/reset-password.html');
                            deferred.resolve(tpl);
                        }, './login/resetpassword-tpl');
                        return deferred.promise;
                    },
                    controller: 'resetpasswordCtrl',
                    controllerAs: 'resetpasswordvm',
                    resolve: {
                        'dryadApp.resetpassword': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/resetpassword-controller.js'], (require) => {
                                const ctrl = require('./controller/resetpassword-controller.js')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './login/resetpassword-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('authorize.chooiseprctice', { //多诊所选择
                    url: '/chooiseprctice',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/chooise-prctice.html'], (reuqire) => {
                            const tpl = require('./html/chooise-prctice.html');
                            deferred.resolve(tpl);
                        }, './login/chooiseprctice-tpl');
                        return deferred.promise;
                    },
                    controller: 'chooiseprcticeCtrl',
                    controllerAs: 'chooiseprcticevm',
                    resolve: {
                        'dryadApp.chooiseprctice': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/chooise-prctice-controller.js'], (require) => {
                                const ctrl = require('./controller/chooise-prctice-controller.js')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './login/chooiseprctice-ctrl');
                            return deferred.promise;
                        }
                    }
                })
                .state('authorize.lock', { //锁屏
                    url: '/lock',
                    templateProvider: ($q) => {
                        const deferred = $q.defer();
                        require.ensure(['./html/lock.html'], (reuqire) => {
                            const tpl = require('./html/lock.html');
                            deferred.resolve(tpl);
                        }, './login/lock-tpl');
                        return deferred.promise;
                    },
                    params: {
                        nowroute: null
                    },
                    controller: 'lockCtrl',
                    controllerAs: 'lockvm',
                    resolve: {
                        'dryadApp.lock': ($q, $ocLazyLoad) => {
                            const deferred = $q.defer();
                            require.ensure(['./controller/lock-controller.js'], (require) => {
                                const ctrl = require('./controller/lock-controller.js')(ngMold);
                                $ocLazyLoad.inject({
                                    name: 'dryadApp'
                                });
                                deferred.resolve(ctrl);
                            }, './login/lock-ctrl');
                            return deferred.promise;
                        }
                    }
                })
        }
    ]).name;
};