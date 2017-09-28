module.exports = (ngMold) => {
    ngMold.config(['$stateProvider',
        ($stateProvider) => {
            $stateProvider.state('login', {
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
            });
        }
    ]).name;
};