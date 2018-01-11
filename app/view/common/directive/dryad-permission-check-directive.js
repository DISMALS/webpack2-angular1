let DryadPermissionCheck = ($rootScope, $timeout, $parse, _, mainService,$cookies) => {
    let onDeny = (scope, element, attrs) => {
        var pcdOnDeny = _.clone(scope.pcdOnDeny || 'hide');
        var pcdOnDenyObj = null;

        if (typeof pcdOnDeny !== 'string') {
            pcdOnDeny = 'hide';
        } else {
            try {
                var temp = '{' + (pcdOnDeny || '') + '}';
                temp = temp.replace(/ /g, '');
                temp = temp.replace(/\{\{/g, '{');
                temp = temp.replace(/\}\}/g, '}');

                temp = temp.replace(/\{/g, '{"');
                temp = temp.replace(/\}/g, '"}');
                temp = temp.replace(/\:/g, '":"');
                temp = temp.replace(/\,/g, '","');
                temp = temp.replace(/\'/g, '"');
                temp = temp.replace(/\"\"/g, '"');

                pcdOnDenyObj = JSON.parse(temp);
                pcdOnDeny = _.isEmpty(pcdOnDenyObj) ? 'hide' : 'object';
            } catch (error) {
                pcdOnDenyObj = null;
            }
        }

        switch (pcdOnDeny) {
            case 'disable':
                if (scope.pcdTarget) {
                    var timer = TimerService.setTimer(function(cancel) {
                        if ($(scope.pcdTarget, element).length > 0) {
                            cancel();
                            $(scope.pcdTarget, element).prop('disabled', true).addClass('disabled');
                            clearEvents(element);
                        }
                    }, 500, true);
                } else {
                    $(element).prop('disabled', true).prop('ng-click', null).addClass('disabled');
                    clearEvents(element);
                }
                return;
            case 'readonly':
                if (scope.pcdTarget) {
                    var timer = TimerService.setTimer(function(cancel) {
                        if ($(scope.pcdTarget, element).length > 0) {
                            cancel();
                            $(scope.pcdTarget, element).prop('disabled', true).addClass('disabled');
                            clearEvents(element);
                        }
                    }, 500, true);
                } else {
                    $(element).prop('readonly', true).addClass('readonly');
                    clearEvents(element);
                }
                return;
            case 'clear':
                if (scope.pcdTarget) {
                    var timer = TimerService.setTimer(function(cancel) {
                        if ($(scope.pcdTarget, element).length > 0) {
                            cancel();
                            $(scope.pcdTarget, element).remove();
                        }
                    }, 500, true);
                } else {
                    $(element).remove();
                }
                return;
            case 'empty':
                if (scope.pcdTarget) {
                    var timer = TimerService.setTimer(function(cancel) {
                        if ($(scope.pcdTarget, element).length > 0) {
                            cancel();
                            $(scope.pcdTarget, element).html('');
                        }
                    }, 500, true);
                } else {
                    $(element).html('');
                }
                return;
            case 'object':
                if (pcdOnDenyObj.message) {
                    if (scope.pcdTarget) {
                        var timer = TimerService.setTimer(function(cancel) {
                            if ($(scope.pcdTarget, element).length > 0) {
                                cancel();
                                $(scope.pcdTarget, element).html('<p>' + pcdOnDenyObj.message + '</p>');
                            }
                        }, 500, true);
                    } else {
                        $(element).html('<p>' + pcdOnDenyObj.message + '</p>');
                    }
                }
                if (pcdOnDenyObj.callback) {
                    var callback = pcdOnDenyObj.callback;
                    //callback = scope[callback] || scope.$parent[callback] || scope.$root[callback];
                    var callbackFn = Object.byString(scope, callback);
                    callbackFn = callbackFn || Object.byString(scope.$parent, callback);
                    callbackFn = callbackFn || Object.byString(scope.$root, callback);
                    if (typeof callbackFn === "function") {
                        $timeout(function() {
                            callbackFn.call(this, element);
                        }, 100);
                    }
                }

                if (scope.permissions) {
                    _.each(scope.permissions, function(value, key) {
                        key = key.replace(/[\+\!]/, '');
                        if (value === false && pcdOnDenyObj[key]) {
                            var callback = pcdOnDenyObj[key];
                            callback = scope[callback] || scope.$parent[callback] || scope.$root[callback];
                            if (typeof callback === "function") {
                                callback.call(this, element);
                            }
                        }
                    });
                }

                return;
            case 'hide':
            default:
                if (scope.pcdTarget) {
                    var timer = TimerService.setTimer(function(cancel) {
                        if ($(scope.pcdTarget, element).length > 0) {
                            cancel();
                            $(scope.pcdTarget, element).prop('disabled', true).addClass('disabled').hide();
                        }
                    }, 500, true);
                } else {
                    $(element).prop('disabled', true).prop('ng-click', null).addClass('disabled').hide();
                }
                break;
        }
    };

    let onCheck = (scope, permissions, userAuthorities) => {
        scope.permissions = {};
        if (!userAuthorities || !userAuthorities.length) {
            return false;
        }

        var checker = _.clone(scope.pcdChecker);
        if (typeof checker === "function") {
            var bResult = checker.call(this, permissions, userAuthorities);
            scope.permissions[permissions] = bResult;
            return bResult;
        }

        permissions = extractPermissions(permissions);
        if (!permissions || !permissions.length) {
            return false;
        }

        var isAuthorised = mainService.checkPermission(permissions, userAuthorities, scope.permissions);

        return isAuthorised;
    };

    let extractPermissions = (permissions) => {
        return mainService.parsePermissions(permissions);
    };

    let clearEvents = (element) => {
        $(element).on('click', function($event) {
            event.stopPropagation();
            this.onclick = null;
            $event.stopImmediatePropagation();
            return false;
        });

        $('button, a, .btn', element).on('click', function($event) {
            event.stopPropagation();
            this.onclick = null;
            $event.stopImmediatePropagation();
            return false;
        });
    };
    return {
        restrict: 'A',
        scope: {
            /* pcd-on-deny 属性, 用于标示检查失败后如何处理. 默认为'hide'
             * 'disable'   // disable这个DOM Element
             * 'hide'      // hide这个DOM Element
             * 'clear'     // clear这个DOM Element
             * '{message: ""}'   // 替换DOM Element中的内容
             * '{callback: function(element){}}'   // 回调函数, 将DOM Element传递进去, 注意回调函数必须在scope中能够找到
             * */
            pcdOnDeny: '@',
            pcdChecker: '@', // 指定检查函数
            pcdResult: '=', // 检查结果
            pcdTarget: '@', // 检查结果
        },
        controller: ['$scope', '$location', '$state', 'mainService','$cookies', function($scope, $location, $state, mainService,$cookies) {
            // console.log('Controller', arguments);
            let user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
            $scope.userAuthorities = user ? user.functionList : []; //, "OPERATING_PERMISSION", "EXPERTS_PERMISSION"
        }],
        compile: function(element, attrs, transclude) {
            // console.log('compile', arguments);

            /* permission-check-directive 属性
             * */
            var permission = attrs['dryadPermissionCheck'];
            var permissionGetter = null;

            if (permission) {
                permissionGetter = $parse(permission);
            } else {
                $(element).hide();
                return;
            }


            return {
                // Pre-link function
                pre: function(scope, element, attrs, transcludeFn) {
                    // console.log('Pre-link', arguments);
                    var permissions = _.clone(attrs['dryadPermissionCheck']);
                    var userAuthorities = _.clone(scope.userAuthorities);
                    if (typeof permissionGetter === "function") {
                        var p = permissionGetter(scope.$parent, scope) || permissions;
                        if (_.isArray(p) && p.length) {
                            permissions = _.find(p, function(s) { return s != null; }) || permissions;
                        } else {
                            permissions = p;
                        }
                    }

                    if (onCheck(scope, permissions, userAuthorities)) {

                    } else {
                        //scope.pcdResult = false;
                        onDeny(scope, element, attrs);
                    }
                },
                // Post-link function
                post: function(scope, element, attrs, transcludeFn) {
                    //console.log('Post-link', arguments);
                    //console.log('Post-link', attrs[_directiveName]);
                }
            };
        }
    }
}
DryadPermissionCheck.$inject = ['$rootScope', '$timeout', '$parse', '_', 'mainService','$cookies'];

module.exports = (ngMold) => {
    require.ensure(['../service/main-service'], (require) => {
        const service = require('../service/main-service')(ngMold);
    }, './common/main-serve');
    ngMold.directive('dryadPermissionCheck', DryadPermissionCheck);
};