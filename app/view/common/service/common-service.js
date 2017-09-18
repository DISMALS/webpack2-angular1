class commonService {
    constructor(Http, $cookies) {
        const http = new Http();

        let _test = () => {
            return http.get('./app/config/data/menu.json');
        }
        return {
            test: _test
        }
    }
}
commonService.$inject = ['Http', '$cookies'];


module.exports = (ngMod) => {
    ngMod.factory('commonService', commonService);
};


//['Http', '$cookies',
//        (Http, $cookies) => {
//            const http = new Http();

//            let _test = () => {
//                return http.get('./app/config/data/menu.json');
//            }
//            return {
//                test: _test
//            }
//        }
//]