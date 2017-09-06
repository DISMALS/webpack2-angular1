module.exports = angular.module('lkApp.httpService',['ngCookies'])
    .factory('Http', ['$http', '$q', '$cookies', 'APP_CONFIG', 
        ($http, $q, $cookies, APP_CONFIG) => {
            function Http(apiName) {
                var namePaths = apiName ? apiName.toString().split('|') : [];
                
                if (namePaths.length > 1){
                    this._apiHost = APP_CONFIG['API_HOST_' + namePaths[0]] || '/rest'
                    this._apiName = namePaths[namePaths.length-1] || undefined;
                } else if (namePaths.length){
                    this._apiHost = APP_CONFIG.API_HOST || '/rest';
                    this._apiName = apiName || undefined;
                } else {
                    this._apiHost = APP_CONFIG.API_HOST || '/rest';
                    this._apiName = undefined;
                }
            }

            /**
             *  通用 请求成功 数据返回处理
             *  @param response  请求成功返回的response
             */
            Http.prototype._commonSuccess = function (response) {
                return response.data;
            };

            /**
             * 通用的错误
             */
            Http.prototype._commonError = function (error) {
                if (error.data) {
                    error.data.statusCode = error.status;
                    if (Object.prototype.toString.call(error.data.message) == '[object String]') {
                        error.data.message = [error.data.message];
                    }
                }
                return error.data;
            };


            /**
             * get 提交
             * @param url {string} 请求的地址
             * @param config {object} ajax 配置
             */
            Http.prototype.get = function (url, config) {
                var deferred = $q.defer(),
                    self = this;

                $http.get(self._getUrl(url), self._getConfig(config)).then(function (response) {
                    deferred.resolve(self._commonSuccess(response));
                }).catch(function (e) {
                    deferred.reject(self._commonError(e));
                });
                return deferred.promise;
            };
            /**
             * post 提交
             * @param url {string} 请求的地址
             * @param data {object} 提交的数据
             * @param config {object} ajax 配置
             */
            Http.prototype.post = function (url, data, config) {
                var deferred = $q.defer(),
                    self = this;
                $http.post(self._getUrl(url), data, self._getConfig(config)).then(function (response) {
                    deferred.resolve(self._commonSuccess(response));
                }).catch(function (e) {
                    deferred.reject(self._commonError(e));
                });
                return deferred.promise;
            };

            /**
             * put 提交
             * @param url {string} 请求的地址
             * @param data {object} 提交的数据
             * @param config {object} ajax 配置
             */
            Http.prototype.put = function (url, data, config) {
                var deferred = $q.defer(),
                    self = this;
                $http.put(self._getUrl(url), data, self._getConfig(config)).then(function (response) {
                    deferred.resolve(self._commonSuccess(response));
                }).catch(function (e) {
                    deferred.reject(self._commonError(e));
                });
                return deferred.promise;
            };

            /**
             * delete 删除
             * @param url {string} 请求的地址
             * @param data {object} 提交的数据
             * @param config {object} ajax 配置
             */
            Http.prototype.delete = function (url, data, config) {
                var deferred = $q.defer(),
                    self = this;
                $http.delete(self._getUrl(url), data, self._getConfig(config)).then(function (response) {
                    deferred.resolve(self._commonSuccess(response));
                }).catch(function (e) {
                    deferred.reject(self._commonError(e));
                });
                return deferred.promise;
            };

            /**
             * 获取通用的config
             * @param config {object} 默认的config
             */
            Http.prototype._getConfig = function (config) {
                var _config = config || {};
                return angular.extend({}, {
                    //是否需要检查输入
                    isCheckValid: _config.isValid || false,
                    //超时
                    timeout: 60000,
                    //是否需要遮罩
                    isMask: false,
                    //是否需要自动消息
                    isAutoMsg: false,
                    // 检查输入的 TRANSFER 对象名称  对应你建的TRANSFER 名字
                    transferClass: _config.transferClass || this._apiName || APP_CONFIG['TRANSFER_COMMON_NAME']
                }, _config);
            };

            /**
             * 传入不带前缀的 url 生成新的url
             * @param url 不带前缀的url
             */
            Http.prototype._getUrl = function (url) {
                var arr = [this._apiHost];
                !(this._apiName === void 0) && arr.push(this._apiName);
                !(url === void 0) && arr.push(url);

                var _url = arr.join('/');
                if(_url.indexOf("?") === -1){
                    _url += "?v="+ APP_CONFIG.APP_VERSION;
                }
                return _url;
            };

            Http.prototype.getToken = function () {
                return $cookies.get(APP_CONFIG.CH_AU_T_NAME);
            };

            return Http;
        }
    ]).name;