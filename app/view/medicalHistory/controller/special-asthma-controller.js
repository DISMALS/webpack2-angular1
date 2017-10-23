class SpecialAsthmaCtrl {
    constructor($scope, $stateParams) {
        console.log('this is medical history speical asthma!');
    }
}
SpecialAsthmaCtrl.$inject = ['$scope', '$stateParams'];
module.exports = (ngMold) => {
    ngMold.controller('specialAsthmaCtrl', SpecialAsthmaCtrl);
}