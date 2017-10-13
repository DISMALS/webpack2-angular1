class PatientsSearchCtrl {
    constructor($scope) {

    }
}
PatientsSearchCtrl.$inject = ['$scope'];


module.exports = (ngMold) => {
    ngMold.controller('patientsSearchCtrl', PatientsSearchCtrl);
}