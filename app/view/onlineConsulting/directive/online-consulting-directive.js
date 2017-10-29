require('../../../../images/default.png');
require('../../../../images/group_user.png');
require('../../../../images/loading.gif');
require('../../../../images/font/iconfont.woff');
require('../../../../images/font/iconfont.ttf');
require('../../../../images/font/iconfont.svg');
require('../../../../images/font/iconfont.eot');
//在线咨询
let OnlineOperate = ($timeout, $rootScope, onlineConsultingService) => {
    return {
        restrict: 'ECMA',
        transclude: true,
        replace: true,
        template: '<div class="onlin-talk"><div id="onlineConsulting"></div><div id="components"></div></div>',
        controller: ['$rootScope', '$scope', 'onlineConsultingService', '$cookies', 'APP_CONFIG', ($rootScope, $scope, onlineConsultingService, $cookies, APP_CONFIG) => {
            let obj = {
                password: $rootScope.user.password,
                phoneNo: $rootScope.user.username,
                userType: 1
            }
            onlineConsultingService.userLogin(obj).then(data => {
                console.log(data);
                console.log($cookies);
                $cookies.put(APP_CONFIG.CH_AU_T_NAME, data.data.token);
                $cookies.putObject();
                $scope.imInfo = {
                    imAccount: data.data.imAccount,
                    imPassword: data.data.imPassword
                }
                require.ensure(['../service/online-consulting'], (require) => {
                    require('../service/online-consulting');
                    var options = {
                        apiUrl: WebIM.config.apiURL,
                        user: $scope.imInfo.imAccount.toLowerCase(),
                        pwd: $scope.imInfo.imPassword,
                        appKey: WebIM.config.appkey,
                        success: function(token) {
                            var encryptUsername = btoa($scope.imInfo.imAccount);
                            encryptUsername = encryptUsername.replace(/=*$/g, "");
                            var token = token.access_token;
                            WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
                            Demo.token = token;
                        },
                        error: function() {
                            // window.location.href = '#'

                        }
                    };
                    if (Demo.user) {
                        if (Demo.user != $scope.imInfo.imAccount) {
                            Demo.chatRecord = {};
                        }
                    }
                    Demo.user = $scope.imInfo.imAccount;
                    Demo.userImgSrc = 'http://imgsrc.baidu.com/imgad/pic/item/342ac65c1038534376f778069813b07eca8088d9.jpg';

                    Demo.conn.open(options);
                    Demo.api.render(document.getElementById('onlineConsulting'));
                    console.log(Demo);
                }, './onlineConsulting/online-talk-components');
            });
        }],
        link: (scope, ele, attr) => {
            // let online = function() {
            //     $(document).ready(() => {
            //         // console.log(WebIM);
                    
            //     });
            // }
            // online();


            $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
                if (fromState.name == 'dryad.online-consulting') {
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
            });
        }
    }
};
OnlineOperate.$inject = ['$timeout', '$rootScope', 'onlineConsultingService'];


module.exports = (ngMold) => {
    require.ensure(['../service/online-consulting-service'], (require) => {
        const service = require('../service/online-consulting-service')(ngMold);
    }, './onlineConsulting/online-consulting-service');
    ngMold.directive('onlineConsultingEle', OnlineOperate);
}