let ops = {
    API_HOST: 'https://test.asthmachina.org', //'https://test.asthmachina.org/dryad-manager-api/xxxx' //https://test.asthmachina.org/dryad-app-api
    CH_AU_T_NAME: "X-Auth-Token",
    CH_AP_V_NAME: "X-App-Version",
};
if(window.location.host == 'www.asthmachina.org'){
    ops.SOCKET_HREF = 'wss://www.asthmachina.org/websocket';
}else{
    ops.SOCKET_HREF = 'wss://test.asthmachina.org/websocket';
}
module.exports = (ngMold) => {
    require('../view/common/service/interceptor-service')(ngMold);
    // require('../view/common/service/ui-block-service')(ngMold);
    require('../view/common/service/http-service')(ngMold);
    require('../view/common/service/common-service')(ngMold);
    ngMold.constant('APP_CONFIG', ops);
}