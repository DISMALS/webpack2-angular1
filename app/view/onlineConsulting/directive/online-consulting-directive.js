window.Strophe = require('../../../common/src/strophe-1.2.8.js');
require('../../../../images/default.png');
require('../../../../images/group_user.png');
require('../../../../images/loading.gif');
require('../../../../images/font/iconfont.woff');
require('../../../../images/font/iconfont.ttf');
require('../../../../images/font/iconfont.svg');
require('../../../../images/font/iconfont.eot');
//在线咨询
let OnlineOperate = ($timeout, $rootScope, onlineConsultingService,toastr) => {
    return {
        restrict: 'ECMA',
        transclude: true,
        replace: true,
        template: '<div class="onlin-talk"><div id="onlineConsulting"></div><div id="components"></div></div>',
        controller: ['$rootScope', '$scope', 'onlineConsultingService', '$cookies', 'APP_CONFIG', ($rootScope, $scope, onlineConsultingService, $cookies, APP_CONFIG) => {
            let user = JSON.parse($cookies.get('user'));
            // let obj = {
            //     password: user.password,
            //     phoneNo: user.username,
            //     userType: 2
            // }
            // onlineConsultingService.userLogin(obj).then(data => {
                // console.log(data);
                // console.log($cookies);
                // $cookies.put(APP_CONFIG.CH_AU_T_NAME, data.data.token);
                $scope.imInfo = {
                    imAccount: user.imAccount,
                    imPassword: user.imPassword
                }
                require('../../../common/src/websdk-1.4.13.js');
                require.ensure(['../service/online-consulting'], (require) => {
                    require('../service/online-consulting');
                    var options = {
                        apiUrl: WebIM.config.apiURL,
                        user: $scope.imInfo.imAccount.toLowerCase(),
                        pwd: $scope.imInfo.imPassword,
                        appKey: WebIM.config.appkey,
                        success: function(token) {
                            // var encryptUsername = btoa($scope.imInfo.imAccount);
                            // encryptUsername = encryptUsername.replace(/=*$/g, "");
                            // var token = token.access_token;
                            // WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
                            // Demo.token = token;
                            toastr.success('连接成功！',null,1500);
                        },
                        error: function(err) {
                            // window.location.href = '#'
                            toastr.error(err.type,null,1500);
                        }
                    };
                    if (Demo.user) {
                        if (Demo.user != $scope.imInfo.imAccount) {
                            Demo.chatRecord = {};
                        }
                    }
                    Demo.isscroll = true;
                    Demo.startIndex = 0;
                    Demo.listSize = 20;
                    Demo.user = $scope.imInfo.imAccount;
                    let sendArr = $scope.imInfo.imAccount.split('');
                    Demo.sendId = user.employeeId;
                    Demo.token = user.token;
                    Demo.user = $scope.imInfo.imAccount;
                    Demo.userImgSrc = 'http://imgsrc.baidu.com/imgad/pic/item/342ac65c1038534376f778069813b07eca8088d9.jpg';
                    Demo.apiUrls = APP_CONFIG.API_HOST; //'https://test.asthmachina.org/dryad-app-api'

                    Demo.conn.open(options);
                    Demo.api.render(document.getElementById('onlineConsulting'));
                }, './onlineConsulting/online-talk-components');
            // });
        }],
        link: (scope, ele, attr) => {
            $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
                if (fromState.name == 'dryad.online-consulting') {
                    if(Demo){
                        Demo.token = null;
                        // if (Demo.user) {
                        //     if (Demo.user != users.username) {
                        //         Demo.chatRecord = {};
                        //     }
                        // }
                        Demo.user = null;
                        Demo.userImgSrc = null;
                        Demo.conn.close();
                    }
                    
                }
            });
        }
    }
};
OnlineOperate.$inject = ['$timeout', '$rootScope', 'onlineConsultingService','toastr'];


module.exports = (ngMold) => {
    require.ensure(['../service/online-consulting-service'], (require) => {
        const service = require('../service/online-consulting-service')(ngMold);
    }, './onlineConsulting/online-consulting-service');
    ngMold.directive('onlineConsultingEle', OnlineOperate);
}