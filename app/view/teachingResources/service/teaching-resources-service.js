module.exports = (ngMod) => {
    ngMod.factory('systemService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let systemService = {
                //获取权限数据
                getPermissionData:() => {
                    let permissionData = require('../../../config/data/roleTree.json');
                    return permissionData;
                }
            };
            return systemService;
        }
    ]);
};