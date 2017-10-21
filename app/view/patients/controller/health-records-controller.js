require('../../../../images/user-icon.png');
class PatientsHealthRecordsCtrl {
    constructor($rootScope, $scope, $stateParams, APP_CONFIG) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
        console.log($rootScope);
        console.log($scope);
        console.log($stateParams);
    }
}

PatientsHealthRecordsCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'APP_CONFIG'];

module.exports = (ngMold) => {
    ngMold.controller('patientsHealthRecordsCtrl', PatientsHealthRecordsCtrl);
}