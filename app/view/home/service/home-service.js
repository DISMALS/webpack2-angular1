/**
 * Created by wangmu on 17/11/25.
 */
module.exports = (ngMold) => {
    let citiesList =  require('../../../../node_modules/echarts/map/json/china.json');
    ngMold.factory('homeService', ['$rootScope','Http','$cookies','$state','APP_CONFIG',
        ($rootScope,Http,$cookies,$state,APP_CONFIG) => {
            let http = new Http();
            $rootScope.sockets = null;

            let wsFn = (url) => {
                $rootScope.sockets = new WebSocket(url);
                
                //connection is opened
                $rootScope.sockets.addEventListener('open',event => {
                    console.log(`websocket connection is opened`);
                });

                //listen message
                $rootScope.sockets.addEventListener('message',event => {
                    console.log(`websocket is receive data!`);
                    if(event.data != '成功建立socket连接'){
                        $rootScope.$broadcast('RaiseMessageEvent', event.data);
                    }
                });

                //listen close
                $rootScope.sockets.addEventListener('close',(event) => {
                    console.log('websocket is closed!');
                    // $rootScope.sockets = null;
                    // if(event.code == 1003){return false}
                    // wsFn(url);
                });

                //listen error
                $rootScope.sockets.addEventListener('error',event => {
                    console.log(`websocket connection is error!`);
                    $rootScope.sockets.close();
                    // $rootScope.sockets = null;
                    // wsFn(url);
                });
            };

            let homeServiceObj = {
                getHomeInfo: (doctorId) => { //首页获取统计信息
                    return http.get('homepage/getPatientCountInfo/' + doctorId);
                },
                getHomePatientChart: (doctorId) => { //首页患者饼状统计
                    return http.get('homepage/getPatientsChart/' + doctorId);
                },
                getHomePatientCountInfo: (year, doctorId) => { //首页患者病历线状统计
                    return http.get('homepage/getPatientLevelCountInfo/' + year + '/' +  doctorId);
                },
                getHomePatientCSCountInfo: (year, doctorId) => { //首页患者控制线状统计
                    return http.get('homepage/getPatientCSCountInfo/' + year + '/' +  doctorId);
                },
                patientsSearch: (obj, type) => {
                    if ( type == 1) {
                        return http.post('patientManagement/searchRelPatients', obj, { isMask: true });
                    }
                    if ( type == 2 || type == 4) {
                        return http.post('patientManagement/searchSpecialRelPatients', obj, { isMask: true });
                    }
    
                },
                getCitiesList: () => {
                    let pro = new Promise((resolve,reject) => {
                        if(citiesList){
                            resolve(citiesList);
                        }else{
                            reject('数据加载失败！');
                        }
                    });
                    return pro;
                     
                },
                init:() => {
                    let user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
                    if(!user){$state.go('authorize.login'); return false;}
                    let doctorId = user.employeeId;
                    let url = `${APP_CONFIG.SOCKET_HREF}?employeeId=${doctorId}`;
                    // try{
                        wsFn(url);
                    // }catch(e){
                    //     console.log(`尝试执行操作失败！${e}`);
                    // }
                }
            };

            return homeServiceObj;
        }
    ]);
};