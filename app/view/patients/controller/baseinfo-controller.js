require('../../../../images/user-icon.png');
class PatientsBaseinfoCtrl {
    constructor($rootScope, $scope, $stateParams, APP_CONFIG, $state) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
        console.log($scope);
        console.log($state);
        console.log($stateParams);
        console.log($rootScope);
    }
}

PatientsBaseinfoCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'APP_CONFIG', '$state'];

module.exports = (ngMold) => {
    ngMold.controller('patientsBaseinfoCtrl', PatientsBaseinfoCtrl);
}