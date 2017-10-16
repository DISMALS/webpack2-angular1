class MedicalHistoryDeailsCtrl {
    constructor($scope) {
        this.scope = $scope;
        this.name = '这是病历详情页面一';
    }
}

MedicalHistoryDeailsCtrl.$inject = ['$scope'];

module.exports = (ngMold) => {
    ngMold.controller('medicalHistoryDeailsCtrl', MedicalHistoryDeailsCtrl);
}