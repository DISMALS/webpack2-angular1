let ops = {
    API_HOST: 'http://localhost:9000', //'http://test.yunpractice.com/rest'
    CH_AU_T_NAME: "X-Auth-Token",
    CH_AP_V_NAME: "X-App-Version",
};
module.exports = angular.module('lkApp.service', [
        require('../view/common/service/http-service.js')
    ])
    .constant('APP_CONFIG', ops).name;