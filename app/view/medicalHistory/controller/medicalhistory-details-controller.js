class MedicalHistoryDeailsCtrl {
    constructor($scope, $stateParams) {
        this.scope = $scope;
        this.name = '这是病历详情页面,ID是：' + $stateParams.id;
    }
}

MedicalHistoryDeailsCtrl.$inject = ['$scope', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryDeailsCtrl', MedicalHistoryDeailsCtrl);
}