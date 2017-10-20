require('../../../../images/user-icon.png');
class PatientsDeailsCtrl {
    constructor($scope, $stateParams, APP_CONFIG) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
        $scope.userimg = APP_CONFIG.API_HOST + 'images/user-icon.png';
    }
}

PatientsDeailsCtrl.$inject = ['$scope', '$stateParams', 'APP_CONFIG'];

module.exports = (ngMold) => {
    ngMold.controller('patientsDeailsCtrl', PatientsDeailsCtrl);
}