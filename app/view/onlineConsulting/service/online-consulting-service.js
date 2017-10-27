module.exports = (ngMold) => {
    ngMold.factory('onlineConsultingService', ['Http', '$cookies', '_',
        (Http, $cookies, _) => {
            const http = new Http();
            let Interface = {
                userLogin: obj => {
                    return http.post('user/login', obj);
                }
            };
            return Interface;
        }
    ]);
};