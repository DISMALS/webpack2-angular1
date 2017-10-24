class OnlineConsultingCtrl {
    constructor($scope, $state, $stateParams, toastr) {
        // console.log($state);
        // console.log($stateParams);
        let OnlineConsulting = {};
        console.log(WebIM);
        // 1、创建连接
        OnlineConsulting.conn = new WebIM.connection({
            isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
            https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
            url: WebIM.config.xmppURL,
            heartBeatWait: WebIM.config.heartBeatWait,
            autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
            autoReconnectInterval: WebIM.config.autoReconnectInterval,
            apiUrl: WebIM.config.apiURL,
            isHttpDNS: WebIM.config.isHttpDNS,
            isWindowSDK: WebIM.config.isWindowSDK,
            isAutoLogin: true
        });
        // 2、事件回调函数
        OnlineConsulting.conn.listen({
            onOpened: function(message) { //连接成功回调
                // let backmessage = message;
                console.log(message);
                // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
                // 则无需调用conn.setPresence();             
            },
            onClosed: function(message) {}, //连接关闭回调
            onTextMessage: function(message) {}, //收到文本消息
            onEmojiMessage: function(message) {}, //收到表情消息
            onPictureMessage: function(message) {}, //收到图片消息
            onCmdMessage: function(message) {}, //收到命令消息
            onAudioMessage: function(message) {}, //收到音频消息
            onLocationMessage: function(message) {}, //收到位置消息
            onFileMessage: function(message) {}, //收到文件消息
            onVideoMessage: function(message) {
                var node = document.getElementById('privateVideo');
                var option = {
                    url: message.url,
                    headers: {
                        'Accept': 'audio/mp4'
                    },
                    onFileDownloadComplete: function(response) {
                        var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                        node.src = objectURL;
                    },
                    onFileDownloadError: function() {
                        console.log('File down load error.')
                    }
                };
                WebIM.utils.download.call(conn, option);
            }, //收到视频消息
            onPresence: function(message) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
            onRoster: function(message) {}, //处理好友申请
            onInviteMessage: function(message) {}, //处理群组邀请
            onOnline: function() {
                toastr.error('网络连接成功！', 2000);
            }, //本机网络连接成功
            onOffline: function() {
                toastr.error('无法连接网络，请重试！', 2000);
            }, //本机网络掉线
            onError: function(message) {}, //失败回调
            onBlacklistUpdate: function(list) { //黑名单变动
                // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                console.log(list);
            },
            onReceivedMessage: function(message) {}, //收到消息送达服务器回执
            onDeliveredMessage: function(message) {}, //收到消息送达客户端回执
            onReadMessage: function(message) {}, //收到消息已读回执
            onCreateGroup: function(message) {}, //创建群组成功回执（需调用createGroupNew）
            onMutedMessage: function(message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        });

        OnlineConsulting.conn.open({
            apiUrl: WebIM.config.apiURL,
            user: 'xiaohao', //username.toLowerCase()
            pwd: '123456', //auth
            // accessToken: '123456',
            appKey: WebIM.config.appkey,
            success: function(token) {
                console.log(token);
                var encryptUsername = btoa('xiaohao');
                encryptUsername = encryptUsername.replace(/=*$/g, "");
                var token = token.access_token;
                var url = '#username=' + encryptUsername;
                WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
                // window.location.href = url
                OnlineConsulting.token = token;
            },
            error: function(err) {
                console.log(err);
                // window.location.href = '#'

            }
        });
    }
}
OnlineConsultingCtrl.$inject = ['$scope', '$state', '$stateParams', 'toastr'];

module.exports = (ngMold) => {
    ngMold.controller('onlineConsultingCtrl', OnlineConsultingCtrl);
};