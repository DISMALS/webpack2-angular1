class FollowupUnfinishedCtrl {
    constructor($scope) {

    }
}
FollowupUnfinishedCtrl.$inject = ['$scope'];


module.exports = (ngMold) => {
    ngMold.controller('followupUnfinishedCtrl', FollowupUnfinishedCtrl);
}