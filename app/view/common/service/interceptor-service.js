module.exports = (ngMod) => {
    ngMod.factory('interceptorService', ["$rootScope", "$q", '$cookies', 'APP_CONFIG',
        ($rootScope, $q, $cookies, APP_CONFIG) => {
            return {
                request: function(config) {
                    $rootScope.$broadcast('$requestStart', config);
                    // 只对 api 接口 做验证 有必要 就排除 html 和json 请求
                    if (config.url.indexOf(APP_CONFIG['API_HOST']) != -1) {
                        if ($cookies.get(APP_CONFIG['CH_AU_T_NAME'])) {
                            config.headers[APP_CONFIG['CH_AU_T_NAME']] = $cookies.get(APP_CONFIG['CH_AU_T_NAME']);
                        }
                    }
                    return config;
                },
                requestError: function(rejection) {
                    $rootScope.$broadcast('$requestError', rejection);
                    return $q.reject(rejection);
                },
                response: function(response) {
                    // debugger;
                    $rootScope.$broadcast('$responseSuccess', response);
                    return response;
                },
                responseError: function(rejection) {
                    $rootScope.$broadcast('$responseError', rejection);
                    return $q.reject(rejection);
                }
            }
        }
    ]);
}