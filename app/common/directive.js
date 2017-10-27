module.exports = (ngMold) => {
    require('../view/common/directive/dryad-permission-check-directive')(ngMold);
    require('../view/common/directive/file-upload-directive')(ngMold);
    require('../view/common/directive/date-timepicker-directive')(ngMold);
    require('../view/common/directive/common-ui-directive')(ngMold);
    require('../view/common/directive/echarts-ui-directive')(ngMold);
    require('../view/common/directive/tab-ui-directive')(ngMold);
    require('../view/common/directive/grid-ui-directive')(ngMold);
    require('../view/common/directive/page-ui-directive')(ngMold);
    require('../view/common/directive/screen-ui-directive')(ngMold);
};