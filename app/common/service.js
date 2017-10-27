let ops = {
    API_HOST: 'https://test.asthmachina.org/dryad-app-api', //'http://test.yunpractice.com/rest'
    CH_AU_T_NAME: "X-Auth-Token",
    CH_AP_V_NAME: "X-App-Version",
};
module.exports = (ngMold) => {
    require('../view/common/service/interceptor-service')(ngMold);
    require('../view/common/service/ui-block-service')(ngMold);
    require('../view/common/service/http-service')(ngMold);
    ngMold.constant('APP_CONFIG', ops);
}