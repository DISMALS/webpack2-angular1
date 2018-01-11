/**
 * 
 */

module.exports = (ngMold) => {
    ngMold.factory('socket', ['$rootScope','Http','APP_CONFIG','$cookies','$state',
        ($rootScope,Http, APP_CONFIG,$cookies,$state) => {
            let http = new Http(); 
            $rootScope.sockets = null;
            let socketConnect = {
                init:() => {
                    let user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
                    if(!user){$state.go('authorize.login'); return false;}
                    let doctorId = user.employeeId;
                    let url = `wss://test.asthmachina.org/websocket?employeeId=${doctorId}`;
                    try{
                        $rootScope.sockets = new WebSocket(url);

                        //connection is opened
                        $rootScope.sockets.addEventListener('open',event => {
                            console.log(`websocket connecttion is opened`);
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
                        });

                        //listen error
                        $rootScope.sockets.addEventListener('error',event => {
                            console.log(`websocket connecttion is error!`);
                        });
                    }catch(e){
                        console.log(`尝试执行操作失败！${e}`);
                    }
                }
            };

            return socketConnect;
        }
    ]);
};