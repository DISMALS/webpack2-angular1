require('../../../../images/user-icon.png');
class PatientsDiagnosisCtrl {
    constructor($rootScope, $scope, $stateParams, APP_CONFIG) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
        $scope.events = [{
            visit: true,
            card: 242344,
            time: 23456543432,
            badgeClass: 'normal',
            content: '息诊断内容信息诊断内容信息诊断内容信息诊断内容信息诊断内容信息诊断内容信息诊断内容信息'
        }, {
            visit: false,
            card: 543545,
            time: 1234567543345,
            badgeClass: 'normal',
            content: '息诊断内容信息诊断内容信息诊断内容信息诊断内容信息诊断内容信息诊断内容信息诊断内容信息'
        }];
    }
}

PatientsDiagnosisCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'APP_CONFIG'];

module.exports = (ngMold) => {
    ngMold.controller('patientsDiagnosisCtrl', PatientsDiagnosisCtrl);
}