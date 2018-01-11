module.exports = (ngMold) => {
    ngMold.factory('loginService', ['$state', 'Http', '$cookies',
        ($state, Http, $cookies) => {
            const http = new Http();

            let authorize = {
                //登陆
                logIn:(obj) => {
                    return http.post('login/login',obj,{isMask:true});
                },
                //重置密码
                resetPassword: (obj) => {
                    return http.post('employee/resetPassword',obj,{isMask:true});
                },
                //发送短信验证码
                sendCheckCode: (phoneNo) => {
                    return http.get(`sms/${phoneNo}`,{isMask:true});
                }
            }

            return authorize;
        }
    ]);
};