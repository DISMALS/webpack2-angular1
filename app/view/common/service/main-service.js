module.exports = (ngMod) => {
    ngMod.factory('mainService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let conmmonService = {
                // 验证权限
                checkPermission: (permissions, userAuthorities, results) => {
                    var permissionResult = results || {};
                    var authorities = [];
                    if (userAuthorities) {
                        authorities = userAuthorities;
                    } else {
                        authorities = conmmonService.getCurrentUserAuthorities();
                    }
                    var isAuthorised = false;
                    var hasNecessaryAuthority = null;
                    var hasNotAuthority = null;

                    _.each(permissions, function(permission) {
                        if (typeof permission !== 'string') {
                            isAuthorised = false;
                            permissionResult[permission] = false;
                            return isAuthorised;
                        }

                        if (permission === 'permitAll') {
                            isAuthorised = true;
                            permissionResult[permission] = true;
                            return isAuthorised;
                        }

                        if (permission.match(/^\+/)) {
                            debugger;
                            var bResult = 0 <= _.indexOf(authorities, permission.slice(1));
                            permissionResult[permission] = bResult;
                            hasNecessaryAuthority = hasNecessaryAuthority == null ? bResult : bResult && hasNecessaryAuthority;
                        } else if (permission.match(/^\!/)) {
                            var bResult = 0 <= _.indexOf(authorities, permission.slice(1));
                            permissionResult[permission] = bResult;
                            hasNotAuthority = hasNotAuthority == null ? bResult : bResult && hasNotAuthority;
                        } else if (0 <= _.indexOf(authorities, permission)) {
                            isAuthorised = true;
                            permissionResult[permission] = true;
                        } else {
                            permissionResult[permission] = false;
                            isAuthorised = isAuthorised || false;
                        }
                    });
                    if (hasNecessaryAuthority != null && hasNotAuthority != null) {
                        isAuthorised = isAuthorised || hasNecessaryAuthority && hasNotAuthority;
                    } else if (hasNotAuthority != null) {
                        isAuthorised = isAuthorised || hasNotAuthority;
                    } else if (hasNecessaryAuthority != null) {
                        isAuthorised = isAuthorised || hasNecessaryAuthority;
                    }

                    return isAuthorised;
                },
                // 获取权限
                getCurrentUserAuthorities: () => {
                    let permissions = ["HOME", "MEDICAL_RECORD", "PATIENT", "FOLLOW_UP", "OPERATION", "ONLINE_CONSULTING", "DATA_APPLICATION", "SYSTEM", "DEPARTMENT", "CONTROLCLASS", "BASIC_CONFIGURATION", "PROGRAMS", "OPERATIONAL_ROLES", "OPERATING_ACCOUNT", "REGIONAL_CENTER", "EXPERT_ROLE", "EXPERTS_ACCOUNT"];
                    return permissions;
                },
                // 解析权限
                parsePermissions: function(permissionString) {
                    //if (!permissionString || permissionString.length == 0){
                    //    permissionString = 'permitAll';
                    //}
                    return permissionString.indexOf('[') == 0 ? permissionString.slice(1, permissionString.length - 1).split(",") : [permissionString];
                },
            };
            // let _checkPermission = () => {
            //     return http.get('./app/config/data/menu.json');
            // }
            return conmmonService;
        }
    ]);
};