module.exports = (ngMold) => {
    require('../view/common/common.routers')(ngMold);
    require('../view/login/login-routers')(ngMold);
    require('../view/home/home-routers')(ngMold);
    require('../view/medicalHistory/medical-history-routers')(ngMold);
    require('../view/patients/patients-routers')(ngMold);
    require('../view/followUp/followup-routers')(ngMold);
    require('../view/operation/operation-routers')(ngMold);
};