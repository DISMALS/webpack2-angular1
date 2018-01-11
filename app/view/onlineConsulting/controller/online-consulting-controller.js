class OnlineConsultingCtrl {
    constructor($scope, $state, $stateParams, toastr, onlineConsultingService) {

    }
}
OnlineConsultingCtrl.$inject = ['$scope', '$state', '$stateParams', 'toastr', 'onlineConsultingService'];
module.exports = (ngMold) => {
    require.ensure(['../service/online-consulting-service'], (require) => {
        const service = require('../service/online-consulting-service')(ngMold);
    }, './onlineConsulting/online-consulting-service');
    ngMold.controller('onlineConsultingCtrl', OnlineConsultingCtrl);
    require('../directive/online-consulting-directive')(ngMold);
};