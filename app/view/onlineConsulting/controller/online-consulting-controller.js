class OnlineConsultingCtrl {
    constructor($scope, $state, $stateParams) {
        console.log($state);
    }
}
OnlineConsultingCtrl.$inject = ['$scope', '$state', '$stateParams'];

module.exports = (ngMold) => {
    ngMold.controller('onlineConsultingCtrl', OnlineConsultingCtrl);
};