// import '../node_modules/moment/min/moment-with-locales.min'; //时间日期转换
import 'moment'; //时间日期转换
// import 'jquery-ui'; //
import '../node_modules/angular-ui-tree/dist/angular-ui-tree.min'; //树结构
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import '../node_modules/ui-select/dist/select.min'; //下拉列表插件
import '../node_modules/angular-sanitize/angular-sanitize.min'; //下拉列表插件依赖
import '../node_modules/angular-toastr/dist/angular-toastr.tpls.min'; //消息提示框
import '../node_modules/angular-socket-io/socket.min'; //实时通信
import '../node_modules/angular-moment/angular-moment.min'; //时间日期转换
import '../node_modules/angular-block-ui/dist/angular-block-ui.min'; //弹窗锁屏
// import '../node_modules/angular-ui-router/lib/legacy/stateEvents'; //ui-router1.0以后监听路由变化需要此文件
import '../node_modules/angular-ui-router/release/stateEvents.min'; //ui-router1.0以后监听路由变化需要此文件
import '../node_modules/jsgrid/dist/jsgrid.min'; //jsgrid表格
// require('../node_modules/jqgrid/js/jquery.jqGrid.src')($); //jqgrid
import './common/src/angular-underscore'; //underscore
import '../node_modules/angular-timeline/dist/angular-timeline'; //时间轴
import '../node_modules/angular-ui-router-tabs/src/ui-router-tabs'; //路由tab
window.echarts = require('../node_modules/echarts/dist/echarts.min');

require('./common/src/websdk-1.4.13.js');