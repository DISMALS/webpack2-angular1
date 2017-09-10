module.exports = angular.module('lkApp.home',['ngCookies'])
    .factory('commonService',['$rootScope','Http','$cookies',
        ($rootScope,Http,$cookies) => {
            var http = new Http();
            
            let _test = () => {
                return http.get('view/common/service/menu.json',{isMask:true})
            }
            return{
                test:_test
            }
        }
    ])