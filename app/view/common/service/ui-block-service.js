module.exports = (ngMod) => {
    ngMod.service('$uiBlock', [function() {
        console.log($.blockUI);
        return {
            show: function(params) {
                var _params = params || {},
                    //指定了dom 节点
                    _element = _params['element'],
                    //指定了消息内容
                    _msg = _params['message'];
                if (_element) {
                    $(_element).block({
                        message: _msg || '<svg class="circular"><circle class="path" cx="40" cy="40" r="10" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>',
                        css: {
                            border: 'none',
                            width: '14px',
                            backgroundColor: 'none',
                            'z-index': 90000
                        },
                        overlayCSS: {
                            backgroundColor: '#fff',
                            opacity: 0.6,
                            cursor: 'wait'
                        }
                    });
                } else {
                    var cursor = "";
                    if (params === "disableButton") {
                        cursor = "not-allowed"
                    } else {
                        cursor = "wait"
                    }
                    $.blockUI({
                        message: _msg || '请稍等, 让数据多飞一会儿...', //'请稍等, 让数据多飞一会儿...'),
                        css: {
                            border: 'none',
                            padding: '15px',
                            backgroundColor: '#000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .5,
                            color: '#fff',
                            'font-size': '15px',
                            'font-family': '"microsoft yahei", Arial, sans-serif !important',
                            'z-index': 90000
                        },
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0,
                            cursor: cursor,
                            'z-index': 90000
                        }
                    });
                }
                $.blockUI.defaults.cursorReset = "pointer";
            },
            hide: function(element) {
                if (element) {
                    $(element).unblock();
                } else {
                    $.unblockUI();
                }
            }
        };
    }]);
}