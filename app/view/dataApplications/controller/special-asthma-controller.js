class DataSpecialAsthmaCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history speical asthma!');
    }
}
DataSpecialAsthmaCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('dataSpecialAsthmaCtrl', DataSpecialAsthmaCtrl);
}