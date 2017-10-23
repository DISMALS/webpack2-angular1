class DataBaseinfoCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medicalhistory base info!');
    }
}
DataBaseinfoCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('dataBaseinfoCtrl', DataBaseinfoCtrl);
}