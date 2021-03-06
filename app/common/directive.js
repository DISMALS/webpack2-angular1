module.exports = (ngMold) => {
    require('../view/common/directive/dryad-permission-check-directive')(ngMold);
    require('../view/common/directive/file-upload-directive')(ngMold);
    // require('../view/common/directive/date-input-directive')(ngMold);
    require('../view/common/directive/date-timepicker-directive')(ngMold);
    require('../view/common/directive/common-ui-directive')(ngMold);
    // require('../view/common/directive/echarts-ui-directive')(ngMold);
    require('../view/common/directive/tab-ui-directive')(ngMold);
    // require('../view/common/directive/grid-ui-directive')(ngMold);
    // require('../view/common/directive/input-ui-directive')(ngMold);
    require('../view/common/directive/layui-table-directive')(ngMold);
    // require('../view/common/directive/page-ui-directive')(ngMold);
    require('../view/common/directive/screen-ui-directive')(ngMold);
    require('../view/common/directive/role-tree-ui-directive')(ngMold);
    require('../view/common/directive/video-play-directive')(ngMold);
    require('../view/resource/directive/resource-search-directive')(ngMold);
    require('../view/common/directive/img-upload-directive')(ngMold);
    require('../view/system/directive/hospital-config-directive')(ngMold);
    require('../view/common/directive/video-upload-directive')(ngMold);
    require('../view/common/directive/umeditor-directive')(ngMold);
    require('../view/common/directive/jquery-inputmask-directive')(ngMold);
    require('../view/common/directive/common-search-directive')(ngMold);
};