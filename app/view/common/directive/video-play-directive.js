
let VideoPlayDirective = ($timeout, conmmonService, toastr) => {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            play: '@',
            fileId: '=',
        },
        template: require('../html/video-play.html'),

        link: function(scope, elem, attrs) {
            $timeout( () =>{
                conmmonService.getPlayAuth( scope.fileId ).then( (data) => { //vid 获得播放权限
                    if ( data.status == 200) {
                        scope.playAuth = data.data.playAuth;
                        scope.videoUrl = data.data.videoUrl;
                        if (!scope.playAuth) {
                        return    toastr.error( '获取播放权限失败,请稍后重试', null, 3000 );
                        }
                        var player = new Aliplayer({
                            id: "J_prismPlayer",
                            autoplay: scope.play,
                            isLive:false,
                            playsinline:true,
                            width:"100%",
                            height:"auto",
                            controlBarVisibility:"always",
                            useH5Prism:false,
                            useFlashPrism:false,
                            source: scope.videoUrl,

                            cover: scope.cover,
                            skinLayout:[{"name":"bigPlayButton","align":"blabs","x":30,"y":80},
                                {"name":"H5Loading","align":"cc"},
                                {"name":"errorDisplay","align":"tlabs","x":0,"y":0},
                                {"name":"infoDisplay","align":"cc"},
                                {"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"speedButton","align":"tr","x":10,"y":23},
                                    {"name":"streamButton","align":"tr","x":20,"y":23},
                                    {"name":"setButton","align":"tr","x":20,"y":25},
                                    {"name":"timeDisplay","align":"tl","x":10,"y":24},
                                    {"name":"fullScreenButton","align":"tr","x":20,"y":25},
                                    {"name":"playButton","align":"tl","x":15,"y":26},
                                    {"name":"progress","align":"tlabs","x":0,"y":0},
                                    {"name":"snapshot","align":"tr","x":20,"y":25},
                                    {"name":"volume","align":"tr","x":20,"y":25}]},
                                {"name":"fullControlBar","align":"tlabs","x":0,"y":0,"children":[{"name":"fullTitle","align":"tl","x":25,"y":6},
                                    {"name":"fullNormalScreenButton","align":"tr","x":24,"y":13},
                                    {"name":"fullZoom","align":"cc"},
                                    {"name":"fullTimeDisplay","align":"tr","x":10,"y":12}]}]
                        });

                    } else {
                        toastr.error( data.errorMessage, null, 3000 );
                    }
                })

            }, 1500)
        }
    }
}
VideoPlayDirective.$inject = ['$timeout', 'conmmonService', 'toastr'];

module.exports = (ngMold) => {
    ngMold.directive('videoPlayDirective', VideoPlayDirective);
}